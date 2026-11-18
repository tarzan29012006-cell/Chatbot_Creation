import os
from django.core.management.base import BaseCommand
from college_api.models import Page, Event, KnowledgeEntry, Setting

class Command(BaseCommand):
    help = 'Seeds database with realistic college data for Sri Venkateswara College of Engineering'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE('Starting SVCE college data seeding...'))

        # 1. Seed Settings
        default_settings = [
            ('GEMINI_API_KEY', os.environ.get('GEMINI_API_KEY', '')),
            ('GEMINI_MODEL', 'gemini-3.5-flash'),
            ('CHAT_HISTORY_LIMIT', '10'),
            ('CHAT_RATE_LIMIT_PER_MINUTE', '30'),
            ('CHAT_MAX_MESSAGE_LENGTH', '1000'),
        ]
        for key, val in default_settings:
            Setting.objects.update_or_create(key=key, defaults={'value': val})
        self.stdout.write(self.style.SUCCESS('Settings seeded.'))

        # 2. Seed Knowledge Entries
        knowledge_data = [
            # General
            {
                'title': 'Sri Venkateswara College of Engineering Overview',
                'category': 'General',
                'tags': 'svce, college, overview, history, established, autonomous, naac, anna university, ranking, location',
                'text': """Sri Venkateswara College of Engineering (SVCE) is an autonomous premier engineering institution established in 1985. It is situated on a sprawling 95-acre lush green campus in Pennalur, Sriperumbudur, near Chennai along NH-48.
- Accreditation: NAAC 'A++' Grade with 3.65 CGPA, all eligible UG programs accredited by NBA.
- Affiliation: Autonomous institution permanently affiliated to Anna University, Chennai, and approved by AICTE, New Delhi.
- Campus: 95 acres smart campus with modern digital infrastructure, research parks, and state-of-the-art laboratories.
- Core Values: Academic excellence, research innovation, ethical leadership, and holistic personality development."""
            },
            {
                'title': 'Vision, Mission and Leadership',
                'category': 'General',
                'tags': 'vision, mission, principal, leadership, management, dean, values',
                'text': """Vision: To be a world-class institution of higher learning in engineering, technology, and management, fostering innovation and ethical human values.
Mission: Deliver student-centric education, foster cutting-edge research, promote industry collaborations, and empower students to address global challenges.
Leadership:
- Principal: Dr. S. Ganesh, M.E., Ph.D. (30+ years academic and industrial leadership)
- Dean of Academic Affairs: Dr. K. Meenakshi, Ph.D.
- Dean of Student Affairs: Dr. R. Narayanan, Ph.D.
- Dean of Research & Development: Dr. V. Muralidharan, Ph.D."""
            },
            # Courses
            {
                'title': 'Undergraduate Degree Programs (B.E. & B.Tech)',
                'category': 'Courses',
                'tags': 'courses, ug, btech, b.e, branches, degrees, cse, aids, ece, it, mechanical, civil, biotech, eee',
                'text': """SVCE offers 8 four-year Bachelor of Engineering (B.E.) and Bachelor of Technology (B.Tech) degree programs:
1. B.E. Computer Science and Engineering (CSE) - 180 seats
2. B.Tech Artificial Intelligence and Data Science (AI & DS) - 120 seats
3. B.E. Electronics and Communication Engineering (ECE) - 180 seats
4. B.Tech Information Technology (IT) - 120 seats
5. B.E. Mechanical Engineering - 120 seats
6. B.E. Electrical and Electronics Engineering (EEE) - 90 seats
7. B.Tech Biotechnology - 60 seats
8. B.E. Civil Engineering - 60 seats

All undergraduate curricula incorporate contemporary industry specializations including Cloud Computing, Generative AI, Cyber Security, Robotics & IoT, VLSI Design, and Bioinformatics."""
            },
            {
                'title': 'Postgraduate and Management Programs (M.E., M.Tech, MBA, Ph.D)',
                'category': 'Courses',
                'tags': 'pg, master, mtech, m.e, mba, phd, doctorate, research',
                'text': """Postgraduate and Research Offerings at SVCE:
1. M.E. Computer Science and Engineering (18 seats)
2. M.E. Communication Systems (18 seats)
3. M.Tech Biotechnology (18 seats)
4. M.E. Mechatronics and Industrial Automation (18 seats)
5. Master of Business Administration (MBA) - 60 seats (Specializations: Finance, Marketing, Human Resource Management, Business Analytics & Operations)
6. Ph.D. Doctoral Research: Recognized research center by Anna University across 10 engineering departments."""
            },
            # Admissions
            {
                'title': 'Admission Process and Eligibility Criteria for B.E. / B.Tech',
                'category': 'Admissions',
                'tags': 'admission, eligibility, apply, criteria, cut-off, marks, qualification, tnea, counselling, management quota',
                'text': """Undergraduate Admissions at SVCE are conducted under two quotas:
1. Government Quota (65% of seats):
   - Administered through Tamil Nadu Engineering Admissions (TNEA) single-window online counselling conducted by Anna University.
   - SVCE TNEA Counselling Code: 1219.
   - Eligibility: Pass in Higher Secondary (10+2) examination with Mathematics, Physics, and Chemistry. Minimum average marks: General Category: 50%, BC/BCM: 45%, MBC/DNC: 40%, SC/SCA/ST: 40%.
2. Management Quota (35% of seats):
   - Direct admission based strictly on 10+2 academic merit and interview.
   - Application submission opens in April each year via the online college portal or admissions office in campus.
   - For assistance, email admissions@mycollege.edu or call +91 98765 43210."""
            },
            {
                'title': 'Admission Key Dates and Required Documents',
                'category': 'Admissions',
                'tags': 'admission dates, application deadline, documents required, certificates, verification, schedule',
                'text': """Important Admission Schedule for Academic Year:
- Application portal opens: April 15
- Last date for Management Quota applications: June 30
- TNEA Counselling registration: May - June
- Seat allotment and certificate verification: July - August
- First-year orientation and commencement of classes: September 1

Mandatory Documents at Verification:
1. 10th Standard Mark Sheet (SSLC)
2. 12th Standard Mark Sheet (HSC)
3. Transfer Certificate (TC) & Conduct Certificate
4. Community Certificate (for BC, BCM, MBC, SC, ST)
5. Nativity Certificate (if applicable)
6. 6 recent passport-size photographs and Aadhar card photocopy."""
            },
            # Fees
            {
                'title': 'Annual Fee Structure and Payment Details',
                'category': 'Fees',
                'tags': 'fee, fees, tuition fee, cost, hostel fee, mess fee, bus fee, payment',
                'text': """Approved Fee Structure for Sri Venkateswara College of Engineering:
1. Tuition Fees (Annual):
   - Government Quota (TNEA): ₹55,000 per annum (fixed by TN Fee Fixation Committee).
   - Management Quota: ₹1,45,000 per annum.
2. Hostel & Mess Fee:
   - ₹85,000 per annum (includes accommodation in 2/3 sharing room, 3 nutritious south/north Indian meals daily, evening snacks, laundry, high-speed Wi-Fi).
   - AC Room option: Additional ₹25,000 per annum (subject to availability).
3. College Bus Transport Fee:
   - ₹32,000 to ₹40,000 per annum depending on the boarding zone across Chennai, Kanchipuram, and Tiruvallur.
4. Caution Deposit: ₹5,000 (one-time, refundable)."""
            },
            {
                'title': 'Scholarships and Financial Concessions',
                'category': 'Fees',
                'tags': 'scholarship, financial aid, fee waiver, merit scholarship, sports scholarship, concession',
                'text': """SVCE awards over ₹2.5 Crores in scholarships every academic year:
1. SVCE Founder's Merit Scholarship:
   - 100% Tuition Fee waiver for candidates with TNEA cut-off marks 198/200 and above.
   - 50% Tuition Fee waiver for candidates with TNEA cut-off marks 194 to 197.5.
2. Sports Excellence Scholarship:
   - 100% Free tuition and hostel stay for national and international sports representation.
   - 50% concession for state-level championship medal winners.
3. Economically Weaker Section (EWS) Concession:
   - Up to ₹45,000 annual fee grant for students with annual family income below ₹2,50,000.
4. First Graduate Concession: ₹25,000 government grant per year for eligible students."""
            },
            # Placements
            {
                'title': 'Campus Placements and Top Recruiters',
                'category': 'Placements',
                'tags': 'placements, jobs, companies, recruiters, highest package, average salary, ctc, offers, training',
                'text': """SVCE has an outstanding placement track record with its dedicated Career Development Centre (CDC):
- Placement Record: 96% of registered students placed.
- Total Offers: 1,240+ offers from 180+ visiting multinational and Indian companies.
- Highest Salary Package: ₹44.0 LPA (offered by Microsoft / Amazon).
- Average Salary Package: ₹8.5 LPA.
- Median Salary: ₹7.2 LPA.
- Top Recruiters: Microsoft, Amazon, Google, Zoho Corporation, Tata Consultancy Services (TCS), Infosys, Cognizant, Wipro, Accenture, Bosch, Hyundai Motors, Caterpillar, Qualcomm, L&T Technology Services, Cisco, Mindtree.
- Pre-placement Training: Rigorous 200+ hours of full-stack coding, data structures, algorithms, aptitude, and communication coaching starting from 3rd semester."""
            },
            # Facilities
            {
                'title': 'Campus Infrastructure and Laboratories',
                'category': 'Facilities',
                'tags': 'facilities, infrastructure, campus, library, lab, computer, internet, wifi, auditorium',
                'text': """World-Class Facilities at SVCE Campus:
1. Dr. A.P.J. Abdul Kalam Central Library:
   - Over 115,000 volumes of books, 400 national & international printed journals.
   - Digital Library with subscription to IEEE Xplore, ScienceDirect, Springer, and ACM Digital Library. Fully air-conditioned 24/7 study hall.
2. Computing and AI Labs:
   - 18 centralized and departmental laboratories with 2,400+ Intel Core i9 computers.
   - High-performance NVIDIA RTX A6000 GPU Cluster for AI and deep learning research.
   - 10 Gbps high-speed dedicated optical fiber campus-wide Wi-Fi network.
3. Auditoriums & Seminar Halls:
   - Dr. A.C. Muthiah Central Auditorium with 1,500 seating capacity.
   - 6 air-conditioned mini auditoriums with multimedia projectors.
4. Innovation & Incubation Centre:
   - SVCE Technology Incubation Centre (STIC) providing seed capital, prototyping labs, and mentoring for student startups."""
            },
            {
                'title': 'Hostel Accommodation and Dining',
                'category': 'Facilities',
                'tags': 'hostel, room, boys hostel, girls hostel, mess, food, dining, accommodation, curfew, wifi',
                'text': """Hostel Facilities for Men and Women:
- Separate sprawling hostel blocks for boys (Kaveri & Vaigai) and girls (Bhavani & Yamuna), accommodating 2,200 students.
- Room Configurations: 2-sharing and 3-sharing rooms with beds, study tables, wardrobes, and attached/common modern washrooms. Air-conditioned rooms available on request.
- Dining & Mess: Steam-cooking hygienic kitchens serving balanced vegetarian and non-vegetarian menus (North and South Indian choices). Pure RO drinking water dispensers on every floor.
- Amenities: Indoor games room (table tennis, carrom, chess), gym in each block, reading lounge, solar water heaters, 24/7 high-speed Wi-Fi, power backup generators.
- Security: Round-the-clock CCTV surveillance, biometric access control, warden supervision, and 24/7 ambulance service."""
            },
            {
                'title': 'Sports Complex, Transport Fleet, and Health Centre',
                'category': 'Facilities',
                'tags': 'sports, gym, swimming pool, transport, bus routes, clinic, doctor, medical, health',
                'text': """Sports, Transport, and Medical Amenities:
1. Sports & Athletics Complex:
   - 400m standard running track, full-size football ground, cricket ground with turf nets and floodlights.
   - 3 indoor wooden-floored badminton courts, synthetic basketball court, volleyball and tennis courts.
   - Modern air-conditioned gymnasium with dedicated fitness trainers.
2. Transport Fleet:
   - Fleet of 65 GPS-tracked college buses covering every major neighborhood of Chennai, Tiruvallur, Kanchipuram, and Tambaram.
3. Health & Wellness Centre:
   - Fully equipped 6-bed health clinic with two resident medical doctors and registered nursing staff available round the clock.
   - Fully equipped emergency response ambulance permanently stationed on campus."""
            },
            # Events
            {
                'title': 'Annual College Events, Fests, and Student Clubs',
                'category': 'Events',
                'tags': 'events, fest, milan, technovation, symposium, clubs, rotaract, ieee, culture, hackathon',
                'text': """Vibrant Student Life and Signature Events:
1. Milan (Annual Cultural Festival):
   - Held every February; South India's largest 3-day cultural fest attracting 8,000+ students from 100+ colleges with celebrity musical nights, choreo night, battle of bands, and fashion show.
2. Technovation (National Technical Symposium):
   - Held annually in March; features 24-hour National Hackathon, Robo-Wars, Paper Presentations, and Coding Marathons with ₹5 Lakhs in cash prizes.
3. Active Student Clubs:
   - Technical Clubs: IEEE Student Branch, ACM Chapter, SVCE Coding Club, Robotics & Drones Club.
   - Cultural & Social Clubs: Music & Fine Arts Club, Dramatics Society, Rotaract Club, NSS, NCC Air & Army Wings, Youth Red Cross, Nature & Eco Club."""
            },
            # Contacts
            {
                'title': 'Contact Details, Office Hours and Location',
                'category': 'Contacts',
                'tags': 'contact, phone, email, address, location, reach, map, timing, hours, admissions office',
                'text': """Sri Venkateswara College of Engineering Contact Information:
- Postal Address: Post Bag No. 1, Pennalur, Sriperumbudur Taluk, Tamil Nadu - 602117, India.
- Admissions Email: admissions@mycollege.edu
- General Queries: info@svce.ac.in
- Phone / Admissions Helpline: +91 98765 43210 / +91 44 2715 2000
- Office Working Hours: Monday to Saturday: 8:30 AM – 4:30 PM (Closed on Sundays and Public Holidays)
- Location & Connectivity: Located directly on Chennai-Bengaluru Highway (NH 48), 35 km west of Chennai Central Railway Station, 30 km from Chennai International Airport. Frequent MTC and college buses connect the campus."""
            }
        ]

        for item in knowledge_data:
            KnowledgeEntry.objects.update_or_create(
                title=item['title'],
                defaults={
                    'category': item['category'],
                    'tags': item['tags'],
                    'text': item['text'],
                    'is_active': True
                }
            )
        self.stdout.write(self.style.SUCCESS(f'Knowledge entries seeded ({len(knowledge_data)} items).'))

        # 3. Seed Events
        events_data = [
            {
                'title': 'Milan 2026 - Annual National Cultural Fiesta',
                'description': 'Three days of non-stop excitement, celebrity music performances, choreography competitions, fashion show, and street theatre.',
                'date': 'December 12 - 14, 2026',
                'venue': 'Dr. A.C. Muthiah Central Auditorium & Open Air Theatre',
                'category': 'Cultural',
                'image': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
                'is_featured': True
            },
            {
                'title': 'Technovation 2026: 24-Hour AI & IoT Hackathon',
                'description': 'Build innovative solutions for smart cities, renewable energy, and healthcare with mentorship from top tech industry leads.',
                'date': 'December 20 - 21, 2026',
                'venue': 'Computing Center & Innovation Hub',
                'category': 'Technical',
                'image': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
                'is_featured': True
            },
            {
                'title': 'Annual Placement & Career Mega Fair 2026',
                'description': 'Over 60 Fortune 500 recruiters visiting campus for final year placements and pre-placement internship offers.',
                'date': 'January 08 - 10, 2027',
                'venue': 'Campus Placement Block',
                'category': 'Career',
                'image': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
                'is_featured': True
            },
            {
                'title': 'SVCE Inter-Collegiate State Sports Championship',
                'description': 'State level athletics, cricket, football, basketball, and badminton tournaments featuring 64 college teams.',
                'date': 'January 22 - 25, 2027',
                'venue': 'SVCE International Sports Complex',
                'category': 'Sports',
                'image': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
                'is_featured': True
            }
        ]
        for ev in events_data:
            Event.objects.update_or_create(
                title=ev['title'],
                defaults={
                    'description': ev['description'],
                    'date': ev['date'],
                    'venue': ev['venue'],
                    'category': ev['category'],
                    'image': ev['image'],
                    'is_featured': ev['is_featured']
                }
            )
        self.stdout.write(self.style.SUCCESS('Events seeded.'))

        # 4. Seed 7 SRS Pages
        pages_data = [
            {
                'slug': 'home',
                'title': 'Home',
                'subtitle': 'Learn. Innovate. Excel. Empowering the next generation of innovators and leaders.',
                'body': 'A hub of knowledge, innovation and opportunity, our college strives to nurture talent and build a better tomorrow.',
                'image': 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80',
                'meta_info': {
                    'headline': 'Learn. Innovate. Excel.',
                    'quick_links': ['Academic Programs', 'Student Life', 'Achievements', 'Events']
                }
            },
            {
                'slug': 'about',
                'title': 'About Our College',
                'subtitle': 'Four Decades of Excellence in Higher Engineering Education',
                'body': 'Established in 1985, Sri Venkateswara College of Engineering (SVCE) is an autonomous premier engineering institution recognized by AICTE, permanently affiliated to Anna University, and accredited by NAAC with highest A++ Grade.',
                'image': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=80',
                'meta_info': {
                    'vision': 'To be a premier institution creating engineers with character and technical excellence.',
                    'accreditations': ['NAAC A++', 'NBA Accredited', 'AICTE Approved', 'Anna University Autonomous']
                }
            },
            {
                'slug': 'academics',
                'title': 'Academics & Research',
                'subtitle': 'Comprehensive Undergraduate, Postgraduate, and Doctoral Programs',
                'body': 'SVCE offers 8 cutting-edge undergraduate engineering programs, 4 postgraduate specializations, and doctoral research centers designed in collaboration with global industry leaders.',
                'image': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80',
                'meta_info': {
                    'departments': ['Computer Science & Engg', 'AI & Data Science', 'Electronics & Comm', 'Information Tech', 'Mechanical Engg', 'Biotechnology', 'Electrical Engg', 'Civil Engg']
                }
            },
            {
                'slug': 'admissions',
                'title': 'Admissions 2026 - 2027',
                'subtitle': 'Join Tamil Nadu\'s Top Ranked Engineering Institution',
                'body': 'Explore admission eligibility, TNEA counselling procedure (Code: 1219), management quota options, merit scholarships, and fee structures for prospective students.',
                'image': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80',
                'meta_info': {
                    'tnea_code': '1219',
                    'contact_email': 'admissions@mycollege.edu',
                    'contact_phone': '+91 98765 43210'
                }
            },
            {
                'slug': 'campus-life',
                'title': 'Campus Life & Culture',
                'subtitle': 'A Thriving 95-Acre Community of Creativity, Sports, and Camaraderie',
                'body': 'Life at SVCE extends far beyond lecture halls. Experience over 25 student-led technical and cultural societies, state-of-the-art sports stadiums, and vibrant hostel communities.',
                'image': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&auto=format&fit=crop&q=80',
                'meta_info': {
                    'clubs': ['IEEE Student Branch', 'Rotaract Club', 'Music & Dance Society', 'Robotics Club', 'Sports Council'],
                    'fest': 'Milan Cultural Extravaganza'
                }
            },
            {
                'slug': 'contact',
                'title': 'Contact & Directions',
                'subtitle': 'We are Here to Assist You — Connect With Our Admissions Team',
                'body': 'Visit our 95-acre campus in Pennalur, Sriperumbudur, or get in touch via email or phone for admissions, academic transcripts, or campus tours.',
                'image': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
                'meta_info': {
                    'address': 'Post Bag No. 1, Pennalur, Sriperumbudur Tk, Tamil Nadu 602117',
                    'email': 'admissions@mycollege.edu',
                    'phone': '+91 98765 43210'
                }
            },
            {
                'slug': 'assistant',
                'title': 'College Assistant',
                'subtitle': 'Ask me anything about our college — courses, admissions, events and more!',
                'body': 'Your intelligent 24/7 virtual assistant for all queries regarding Sri Venkateswara College of Engineering.',
                'image': '',
                'meta_info': {
                    'suggestion_chips': [
                        'Tell me about the courses',
                        'Admission process',
                        'Upcoming events',
                        'Campus facilities'
                    ]
                }
            }
        ]
        for pg in pages_data:
            Page.objects.update_or_create(
                slug=pg['slug'],
                defaults={
                    'title': pg['title'],
                    'subtitle': pg['subtitle'],
                    'body': pg['body'],
                    'image': pg['image'],
                    'meta_info': pg['meta_info']
                }
            )
        self.stdout.write(self.style.SUCCESS('All 7 SRS Pages seeded.'))
        self.stdout.write(self.style.SUCCESS('All college data successfully populated!'))
