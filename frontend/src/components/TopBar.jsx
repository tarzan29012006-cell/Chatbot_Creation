import React from 'react';
import { Mail, Phone, Youtube, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-[#0b1a30] text-slate-200 text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Contact info */}
        <div className="flex items-center space-x-6">
          <a
            href="mailto:admissions@mycollege.edu"
            className="flex items-center gap-2 hover:text-white transition-colors duration-150"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>admissions@mycollege.edu</span>
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 hover:text-white transition-colors duration-150"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>+91 98765 43210</span>
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="text-slate-300 hover:text-red-400 transition-colors"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-300 hover:text-blue-400 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-slate-300 hover:text-pink-400 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="text-slate-300 hover:text-white transition-colors"
          >
            {/* X Logo */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
