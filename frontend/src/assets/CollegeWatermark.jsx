import React from 'react';

export default function CollegeWatermark({ className = "w-72 h-72 opacity-20" }) {
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central Dome */}
      <path d="M150 20 C130 20 120 40 120 60 H180 C180 40 170 20 150 20 Z" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M150 8 V20" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="150" cy="7" r="2.5" fill="#3B82F6" />
      
      {/* Drum below Dome */}
      <rect x="122" y="60" width="56" height="20" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="130" y1="60" x2="130" y2="80" stroke="#3B82F6" strokeWidth="1" />
      <line x1="140" y1="60" x2="140" y2="80" stroke="#3B82F6" strokeWidth="1" />
      <line x1="150" y1="60" x2="150" y2="80" stroke="#3B82F6" strokeWidth="1" />
      <line x1="160" y1="60" x2="160" y2="80" stroke="#3B82F6" strokeWidth="1" />
      <line x1="170" y1="60" x2="170" y2="80" stroke="#3B82F6" strokeWidth="1" />

      {/* Main Classical Portico & Pillars */}
      <path d="M90 80 L150 45 L210 80 Z" stroke="#2563EB" strokeWidth="1.8" />
      <rect x="90" y="80" width="120" height="8" stroke="#2563EB" strokeWidth="1.5" />

      {/* Pillars */}
      {[105, 125, 145, 155, 175, 195].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="88" x2={x} y2="150" stroke="#2563EB" strokeWidth="2" />
          <line x1={x - 3} y1="88" x2={x + 3} y2="88" stroke="#2563EB" strokeWidth="1.5" />
          <line x1={x - 4} y1="150" x2={x + 4} y2="150" stroke="#2563EB" strokeWidth="2" />
        </g>
      ))}

      {/* Flanking Wings */}
      <rect x="40" y="95" width="50" height="55" stroke="#3B82F6" strokeWidth="1.2" />
      <rect x="210" y="95" width="50" height="55" stroke="#3B82F6" strokeWidth="1.2" />

      {/* Window Grids on Wings */}
      <rect x="52" y="105" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />
      <rect x="68" y="105" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />
      <rect x="52" y="125" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />
      <rect x="68" y="125" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />

      <rect x="222" y="105" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />
      <rect x="238" y="105" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />
      <rect x="222" y="125" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />
      <rect x="238" y="125" width="10" height="15" rx="3" stroke="#3B82F6" strokeWidth="1" />

      {/* Plinth Base Steps */}
      <line x1="20" y1="150" x2="280" y2="150" stroke="#1D4ED8" strokeWidth="2" />
      <line x1="15" y1="156" x2="285" y2="156" stroke="#1D4ED8" strokeWidth="2" />
      <line x1="10" y1="162" x2="290" y2="162" stroke="#1D4ED8" strokeWidth="2" />
    </svg>
  );
}
