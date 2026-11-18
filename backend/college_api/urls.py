from django.urls import path
from .views import (
    PageDetailView, EventListView, EnquiryCreateView,
    ChatSessionViewSet, ChatMessageView, college_stats
)

urlpatterns = [
    # Pages & Events
    path('pages/<slug:slug>/', PageDetailView.as_view(), name='page-detail'),
    path('events/', EventListView.as_view(), name='event-list'),
    path('enquiries/', EnquiryCreateView.as_view(), name='enquiry-create'),
    path('stats/', college_stats, name='college-stats'),

    # Chat Sessions & Messages (SRS 6.2)
    path('chat/sessions/', ChatSessionViewSet.as_view({'get': 'list', 'post': 'create'}), name='chat-session-list-create'),
    path('chat/sessions/<uuid:pk>/', ChatSessionViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'}), name='chat-session-detail'),
    path('chat/sessions/<uuid:session_id>/messages/', ChatMessageView.as_view(), name='chat-messages'),
]
