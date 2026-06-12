'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'News', href: '/', icon: '📰' },
    { name: 'Live Score', href: '/live-score', icon: '⚽' },
    { name: 'Odds', href: '/odds', icon: '💰' },
    { name: 'Contact', href: '/contact', icon: '📧' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary border-t border-gray-700 z-50">
      <div className="flex justify-around items-center h-20 max-w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive
                  ? 'text-accent border-t-2 border-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
