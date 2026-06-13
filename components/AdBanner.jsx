import Image from 'next/image';

export default function AdBanner({ position = 'middle' }) {
  const adUrl = process.env.NEXT_PUBLIC_AD_BANNER_URL || 'https://via.placeholder.com/1200x200?text=Advertisement+Banner';

  return (
    <div className={`w-full flex flex-col items-center justify-center my-8 ${position === 'bottom' ? 'mt-12' : ''}`}>
      <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Advertisement</span>
      <div className="relative w-full max-w-5xl aspect-[6/1] md:aspect-[8/1] rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
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
