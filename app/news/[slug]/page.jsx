import { fetchSinglePost } from '../../../lib/fetchSinglePost';
import PostContent from '../../../components/PostContent';

export default async function SingleArticlePage({ params }) {
  const post = await fetchSinglePost(params.slug);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className="text-gray-400">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-2">|</span>
          <span>Goal24MM</span>
        </div>
      </header>

      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <img 
          src={post._embedded['wp:featuredmedia'][0].source_url} 
          alt={post.title.rendered} 
          className="w-full h-auto rounded-lg mb-8"
        />
      )}

      <PostContent content={post.content.rendered} />
    </div>
  );
}
