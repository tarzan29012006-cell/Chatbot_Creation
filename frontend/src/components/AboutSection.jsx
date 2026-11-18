import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CollegeWatermark from '../assets/CollegeWatermark';

export default function AboutSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
      {/* Background Architectural Watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none translate-x-12 translate-y-6">
        <CollegeWatermark className="w-[380px] sm:w-[480px] h-auto opacity-15 text-blue-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Student Lawn Photo Card matching the uploaded mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              {/* Photo of students on lawn with laptop */}
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80"
                alt="Students studying together on Sri Venkateswara College lawn"
                className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle glass badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/40 shadow-sm flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">4 Decades of Excellence</span>
                <span className="text-xs font-bold text-[#1254cf]">Est. 1985</span>
              </div>
            </div>

            {/* Decorative soft glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/50 to-amber-200/30 rounded-3xl blur-2xl -z-10" />
          </div>

          {/* Right Column: About Our College Text & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#1254cf] text-xs font-semibold tracking-wide uppercase">
              Autonomous Institution • NAAC A++
            </div>

            {/* Serif Heading matching mockup */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0c2340] leading-tight">
              About Our College
            </h2>

            {/* Description matching mockup */}
            <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed">
              A hub of knowledge, innovation and opportunity, our college strives to nurture talent and build a better tomorrow.
            </p>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Permanently affiliated to Anna University and approved by AICTE, SVCE combines rigorous academic standards with hands-on industrial immersion. Our 95-acre smart campus houses over 4,500 aspiring engineers and researchers across 12 cutting-edge engineering disciplines.
            </p>

            {/* Key feature pills */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>NAAC 'A++' Grade Accreditation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Top 44 LPA Highest Package</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100k+ Books Central Library</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>65 Air-Conditioned Buses Fleet</span>
              </div>
            </div>

            {/* Know More Pill Button matching mockup */}
            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 bg-[#0c2340] hover:bg-[#123158] text-white font-medium px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
