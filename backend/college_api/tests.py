import json
from django.test import TestCase, Client
from college_api.models import Page, Event, Enquiry, KnowledgeEntry, ChatSession, ChatMessage, Setting
from college_api.gemini_service import is_obviously_general_query, retrieve_college_knowledge

class CollegeWebsiteAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        # Create test page
        Page.objects.create(
            slug='home',
            title='Home',
            subtitle='Learn. Innovate. Excel.',
            body='A hub of knowledge.'
        )
        # Create test event
        Event.objects.create(
            title='Milan 2026',
            description='Cultural Fest',
            date='Feb 12-14, 2026',
            venue='Central Auditorium',
            category='Cultural',
            is_featured=True
        )
        # Create knowledge entry
        KnowledgeEntry.objects.create(
            title='B.E. Computer Science and Engineering',
            category='Courses',
            text='SVCE offers 4-year B.E. CSE with 180 seats. Highlights include Generative AI and Cloud Computing.',
            tags='cse, computer science, b.e, courses',
            is_active=True
        )

    def test_pages_api(self):
        response = self.client.get('/api/pages/home/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['slug'], 'home')
        self.assertEqual(data['title'], 'Home')

    def test_events_api(self):
        response = self.client.get('/api/events/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(len(data), 1)
        self.assertEqual(data[0]['title'], 'Milan 2026')

    def test_enquiry_submission(self):
        payload = {
            'name': 'Test Student',
            'email': 'student@test.com',
            'phone': '+91 9988776655',
            'course_interest': 'B.E. Computer Science and Engineering',
            'message': 'Seeking admission details for 2026 batch.',
            'type': 'admissions'
        }
        response = self.client.post('/api/enquiries/', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Enquiry.objects.filter(email='student@test.com').exists())

    def test_chat_session_lifecycle(self):
        # 1. Create session
        res = self.client.post('/api/chat/sessions/', data=json.dumps({'visitor_id': 'test_vis_1', 'title': 'Test Chat'}), content_type='application/json')
        self.assertEqual(res.status_code, 201)
        session_id = res.json()['id']

        # 2. List sessions for visitor
        list_res = self.client.get(f'/api/chat/sessions/?visitor_id=test_vis_1')
        self.assertEqual(list_res.status_code, 200)
        self.assertEqual(len(list_res.json()), 1)

        # 3. Post a message to session
        msg_res = self.client.post(f'/api/chat/sessions/{session_id}/messages/', data=json.dumps({'content': 'Tell me about the courses'}), content_type='application/json')
        self.assertEqual(msg_res.status_code, 200)
        data = msg_res.json()
        self.assertIn('user_message', data)
        self.assertIn('assistant_message', data)

        # 4. Check message history endpoint
        hist_res = self.client.get(f'/api/chat/sessions/{session_id}/messages/')
        self.assertEqual(hist_res.status_code, 200)
        msgs = hist_res.json()
        self.assertEqual(len(msgs), 2) # user + assistant

        # 5. Delete session
        del_res = self.client.delete(f'/api/chat/sessions/{session_id}/')
        self.assertEqual(del_res.status_code, 200)
        self.assertFalse(ChatSession.objects.filter(id=session_id).exists())

    def test_refusal_intent_detection(self):
        # Verify that obviously general queries are recognized
        self.assertTrue(is_obviously_general_query('Who won the cricket match yesterday?'))
        self.assertTrue(is_obviously_general_query('Write a python code for binary search'))
        self.assertTrue(is_obviously_general_query('What is the weather in London?'))
        # College queries should NOT be declined
        self.assertFalse(is_obviously_general_query('Tell me about the courses offered at SVCE'))
        self.assertFalse(is_obviously_general_query('What are the hostel fees?'))

    def test_college_knowledge_retrieval(self):
        docs = retrieve_college_knowledge('computer science course')
        self.assertIn('B.E. Computer Science and Engineering', docs)
