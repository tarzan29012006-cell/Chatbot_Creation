import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, MapPin, Users, Award, ShieldCheck, Heart, Music, Trophy } from 'lucide-react';

const CLUBS = [
  { name: 'IEEE Student Branch', cat: 'Technical', members: '450+ Members', desc: 'Conducts international workshops, hackathons, and IEEE conference paper submissions.' },
  { name: 'SVCE Rotaract Club', cat: 'Community', members: '300+ Members', desc: 'Active youth leadership organizing blood donation camps, village adoptions, and social drives.' },
  { name: 'Music & Cultural Society', cat: 'Arts', members: '200+ Members', desc: 'Annual hosts of Milan; rock bands, classical carnatic choir, and western acoustic ensembles.' },
  { name: 'Robotics & AI Chapter', cat: 'Innovation', members: '180+ Members', desc: 'Designs combat robots, autonomous drones, and smart automation prototypes.' },
  { name: 'ACM Student Chapter', cat: 'Coding', members: '350+ Members', desc: 'Organizes weekly competitive programming contests on LeetCode and Codeforces.' },
  { name: 'Choreography & Dance Troupe', cat: 'Cultural', members: '120+ Members', desc: 'Winners of state-level inter-collegiate dance battles across Tamil Nadu.' }
];

export default function CampusLifePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch((err) => console.error('Events load error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0b1a30] via-[#0c2340] to-[#1254cf] text-white py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            95-Acre Smart Campus • Vibrant Community
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Campus Life, Fests & Culture
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl font-light">
            Beyond academic excellence, SVCE nurtures creativity, sportsmanship, and lifelong camaraderie through signature cultural extravaganzas and dynamic student chapters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-20">
        
        {/* Signature Events (SRS 3.1, FR-W4) */}
        <section space-y-8 id="events">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1254cf] text-xs font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Celebrations & Extravaganzas
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0c2340]">Signature College Events</h2>
            <p className="text-slate-600 text-sm">Experience the electric energy of South India's premier collegiate festivals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative">
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
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
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
        </section>

        {/* Student Clubs & Societies */}
        <section className="space-y-8" id="clubs">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[#0c2340]">Student Clubs & Societies</h2>
            <p className="text-slate-600 text-sm">Over 25 student-led chapters across coding, music, literature, drones, and community service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLUBS.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1254cf] bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {c.cat}
                  </span>
                  <span className="text-xs text-slate-400">{c.members}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-base">{c.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hostels & Residential Living */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200" id="hostels">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#1254cf] uppercase tracking-wider">A Home Away From Home</span>
            <h2 className="text-3xl font-serif font-bold text-[#0c2340]">Hostel & Residential Facilities</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              SVCE provides modern, safe, and hygienic hostel accommodation for over 2,200 students in dedicated boys' blocks (Kaveri & Vaigai) and girls' blocks (Bhavani & Yamuna).
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong>AC & Non-AC Rooms:</strong> 2 and 3-sharing rooms with ergonomic study desks.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong>Steam-Cooked Mess:</strong> Wholesome North & South Indian dining.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong>24/7 High-Speed Wi-Fi:</strong> Dedicated optical fiber connections.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <strong>Biometric Security:</strong> CCTV monitoring and 24/7 resident warden care.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80"
                alt="SVCE Hostel Common Area"
                className="w-full h-[320px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sports & Athletics */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[#0c2340]">Sports & Athletic Complex</h2>
            <p className="text-slate-600 text-sm">Championing physical fitness and inter-collegiate athletic tournaments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 text-center">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <Trophy className="w-8 h-8 text-[#1254cf] mx-auto" />
              <h3 className="font-bold text-slate-800">Olympic Standard Track</h3>
              <p className="text-xs text-slate-500">400m 8-lane running track for state athletic meets.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <Award className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="font-bold text-slate-800">Floodlit Cricket Turf</h3>
              <p className="text-xs text-slate-500">Full-size turf wicket pitch with floodlight towers for evening matches.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <Users className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-800">Indoor Badminton Arena</h3>
              <p className="text-xs text-slate-500">3 wooden-floored courts with anti-glare sports lighting.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <ShieldCheck className="w-8 h-8 text-indigo-600 mx-auto" />
              <h3 className="font-bold text-slate-800">Modern Fitness Gym</h3>
              <p className="text-xs text-slate-500">Air-conditioned cardio and strength training facility with trainers.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
