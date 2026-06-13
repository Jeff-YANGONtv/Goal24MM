'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'News', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Live Score', href: '/live' },
    { name: 'Odds', href: '/odds' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_4px_0_0_#ca8a04]">
              <span className="text-black font-black text-xl">G</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">
              Goal<span className="text-yellow-500">24</span>MM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative py-2 ${
                    isActive ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 shadow-[0_0_8px_#eab308]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Search Placeholder */}
          <div className="md:hidden">
            <button className="text-gray-400 p-2 hover:text-yellow-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
