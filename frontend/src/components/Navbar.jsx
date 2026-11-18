import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X, BookOpen, GraduationCap, Users, Award, Calendar, Sparkles } from 'lucide-react';
import CollegeLogo from '../assets/CollegeLogo';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [campusLifeOpen, setCampusLifeOpen] = useState(false);

  const isActive = (path) => currentPath === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="hover:opacity-95 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
          <CollegeLogo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-[0.95rem] font-medium text-slate-700">
          {/* Home */}
          <Link
            to="/"
            className={`relative py-1 transition-colors hover:text-svce-primary ${
              isActive('/') ? 'text-svce-primary font-semibold' : 'text-slate-700'
            }`}
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-[-6px] left-0 right-0 h-[2.5px] bg-svce-primary rounded-full" />
            )}
          </Link>

          {/* About */}
          <Link
            to="/about"
            className={`relative py-1 transition-colors hover:text-svce-primary ${
              isActive('/about') ? 'text-svce-primary font-semibold' : 'text-slate-700'
            }`}
          >
            About
            {isActive('/about') && (
              <span className="absolute bottom-[-6px] left-0 right-0 h-[2.5px] bg-svce-primary rounded-full" />
            )}
          </Link>

          {/* Academics Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAcademicsOpen(true)}
            onMouseLeave={() => setAcademicsOpen(false)}
          >
            <Link
              to="/academics"
              className={`flex items-center gap-1 py-1 hover:text-svce-primary transition-colors ${
                isActive('/academics') ? 'text-svce-primary font-semibold' : 'text-slate-700'
              }`}
            >
              <span>Academics</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${academicsOpen ? 'rotate-180 text-svce-primary' : ''}`} />
            </Link>

            {/* Dropdown Menu */}
            {academicsOpen && (
              <div className="absolute top-full left-0 w-64 pt-2 shadow-2xl rounded-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-xl border border-slate-100 p-2 shadow-lg">
                  <Link
                    to="/academics#ug"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-svce-primary" />
                    <div>
                      <div className="font-medium">Undergraduate (B.E./B.Tech)</div>
                      <div className="text-xs text-slate-500">CSE, AI&DS, ECE, IT, Mech</div>
                    </div>
                  </Link>
                  <Link
                    to="/academics#pg"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-svce-primary" />
                    <div>
                      <div className="font-medium">Postgraduate & MBA</div>
                      <div className="text-xs text-slate-500">M.E., M.Tech & Management</div>
                    </div>
                  </Link>
                  <Link
                    to="/academics#faculty"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <Users className="w-4 h-4 text-svce-primary" />
                    <div>
                      <div className="font-medium">Faculty & Research</div>
                      <div className="text-xs text-slate-500">320+ Distinguished Faculty</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Admissions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAdmissionsOpen(true)}
            onMouseLeave={() => setAdmissionsOpen(false)}
          >
            <Link
              to="/admissions"
              className={`flex items-center gap-1 py-1 hover:text-svce-primary transition-colors ${
                isActive('/admissions') ? 'text-svce-primary font-semibold' : 'text-slate-700'
              }`}
            >
              <span>Admissions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${admissionsOpen ? 'rotate-180 text-svce-primary' : ''}`} />
            </Link>

            {admissionsOpen && (
              <div className="absolute top-full left-0 w-64 pt-2 shadow-2xl rounded-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-xl border border-slate-100 p-2 shadow-lg">
                  <Link
                    to="/admissions#process"
                    className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <div className="font-medium">TNEA Counselling (Code: 1219)</div>
                    <div className="text-xs text-slate-500">Anna University single window</div>
                  </Link>
                  <Link
                    to="/admissions#management"
                    className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <div className="font-medium">Management Quota</div>
                    <div className="text-xs text-slate-500">Merit-based direct intake</div>
                  </Link>
                  <Link
                    to="/admissions#fees"
                    className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <div className="font-medium">Fees & Scholarships</div>
                    <div className="text-xs text-slate-500">Tuition, hostel & aid grants</div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Campus Life Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCampusLifeOpen(true)}
            onMouseLeave={() => setCampusLifeOpen(false)}
          >
            <Link
              to="/campus-life"
              className={`flex items-center gap-1 py-1 hover:text-svce-primary transition-colors ${
                isActive('/campus-life') ? 'text-svce-primary font-semibold' : 'text-slate-700'
              }`}
            >
              <span>Campus Life</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${campusLifeOpen ? 'rotate-180 text-svce-primary' : ''}`} />
            </Link>

            {campusLifeOpen && (
              <div className="absolute top-full left-0 w-60 pt-2 shadow-2xl rounded-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-xl border border-slate-100 p-2 shadow-lg">
                  <Link
                    to="/campus-life#events"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-svce-primary" />
                    <span>Milan Cultural & Fests</span>
                  </Link>
                  <Link
                    to="/campus-life#clubs"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-svce-primary" />
                    <span>Clubs & Societies</span>
                  </Link>
                  <Link
                    to="/campus-life#hostels"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-svce-primary transition-colors"
                  >
                    <Award className="w-4 h-4 text-svce-primary" />
                    <span>Hostels & Sports</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <Link
            to="/contact"
            className={`relative py-1 transition-colors hover:text-svce-primary ${
              isActive('/contact') ? 'text-svce-primary font-semibold' : 'text-slate-700'
            }`}
          >
            Contact
            {isActive('/contact') && (
              <span className="absolute bottom-[-6px] left-0 right-0 h-[2.5px] bg-svce-primary rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right CTA Button (Apply Now) */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/admissions#apply"
            className="inline-flex items-center gap-2 bg-[#1254cf] hover:bg-[#0b44aa] text-white text-[0.92rem] font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-95"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-svce-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${isActive('/') ? 'text-svce-primary font-bold' : 'text-slate-700'}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${isActive('/about') ? 'text-svce-primary font-bold' : 'text-slate-700'}`}
          >
            About
          </Link>
          <Link
            to="/academics"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${isActive('/academics') ? 'text-svce-primary font-bold' : 'text-slate-700'}`}
          >
            Academics
          </Link>
          <Link
            to="/admissions"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${isActive('/admissions') ? 'text-svce-primary font-bold' : 'text-slate-700'}`}
          >
            Admissions
          </Link>
          <Link
            to="/campus-life"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${isActive('/campus-life') ? 'text-svce-primary font-bold' : 'text-slate-700'}`}
          >
            Campus Life
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${isActive('/contact') ? 'text-svce-primary font-bold' : 'text-slate-700'}`}
          >
            Contact
          </Link>
          <Link
            to="/assistant"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${isActive('/assistant') ? 'text-svce-primary font-bold' : 'text-blue-600'}`}
          >
            🤖 College Assistant
          </Link>
          <div className="pt-2">
            <Link
              to="/admissions#apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#1254cf] text-white py-2.5 rounded-full font-medium"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
