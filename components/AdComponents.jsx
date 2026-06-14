import Image from 'next/image';

/**
 * Header Advertisement Component
 * Displays ad banner at the top of pages
 */
export function HeaderAd() {
  const adUrl = process.env.NEXT_PUBLIC_AD_BANNER_URL || 'https://via.placeholder.com/1200x100?text=Header+Advertisement';

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Advertisement</span>
      <div className="relative w-full max-w-5xl aspect-[12/1] rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
        <Image
          src={adUrl}
          alt="Header Advertisement"
          fill
          className="object-cover opacity-80 hover:opacity-100 transition-opacity"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </div>
  );
}

/**
 * Sidebar Advertisement Component
 * Displays vertical ad in sidebar
 */
export function SidebarAd() {
  const adUrl = process.env.NEXT_PUBLIC_AD_BANNER_URL || 'https://via.placeholder.com/300x600?text=Sidebar+Advertisement';

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Advertisement</span>
      <div className="relative w-full aspect-[300/600] rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
        <Image
          src={adUrl}
          alt="Sidebar Advertisement"
          fill
          className="object-cover opacity-80 hover:opacity-100 transition-opacity"
          sizes="300px"
        />
      </div>
    </div>
  );
}

/**
 * In-Article Advertisement Component
 * Displays ad within article content
 */
export function InArticleAd() {
  const adUrl = process.env.NEXT_PUBLIC_AD_BANNER_URL || 'https://via.placeholder.com/800x300?text=In-Article+Advertisement';

  return (
    <div className="w-full flex flex-col items-center justify-center my-8">
      <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Advertisement</span>
      <div className="relative w-full max-w-3xl aspect-[8/3] rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
        <Image
          src={adUrl}
          alt="In-Article Advertisement"
          fill
          className="object-cover opacity-80 hover:opacity-100 transition-opacity"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>
    </div>
  );
}

/**
 * Footer Advertisement Component
 * Displays ad banner at the bottom of pages
 */
export function FooterAd() {
  const adUrl = process.env.NEXT_PUBLIC_AD_BANNER_URL || 'https://via.placeholder.com/1200x150?text=Footer+Advertisement';

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 mt-16">
      <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Advertisement</span>
      <div className="relative w-full max-w-5xl aspect-[8/1] rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
        <Image
          src={adUrl}
          alt="Footer Advertisement"
          fill
          className="object-cover opacity-80 hover:opacity-100 transition-opacity"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </div>
  );
}

/**
 * Responsive Advertisement Component
 * Adapts to different screen sizes
 */
export function ResponsiveAd({ position = 'middle' }) {
  const adUrl = process.env.NEXT_PUBLIC_AD_BANNER_URL || 'https://via.placeholder.com/1200x200?text=Advertisement+Banner';

  const aspectRatios = {
    header: 'aspect-[12/1]',
    middle: 'aspect-[8/1]',
    sidebar: 'aspect-[300/600]',
    footer: 'aspect-[8/1]',
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center my-8 ${position === 'footer' ? 'mt-16' : ''}`}>
      <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Advertisement</span>
      <div className={`relative w-full max-w-5xl ${aspectRatios[position] || aspectRatios.middle} rounded-lg overflow-hidden bg-gray-900 border border-gray-800`}>
        <Image
          src={adUrl}
          alt="Advertisement"
          fill
          className="object-cover opacity-80 hover:opacity-100 transition-opacity"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </div>
  );
}
