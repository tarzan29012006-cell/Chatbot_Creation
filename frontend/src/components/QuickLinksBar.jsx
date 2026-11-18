import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Trophy, Calendar } from 'lucide-react';

const QUICK_LINKS = [
  {
    title: "Academic Programs",
    desc: "UG, PG & Research Specializations",
    icon: GraduationCap,
    to: "/academics"
  },
  {
    title: "Student Life",
    desc: "Hostels, Clubs & Cultural Societies",
    icon: Users,
    to: "/campus-life"
  },
  {
    title: "Achievements",
    desc: "NIRF Ranking, 44 LPA Placements",
    icon: Trophy,
    to: "/about#achievements"
  },
  {
    title: "Events",
    desc: "Milan Cultural Fest & Hackathons",
    icon: Calendar,
    to: "/campus-life#events"
  }
];

export default function QuickLinksBar() {
  return (
    <div className="bg-[#f8fafc] border-b border-slate-200/80 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/90 py-1">
          {QUICK_LINKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.to}
                className="group flex flex-col items-center justify-center p-5 sm:p-6 text-center hover:bg-white hover:shadow-md transition-all duration-200 rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-blue-100/80 flex items-center justify-center mb-3 transition-colors duration-200">
                  <Icon className="w-6 h-6 text-[#1254cf] group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 group-hover:text-[#1254cf] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {item.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
