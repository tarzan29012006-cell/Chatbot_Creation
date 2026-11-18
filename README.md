# Sri Venkateswara College of Engineering (SVCE) - College Management Website & AI Assistant

An official college management portal and AI-powered virtual assistant developed for Sri Venkateswara College of Engineering (SVCE), built strictly following the Software Requirements Specification (SRS v1.0) and client-supplied UI mockups.

---

## 🏛️ Features

### 1. Website Pages (7 Pages)
- **Home (`/`)**: Hero banner slider with auto-rotation, quick-link tiles, "About Our College" section with watermark styling, distinction counters, upcoming events, and floating chat widget.
- **About (`/about`)**: Four decades of heritage (est. 1985), vision, mission, college leadership, and NAAC A++ / NBA accreditations.
- **Academics (`/academics`)**: 8 undergraduate engineering branches (CSE, AI & DS, ECE, IT, Mech, Biotech, Civil, EEE), postgraduate M.E./M.Tech, MBA, and Anna University recognized Ph.D research centers.
- **Admissions (`/admissions`)**: TNEA single window counselling (Code: 1219) vs Management Quota procedures, annual fee structure, scholarships, and interactive admission application form.
- **Campus Life (`/campus-life`)**: Milan Cultural Fiesta, Technovation Hackathon, 25+ student societies, Kaveri/Vaigai hostels, and sports stadium.
- **Contact (`/contact`)**: Pennalur campus address, phone helplines, interactive contact enquiry form, and Google Map directions.
- **College Assistant (`/assistant`)**: Full conversational AI chatbot interface featuring the 3D mascot robot, suggestion chips, conversation history drawer, and new/delete chat controls.

### 2. AI College Assistant
- **Scope & Grounding**: Answers strictly using approved college data stored in the database.
- **General Knowledge Refusal**: Non-college questions (e.g. cricket, math, coding, general trivia) are politely declined.
- **Identity Confidentiality**: Identifies solely as the virtual College Assistant of SVCE.
- **Clean Plain Text Format**: Output formatted in pure text without raw markdown symbols (`###`, `**`, `*`, `__`).
- **Multi-Turn Memory**: Keeps conversation history turns for natural follow-ups.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide Icons, React Router v6 |
| **Backend** | Python 3, Django, Django REST Framework, django-cors-headers |
| **Database** | SQLite (development) |
| **Chatbot Core** | Google Gemini API (server-side integration) |

---

## 🚀 Quick Start Guide

### 1. Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# (Optional) Seed initial college data
python manage.py seed_data

# Start the Django development server
python manage.py runserver 0.0.0.0:8000
```

The Django REST API will run at `http://127.0.0.1:8000/api/`.
The Django Admin panel is accessible at `http://127.0.0.1:8000/admin/` (Default admin credentials: `admin` / `admin123`).

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The website will be accessible at `http://localhost:5173/`.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/pages/{slug}/` | Get page content by slug |
| `GET` | `/api/events/` | List upcoming campus events |
| `POST` | `/api/enquiries/` | Submit admission application or contact enquiry |
| `GET` | `/api/stats/` | College key statistics and overview |
| `POST` | `/api/chat/sessions/` | Create a new chat session |
| `GET` | `/api/chat/sessions/` | List past chat sessions by visitor |
| `GET` | `/api/chat/sessions/{id}/messages/` | Retrieve message history for a session |
| `POST` | `/api/chat/sessions/{id}/messages/` | Send a query to the AI Assistant |
| `DELETE` | `/api/chat/sessions/{id}/` | Delete a conversation session |

---

## 📄 License & Credits
Developed for Sri Venkateswara College of Engineering. All rights reserved © 2026.
