import React from 'react';
import { Award, CheckCircle2, BookOpen, ShieldCheck, Target, HeartHandshake, MapPin } from 'lucide-react';
import CollegeWatermark from '../assets/CollegeWatermark';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0b1a30] via-[#0c2340] to-[#1254cf] text-white py-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold uppercase tracking-wider">
            Established in 1985 • 4 Decades of Educational Leadership
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">
            About Sri Venkateswara College of Engineering
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl font-light">
            An Autonomous Institution Permanently Affiliated to Anna University, Chennai & Accredited with NAAC 'A++' Grade.
          </p>
        </div>
        {/* Subtle Watermark in background */}
        <div className="absolute right-4 bottom-0 opacity-15 pointer-events-none">
          <CollegeWatermark className="w-96 h-auto text-white" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-20">
        
        {/* History & Genesis */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-3xl font-serif font-bold text-[#0c2340]">Our Heritage & Genesis</h2>
            <p className="text-slate-600 leading-relaxed">
              Founded in 1985 by visionary philanthropists under the aegis of Sri Venkateswara Educational and Health Trust (SVEHT), SVCE was conceived to deliver world-class engineering education in Tamil Nadu.
            </p>
            <p className="text-slate-600 leading-relaxed">
              From an initial cohort of 180 undergraduate students across three core disciplines, SVCE has blossomed into an internationally recognized centre of technical learning on a 95-acre smart campus in Pennalur, Sriperumbudur.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <div className="text-2xl font-serif font-bold text-[#1254cf]">4,500+</div>
                <div className="text-xs text-slate-600">Enrolled Students</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100">
                <div className="text-2xl font-serif font-bold text-[#d97706]">35,000+</div>
                <div className="text-xs text-slate-600">Global Alumni Network</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&auto=format&fit=crop&q=80"
                alt="SVCE Campus Quadrangle"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 to-white border border-blue-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1254cf] text-white flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0c2340]">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              To be a world-class institution of higher learning in engineering, technology, and management, fostering innovation, ethical human values, and transformative global leadership.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50/80 to-white border border-amber-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f59e0b] text-white flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0c2340]">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Deliver learner-centric academic programs, build research capability in emerging technological domains, foster impactful industry collaborations, and empower young minds to tackle socio-economic challenges.
            </p>
          </div>
        </section>

        {/* Leadership & Academic Governance */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[#0c2340]">College Leadership</h2>
            <p className="text-slate-600 text-sm">Guided by distinguished educators and researchers with global academic credentials.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. S. Ganesh",
                role: "Principal",
                qual: "M.E., Ph.D.",
                desc: "Over 30 years of distinguished teaching, aerospace research, and autonomous curriculum leadership."
              },
              {
                name: "Dr. K. Meenakshi",
                role: "Dean of Academic Affairs",
                qual: "Ph.D. (Anna University)",
                desc: "Spearheading outcome-based continuous education and accreditation compliance."
              },
              {
                name: "Dr. R. Narayanan",
                role: "Dean of Student Affairs",
                qual: "M.Tech, Ph.D.",
                desc: "Directing 25+ student cultural clubs, professional societies, and hostel administration."
              },
              {
                name: "Dr. V. Muralidharan",
                role: "Dean of Research & Development",
                qual: "Ph.D. (IIT Madras)",
                desc: "Overseeing Anna University recognized doctoral research centers and ₹10 Cr+ research grants."
              }
            ].map((lead, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-[#1254cf] font-serif font-bold text-lg flex items-center justify-center mb-4">
                  {lead.name.split(' ')[1]?.[0] || 'D'}
                </div>
                <h4 className="font-bold text-slate-800 text-base">{lead.name}</h4>
                <div className="text-xs font-semibold text-[#1254cf] mb-1">{lead.role}</div>
                <div className="text-[11px] text-slate-400 mb-3">{lead.qual}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{lead.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accreditations & Recognitions */}
        <section className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c2340] text-center">
            Accreditations & Government Approvals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
              <Award className="w-8 h-8 text-[#1254cf] mx-auto" />
              <div className="font-bold text-slate-800">NAAC 'A++' Grade</div>
              <div className="text-xs text-slate-500">Highest Institutional CGPA of 3.65 on a 4-point scale</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="font-bold text-slate-800">NBA Accredited</div>
              <div className="text-xs text-slate-500">All eligible UG engineering programs accredited under Tier-1</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold text-slate-800">Autonomous Status</div>
              <div className="text-xs text-slate-500">Conferred by UGC and permanently affiliated to Anna University</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-indigo-600 mx-auto" />
              <div className="font-bold text-slate-800">AICTE Approved</div>
              <div className="text-xs text-slate-500">Ministry of Education, Government of India certified campus</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
