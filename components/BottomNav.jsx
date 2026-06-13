'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, Trophy, BarChart2, Mail } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { label: 'News', icon: Newspaper, href: '/' },
    { label: 'Articles', icon: Home, href: '/articles' },
    { label: 'Live Score', icon: Trophy, href: '/live' },
    { label: 'Odds', icon: BarChart2, href: '/odds' },
    { label: 'Contact', icon: Mail, href: '/contact' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-nav z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
                isActive ? 'text-yellow-500 scale-110' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'fill-yellow-500/20' : ''}`} />
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
