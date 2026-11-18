import datetime
import uuid
from django.utils import timezone
from rest_framework import status, views, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Page, Event, Enquiry, KnowledgeEntry, ChatSession, ChatMessage, Setting
from .serializers import (
    PageSerializer, EventSerializer, EnquirySerializer,
    KnowledgeEntrySerializer, ChatSessionSerializer,
    ChatSessionDetailSerializer, ChatMessageSerializer
)
from .gemini_service import query_gemini_assistant, clean_text_format

class PageDetailView(views.APIView):
    def get(self, request, slug):
        try:
            page = Page.objects.get(slug=slug)
            serializer = PageSerializer(page)
            return Response(serializer.data)
        except Page.DoesNotExist:
            return Response({'error': f"Page '{slug}' not found"}, status=status.HTTP_404_NOT_FOUND)

class EventListView(views.APIView):
    def get(self, request):
        featured_only = request.query_params.get('featured', 'false').lower() == 'true'
        if featured_only:
            events = Event.objects.filter(is_featured=True).order_by('id')
        else:
            events = Event.objects.all().order_by('id')
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

class EnquiryCreateView(views.APIView):
    def post(self, request):
        serializer = EnquirySerializer(data=request.data)
        if serializer.is_valid():
            enquiry = serializer.save()
            return Response({
                'message': 'Thank you! Your enquiry has been received successfully. Our admissions team will get in touch with you shortly.',
                'enquiry_id': enquiry.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatSessionViewSet(viewsets.ViewSet):
    """
    Handles session creation, listing by visitor_id, retrieval, and deletion.
    """
    def list(self, request):
        visitor_id = request.query_params.get('visitor_id', '')
        sessions = ChatSession.objects.all()
        if visitor_id:
            sessions = sessions.filter(visitor_id=visitor_id)
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def create(self, request):
        visitor_id = request.data.get('visitor_id', '')
        title = request.data.get('title', 'New Conversation')
        session = ChatSession.objects.create(
            visitor_id=visitor_id,
            title=title
        )
        serializer = ChatSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        try:
            session = ChatSession.objects.get(id=pk)
            serializer = ChatSessionDetailSerializer(session)
            return Response(serializer.data)
        except ChatSession.DoesNotExist:
            return Response({'error': 'Conversation session not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            session = ChatSession.objects.get(id=pk)
            session.delete()
            return Response({'message': 'Conversation successfully deleted'}, status=status.HTTP_200_OK)
        except ChatSession.DoesNotExist:
            return Response({'error': 'Conversation session not found'}, status=status.HTTP_404_NOT_FOUND)

class ChatMessageView(views.APIView):
    """
    GET: list messages of session
    POST: send a query, get AI assistant response, store both
    """
    def get(self, request, session_id):
        try:
            session = ChatSession.objects.get(id=session_id)
            messages = session.messages.all()
            serializer = ChatMessageSerializer(messages, many=True)
            return Response(serializer.data)
        except ChatSession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, session_id):
        try:
            session = ChatSession.objects.get(id=session_id)
        except ChatSession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

        content = request.data.get('content', '').strip()
        if not content:
            return Response({'error': 'Message content cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)

        # FR-C11: Message length validation
        if len(content) > 1000:
            return Response({'error': 'Message exceeds maximum length of 1,000 characters.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save user message
        user_msg = ChatMessage.objects.create(
            session=session,
            role='user',
            content=content
        )

        # Update session title if first message
        if session.messages.count() <= 2 and (session.title == 'New Conversation' or not session.title):
            # Generate short title from query
            clean_title = (content[:35] + '...') if len(content) > 35 else content
            session.title = clean_title
            session.save()

        # Load conversation history turns
        history = list(session.messages.exclude(id=user_msg.id).order_by('created_at'))

        # Query Gemini API via service
        ai_result = query_gemini_assistant(user_message=content, conversation_history=history)
        reply_text = ai_result.get('reply', '')

        # Save assistant message
        assistant_msg = ChatMessage.objects.create(
            session=session,
            role='assistant',
            content=clean_text_format(reply_text)
        )

        # Update session activity
        session.last_active_at = timezone.now()
        session.save(update_fields=['last_active_at'])

        return Response({
            'user_message': ChatMessageSerializer(user_msg).data,
            'assistant_message': ChatMessageSerializer(assistant_msg).data,
            'success': ai_result.get('success', True),
            'model': 'College Assistant'
        }, status=status.HTTP_200_OK)

@api_view(['GET'])
def college_stats(request):
    return Response({
        'name': 'Sri Venkateswara College of Engineering',
        'established': 1985,
        'accreditation': 'NAAC A++, NBA Accredited, Autonomous under Anna University',
        'students': '4,500+',
        'faculty': '320+ (68% Ph.D holders)',
        'placement_rate': '96%',
        'highest_package': '44 LPA',
        'average_package': '8.5 LPA',
        'campus_size': '95 Acres Lush Green Smart Campus',
        'address': 'Post Bag No. 1, Pennalur, Sriperumbudur Tk, Tamil Nadu 602117',
        'email': 'admissions@mycollege.edu',
        'phone': '+91 98765 43210'
    })
