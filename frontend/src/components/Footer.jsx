import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Award, CheckCircle2, Bot } from 'lucide-react';
import CollegeLogo from '../assets/CollegeLogo';

export default function Footer() {
  return (
    <footer className="bg-[#0b1a30] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: College Intro & Accreditations */}
          <div className="lg:col-span-4 space-y-4">
            <CollegeLogo textClassName="text-white" />
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Sri Venkateswara College of Engineering (SVCE) is an autonomous premier engineering institution permanently affiliated to Anna University and accredited with NAAC 'A++' Grade.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-blue-400 text-xs border border-slate-700 font-medium">
                <Award className="w-3.5 h-3.5" /> NAAC A++ (3.65 CGPA)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-amber-400 text-xs border border-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> NBA Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-emerald-400 text-xs border border-slate-700 font-medium">
                TNEA Code: 1219
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-semibold text-base tracking-wide">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Our College</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Academics & Degrees</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions 2026</Link></li>
              <li><Link to="/campus-life" className="hover:text-white transition-colors">Campus Life & Fests</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Map</Link></li>
              <li>
                <Link to="/assistant" className="hover:text-blue-400 font-medium flex items-center gap-1.5 text-blue-400 transition-colors">
                  <Bot className="w-4 h-4" /> AI Assistant Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-semibold text-base tracking-wide">Key Departments</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>B.E. Computer Science & Engineering</li>
              <li>B.Tech Artificial Intelligence & Data Science</li>
              <li>B.E. Electronics & Communication</li>
              <li>B.Tech Information Technology</li>
              <li>B.E. Mechanical Engineering</li>
              <li>B.Tech Biotechnology</li>
              <li>Master of Business Administration (MBA)</li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-semibold text-base tracking-wide">Campus Location</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>
                  Post Bag No. 1, Pennalur, Sriperumbudur Taluk, Tamil Nadu - 602117, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>+91 98765 43210 / +91 44 2715 2000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>admissions@mycollege.edu</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Sri Venkateswara College of Engineering. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/assistant" className="hover:text-slate-300">College Assistant AI</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300">Privacy & Terms</Link>
            <span>•</span>
            <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              Staff Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
