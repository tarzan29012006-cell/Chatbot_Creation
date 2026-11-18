import React from 'react';

export default function MascotRobot({ className = "w-44 h-44", animated = true }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft Ambient Radial Glow Behind Mascot */}
      <div className="absolute inset-0 bg-blue-200/50 rounded-full blur-2xl transform scale-90 -z-10" />

      {/* Floating Sparkles & Accents around robot */}
      <div className="absolute top-2 right-2 text-svce-primary animate-pulse text-lg font-bold">✦</div>
      <div className="absolute bottom-6 left-2 text-svce-yellow text-sm font-bold">✨</div>

      <svg
        viewBox="0 0 240 240"
        className={`w-full h-full drop-shadow-xl ${animated ? 'animate-float' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Head & Body Gloss Gradients */}
          <linearGradient id="bodyGloss" x1="50" y1="90" x2="190" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#F1F5F9" />
            <stop offset="1" stopColor="#D9E6F7" />
          </linearGradient>

          <linearGradient id="screenGloss" x1="80" y1="85" x2="160" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B1E38" />
            <stop offset="1" stopColor="#081426" />
          </linearGradient>

          <linearGradient id="accentBlue" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="capGrad" x1="60" y1="30" x2="180" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E293B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 1. Waving Right Arm (Raised high with waving palm) */}
        <g className="origin-[185px_130px] animate-[pulse_2s_ease-in-out_infinite]">
          {/* Arm limb */}
          <path
            d="M170 135 C190 120 205 95 208 75"
            stroke="url(#bodyGloss)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Hand Palm */}
          <circle cx="210" cy="72" r="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          {/* Waving Fingers */}
          <path d="M204 62 C204 56 208 55 210 55 C212 55 215 57 215 62" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <path d="M213 63 C214 58 218 57 220 57 C222 57 223 60 222 65" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <path d="M219 66 C221 62 225 62 227 63 C228 65 227 68 225 72" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          {/* Thumb */}
          <path d="M201 70 C197 68 196 72 198 76" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* 2. Left Arm (Resting gracefully) */}
        <path
          d="M70 140 C55 155 52 175 60 185"
          stroke="url(#bodyGloss)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <circle cx="62" cy="186" r="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

        {/* 3. Lower Torso & Base */}
        <ellipse cx="120" cy="205" rx="46" ry="16" fill="#D0E1F9" opacity="0.6" />
        <path
          d="M80 145 C80 130 95 125 120 125 C145 125 160 130 160 145 C160 185 145 202 120 202 C95 202 80 185 80 145 Z"
          fill="url(#bodyGloss)"
          stroke="#CBD5E1"
          strokeWidth="2.5"
        />

        {/* Chest Plate / Light Screen */}
        <rect x="100" y="152" width="40" height="26" rx="8" fill="#E0EDFD" stroke="#93C5FD" strokeWidth="1.5" />
        <circle cx="120" cy="165" r="5" fill="#3B82F6" className="animate-ping origin-center opacity-75" />
        <circle cx="120" cy="165" r="5" fill="#2563EB" />

        {/* 4. Robot Neck Joint */}
        <rect x="108" y="120" width="24" height="12" rx="4" fill="#94A3B8" />

        {/* 5. Robot Head (Smooth rounded capsule) */}
        {/* Left & Right Ear Pods */}
        <rect x="52" y="85" width="14" height="26" rx="6" fill="#64748B" />
        <rect x="56" y="88" width="8" height="20" rx="4" fill="#38BDF8" />
        
        <rect x="174" y="85" width="14" height="26" rx="6" fill="#64748B" />
        <rect x="176" y="88" width="8" height="20" rx="4" fill="#38BDF8" />

        {/* Head Shell */}
        <rect
          x="62"
          y="62"
          width="116"
          height="68"
          rx="32"
          fill="url(#bodyGloss)"
          stroke="#CBD5E1"
          strokeWidth="2.5"
        />

        {/* Glossy Black Face Visor Screen */}
        <rect
          x="72"
          y="72"
          width="96"
          height="48"
          rx="22"
          fill="url(#screenGloss)"
          stroke="#1E3A8A"
          strokeWidth="1.5"
        />

        {/* Visor Glare / Reflection Arc */}
        <path
          d="M82 78 C95 75 130 75 156 80"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* Happy Curved Smiling Robot Eyes (Cyan/Light Blue) */}
        <g stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none">
          {/* Left Eye: Joyful upward curve */}
          <path d="M88 95 C92 88 100 88 104 95" />
          {/* Right Eye: Joyful upward curve */}
          <path d="M136 95 C140 88 148 88 152 95" />
          {/* Cute Smile */}
          <path d="M115 106 C118 109 122 109 125 106" strokeWidth="2.5" />
        </g>

        {/* Soft Pink Cheeks */}
        <ellipse cx="86" cy="102" rx="4" ry="2.5" fill="#F43F5E" opacity="0.4" />
        <ellipse cx="154" cy="102" rx="4" ry="2.5" fill="#F43F5E" opacity="0.4" />

        {/* 6. Graduation Mortarboard Cap */}
        {/* Cap Skull Base */}
        <ellipse cx="120" cy="62" rx="36" ry="12" fill="#0F172A" />
        
        {/* Diamond Mortarboard Top */}
        <path
          d="M120 28 L178 44 L120 60 L62 44 Z"
          fill="url(#capGrad)"
          stroke="#334155"
          strokeWidth="1.5"
        />
        {/* Mortarboard Border Highlight */}
        <path
          d="M62 44 L120 60 L178 44"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Center Golden Button */}
        <circle cx="120" cy="44" r="4.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

        {/* Golden Tassel Draping to the Left */}
        <path
          d="M120 44 C100 46 80 50 74 65 C72 70 70 78 72 82"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tassel Fringe / Brush */}
        <path
          d="M68 82 L76 82 L74 94 L70 94 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
