'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'News', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Live Score', href: '/live' },
    { name: 'Odds', href: '/odds' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_4px_0_0_#ca8a04]">
              <span className="text-black font-black text-xl">G</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase hidden sm:inline">
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

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-yellow-500 focus:ring-0 transition-colors"
              />
              <button
                type="submit"
                className="ml-2 text-gray-400 hover:text-yellow-500 transition-colors p-2"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-gray-400 p-2 hover:text-yellow-500 transition-colors"
            >
              {searchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="md:hidden pb-4 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              autoFocus
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-yellow-500 focus:ring-0 transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Search
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
