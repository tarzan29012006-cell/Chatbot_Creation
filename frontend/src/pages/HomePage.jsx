import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import QuickLinksBar from '../components/QuickLinksBar';
import AboutSection from '../components/AboutSection';
import { Calendar, MapPin, ArrowRight, Sparkles, Building, Award, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch upcoming events from Django API
    fetch('/api/events/?featured=true')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch((err) => console.error('Events error:', err));

    // Fetch college stats from Django API
    fetch('/api/stats/')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Stats error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Banner Slider (Matching Uploaded Mockup) */}
      <HeroSlider />

      {/* 2. Quick Links Tiles Bar (Matching Uploaded Mockup) */}
      <QuickLinksBar />

      {/* 3. About Our College Section (Matching Uploaded Mockup) */}
      <AboutSection />

      {/* 4. Campus Key Numbers & Distinctions Strip */}
      <section className="bg-[#0b1a30] text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#f9b916] mb-1">
                {stats?.highest_package || '44 LPA'}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Highest Package Offered</div>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#38bdf8] mb-1">
                {stats?.placement_rate || '96%'}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Consistent Placement Record</div>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#f9b916] mb-1">
                {stats?.campus_size?.split(' ')[0] || '95 Acres'}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Smart Green Campus</div>
            </div>

            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#38bdf8] mb-1">
                NAAC A++
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">Highest Grade (3.65 CGPA)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Upcoming Events & Celebrations (SRS FR-W4, 6.2) */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#1254cf] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> What's Happening at SVCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0c2340]">
                Upcoming Campus Events
              </h2>
            </div>
            <Link
              to="/campus-life#events"
              className="inline-flex items-center gap-2 text-[#1254cf] hover:text-[#0b44aa] font-semibold text-sm group"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={evt.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0c2340]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {evt.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1254cf] mb-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                    </div>
                    <h3 className="font-semibold text-base text-slate-800 line-clamp-2 group-hover:text-[#1254cf] transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Assistant Prompt Callout Strip */}
      <section className="py-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Have questions about SVCE Admissions or Courses?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base">
              Chat instantly with our virtual College Assistant for admissions, programs, and campus life!
            </p>
          </div>
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2.5 bg-[#f9b916] hover:bg-[#eab308] text-slate-950 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            <span>Ask College Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
