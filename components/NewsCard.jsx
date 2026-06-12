import Link from 'next/link';

export default function NewsCard({ post }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-4">
      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <Link href={`/news/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </Link>
        <p className="text-gray-400 text-sm">{new Date(post.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
