'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsCard from '@/components/NewsCard';
import { SkeletonGrid } from '@/components/Skeleton';
import { EmptyState, ErrorState } from '@/components/ErrorState';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const params = new URLSearchParams();
      params.set('q', searchInput);
      window.location.href = `/search?${params.toString()}`;
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-6 text-white">Search Football News</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for articles, teams, players..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-yellow-500 focus:ring-0 transition-colors text-white placeholder:text-gray-600"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Search
          </button>
        </form>

        {query && (
          <p className="text-gray-400 mt-4">
            Results for: <span className="text-yellow-500 font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div>
          <p className="text-gray-400 mb-8">Searching...</p>
          <SkeletonGrid count={6} />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <ErrorState
          title="Search Error"
          message={error}
          onRetry={() => performSearch(query)}
          showHome={true}
        />
      )}

      {/* Empty State */}
      {!loading && !error && results.length === 0 && query && (
        <EmptyState
          title="No Results Found"
          message={`We couldn't find any articles matching "${query}". Try different keywords or browse our latest news.`}
          icon={Search}
          action={{
            href: '/',
            label: 'Back to Home',
          }}
        />
      )}

      {/* Initial State */}
      {!loading && !error && results.length === 0 && !query && (
        <EmptyState
          title="Start Searching"
          message="Enter keywords to search for football news, articles, and updates."
          icon={Search}
          action={{
            href: '/',
            label: 'Browse Latest News',
          }}
        />
      )}

      {/* Results Grid */}
      {!loading && results.length > 0 && (
        <div>
          <p className="text-gray-400 mb-8">
            Found <span className="text-yellow-500 font-semibold">{results.length}</span> result{results.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
