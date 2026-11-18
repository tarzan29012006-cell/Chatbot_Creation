import React, { useState } from 'react';
import { GraduationCap, BookOpen, Cpu, Brain, Radio, Cog, Dna, Building2, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UG_PROGRAMS = [
  {
    code: 'CSE',
    name: 'B.E. Computer Science and Engineering',
    seats: 180,
    duration: '4 Years (8 Semesters)',
    icon: Cpu,
    highlights: ['Cloud Computing & Distributed Systems', 'Generative AI & LLMs', 'Cyber Security & Cryptography', 'Full-Stack Software Engineering']
  },
  {
    code: 'AI & DS',
    name: 'B.Tech Artificial Intelligence and Data Science',
    seats: 120,
    duration: '4 Years (8 Semesters)',
    icon: Brain,
    highlights: ['Deep Neural Networks', 'Computer Vision & NLP', 'Big Data Engineering with Spark', 'Autonomous Robotics Systems']
  },
  {
    code: 'ECE',
    name: 'B.E. Electronics and Communication Engineering',
    seats: 180,
    duration: '4 Years (8 Semesters)',
    icon: Radio,
    highlights: ['VLSI Circuit Design with Cadence', '5G/6G Wireless Networks', 'Embedded IoT Systems', 'Satellite & Optical Communications']
  },
  {
    code: 'IT',
    name: 'B.Tech Information Technology',
    seats: 120,
    duration: '4 Years (8 Semesters)',
    icon: Lightbulb,
    highlights: ['Enterprise Cloud Infrastructure', 'Mobile App Development', 'DevOps & CI/CD Pipelines', 'Database Architecture']
  },
  {
    code: 'MECH',
    name: 'B.E. Mechanical Engineering',
    seats: 120,
    duration: '4 Years (8 Semesters)',
    icon: Cog,
    highlights: ['CAD/CAM & 3D Prototyping', 'Electric Vehicle (EV) Technology', 'Mechatronics & Robotics', 'Computational Fluid Dynamics (CFD)']
  },
  {
    code: 'BIOTECH',
    name: 'B.Tech Biotechnology',
    seats: 60,
    duration: '4 Years (8 Semesters)',
    icon: Dna,
    highlights: ['Genetic Engineering & CRISPR', 'Bioprocess & Fermentation Technology', 'Bioinformatics & Drug Discovery', 'Immunology & Vaccine Tech']
  },
  {
    code: 'CIVIL',
    name: 'B.E. Civil Engineering',
    seats: 60,
    duration: '4 Years (8 Semesters)',
    icon: Building2,
    highlights: ['Structural Analysis with STAAD.Pro', 'Smart City Planning & GIS', 'Sustainable Green Building Tech', 'Geotechnical Engineering']
  }
];

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState('ug');

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0b1a30] via-[#0c2340] to-[#1254cf] text-white py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            Autonomous Academic Excellence • Anna University
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Academic Programs & Departments
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl font-light">
            Industry-aligned autonomous engineering curricula designed to cultivate problem solvers, researchers, and tech pioneers.
          </p>
        </div>
      </section>

      {/* Program Selector Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex border-b border-slate-200 gap-8 text-base font-semibold">
          <button
            onClick={() => setActiveTab('ug')}
            className={`pb-4 border-b-2 transition-colors ${
              activeTab === 'ug'
                ? 'border-[#1254cf] text-[#1254cf]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Undergraduate (B.E. / B.Tech)
          </button>
          <button
            onClick={() => setActiveTab('pg')}
            className={`pb-4 border-b-2 transition-colors ${
              activeTab === 'pg'
                ? 'border-[#1254cf] text-[#1254cf]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Postgraduate & MBA
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`pb-4 border-b-2 transition-colors ${
              activeTab === 'research'
                ? 'border-[#1254cf] text-[#1254cf]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Doctoral Research (Ph.D)
          </button>
        </div>

        {/* Tab 1: UG Programs */}
        {activeTab === 'ug' && (
          <div className="pt-8 space-y-8 animate-in fade-in duration-200" id="ug">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {UG_PROGRAMS.map((prog) => {
                const Icon = prog.icon;
                return (
                  <div
                    key={prog.code}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1254cf] flex items-center justify-center group-hover:bg-[#1254cf] group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          {prog.seats} Seats
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#1254cf] transition-colors leading-snug">
                        {prog.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-1 mb-4">{prog.duration}</div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Specialization Highlights:
                        </div>
                        {prog.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link
                        to="/admissions#apply"
                        className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 font-medium py-2 px-4 rounded-xl text-xs transition-colors"
                      >
                        <span>Admission Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: PG & MBA */}
        {activeTab === 'pg' && (
          <div className="pt-8 space-y-6 animate-in fade-in duration-200" id="pg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Master of Business Administration (MBA)',
                  intake: '60 Seats',
                  dur: '2 Years',
                  specs: 'Finance, Marketing, Human Resource Management, Business Analytics, Operations',
                  elig: 'Graduation in any discipline with min 50% aggregate and valid TANCET / MAT score.'
                },
                {
                  title: 'M.E. Computer Science and Engineering',
                  intake: '18 Seats',
                  dur: '2 Years',
                  specs: 'Advanced Cloud Architectures, Deep Learning, Edge Computing, Cryptography',
                  elig: 'B.E./B.Tech in CSE/IT or equivalent with valid GATE / CEETA-PG score.'
                },
                {
                  title: 'M.Tech Biotechnology',
                  intake: '18 Seats',
                  dur: '2 Years',
                  specs: 'Biopharmaceutical Engineering, Proteomics, Downstream Processing',
                  elig: 'B.Tech Biotechnology / Industrial Biotech / Chemical Engg with valid score.'
                },
                {
                  title: 'M.E. Mechatronics and Automation',
                  intake: '18 Seats',
                  dur: '2 Years',
                  specs: 'Robotic Vision Systems, Industry 4.0 IoT, Pneumatic & Hydraulic Automation',
                  elig: 'B.E. in Mech, ECE, EEE, Automobile or Mechatronics.'
                }
              ].map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1254cf] bg-blue-50 px-2.5 py-1 rounded-full">
                      {p.dur}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">{p.intake}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{p.title}</h3>
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Specializations:</span> {p.specs}
                  </div>
                  <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">Eligibility:</span> {p.elig}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Doctoral Research */}
        {activeTab === 'research' && (
          <div className="pt-8 space-y-6 animate-in fade-in duration-200" id="research">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-2xl font-serif font-bold text-[#0c2340]">Doctoral Research Centers (Ph.D)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                SVCE is a formally recognized Doctoral Research Center of Anna University across 10 academic departments. Over 180 research scholars are currently pursuing Ph.D and M.S. (By Research) programs under the guidance of 65 certified research supervisors.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-medium text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200">Computer Science & Engg</div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">Electronics & Communication</div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">Biotechnology</div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">Mechanical Engineering</div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">Electrical & Electronics</div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">Physics & Chemistry</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
