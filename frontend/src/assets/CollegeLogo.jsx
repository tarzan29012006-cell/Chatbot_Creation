import React from 'react';

export default function CollegeLogo({ className = "h-12", textClassName = "text-svce-darkBlue" }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Detailed Crest Emblem */}
      <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Shield with Gold Accent */}
        <path d="M50 4L84 18V50C84 72 50 94 50 94C50 94 16 72 16 50V18L50 4Z" fill="#0C2340" stroke="#F59E0B" strokeWidth="2.5" />
        <path d="M50 9L79 21V49C79 68 50 88 50 88C50 88 21 68 21 49V21L50 9Z" fill="#1354CF" />
        
        {/* Laurel Wreath Accents */}
        <path d="M28 45C28 62 40 76 50 80C60 76 72 62 72 45" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
        
        {/* Radiating Sun Rays */}
        <circle cx="50" cy="30" r="8" fill="#F59E0B" />
        <path d="M50 18V22M50 38V42M38 30H42M58 30H62M42 22L45 25M55 35L58 38M42 38L45 35M55 25L58 22" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        
        {/* Open Book of Knowledge */}
        <path d="M30 56C36 53 44 54 50 58C56 54 64 53 70 56V72C64 68 56 69 50 73C44 69 36 68 30 72V56Z" fill="#FFFFFF" stroke="#0C2340" strokeWidth="1.5" />
        <path d="M50 58V73" stroke="#0C2340" strokeWidth="1.5" />
        
        {/* Torch / Flame in Center */}
        <path d="M47 48C47 44 50 41 50 41C50 41 53 44 53 48C53 50 51.5 51 50 51C48.5 51 47 50 47 48Z" fill="#F59E0B" />
      </svg>

      {/* College Typography */}
      <div className="flex flex-col">
        <span className={`text-[1.15rem] sm:text-[1.25rem] font-serif font-bold tracking-tight leading-tight ${textClassName}`}>
          Sri Venkateswara
        </span>
        <span className={`text-[0.95rem] sm:text-[1.05rem] font-serif font-semibold tracking-tight text-slate-700 leading-tight`}>
          College of Engineering
        </span>
      </div>
    </div>
  );
}
