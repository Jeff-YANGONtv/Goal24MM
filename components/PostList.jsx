'use client';

import { NewsCard } from './NewsCard';

export function PostList({ articles, title = 'Latest News' }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No articles found</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {title && (
        <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-accent pb-3">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
