export default function AdBanner({ position }) {
  return (
    <div className={`ad-banner ad-${position} my-6 p-4 bg-gray-800 rounded text-center`}>
      <p className="text-xs text-gray-500 mb-2">ADVERTISEMENT</p>
      <img src={process.env.NEXT_PUBLIC_AD_BANNER_URL} alt="Ad Banner" className="mx-auto max-w-full h-auto" />
    </div>
  );
}
