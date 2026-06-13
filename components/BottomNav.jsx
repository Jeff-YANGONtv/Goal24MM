import Link from 'next/link';
import { Home, Newspaper, Trophy, BarChart2, Mail } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { label: 'News', icon: Newspaper, href: '/' },
    { label: 'Articles', icon: Home, href: '/articles' },
    { label: 'Live Score', icon: Trophy, href: '/live' },
    { label: 'Odds', icon: BarChart2, href: '/odds' },
    { label: 'Contact', icon: Mail, href: '/contact' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
