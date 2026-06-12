import AdBanner from './AdBanner';

export default function PostContent({ content }) {
  return (
    <article className="max-w-3xl mx-auto p-4">
      <div className="prose prose-invert lg:prose-xl mb-8" dangerouslySetInnerHTML={{ __html: content }} />
      <AdBanner position="bottom" />
    </article>
  );
}
