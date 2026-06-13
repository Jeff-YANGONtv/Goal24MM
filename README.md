# Goal24MM - Myanmar Football News Platform

A professional, mobile-first football news website for Myanmar fans powered by Next.js and WordPress.com RSS feeds.

## 🎯 Project Overview

Goal24MM is a modern football news platform that aggregates content from WordPress.com via RSS feeds. The application is built with Next.js App Router for optimal performance, SEO, and mobile-first design.

## 🏗️ Architecture

```
WordPress.com (RSS Feed)
        ↓
   RSS Parser (rss-parser)
        ↓
   Next.js Data Layer (lib/rss.js)
        ↓
   Pages & Components
        ↓
   Vercel Deployment
```

## 📋 Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Content Source**: WordPress.com (RSS Feed)
- **Styling**: Tailwind CSS
- **Image Optimization**: Next.js Image Component
- **Deployment**: Vercel
- **Parser**: rss-parser

## 📁 Project Structure

```
Goal24MM/
├── app/
│   ├── layout.jsx                 # Root layout with SEO metadata
│   ├── page.jsx                   # Homepage with breaking & latest news
│   ├── sitemap.js                 # Dynamic sitemap for SEO
│   ├── robots.js                  # Robots.txt configuration
│   ├── articles/
│   │   └── page.jsx               # All articles listing
│   ├── contact/
│   │   └── page.jsx               # Contact page
│   ├── live/
│   │   └── page.jsx               # Live scores (placeholder)
│   ├── news/
│   │   └── [slug]/
│   │       └── page.jsx           # Dynamic article page
│   └── odds/
│       └── page.jsx               # Odds & predictions (placeholder)
├── components/
│   ├── Header.jsx                 # Top navigation
│   ├── BottomNav.jsx              # Mobile bottom navigation
│   ├── NewsCard.jsx               # Reusable news card component
│   ├── PostContent.jsx            # Article content wrapper
│   └── AdBanner.jsx               # Advertisement banner
├── lib/
│   ├── rss.js                     # RSS feed integration layer
│   ├── fetchPosts.js              # (DEPRECATED - use rss.js)
│   ├── fetchSinglePost.js         # (DEPRECATED - use rss.js)
│   └── wordpress.js               # (DEPRECATED - use rss.js)
├── styles/
│   └── globals.css                # Global Tailwind styles
├── public/
│   ├── favicon.ico                # Site favicon
│   └── og-image.jpg               # Open Graph image
├── .env.local                     # Environment variables
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies & scripts
├── tailwind.config.js             # Tailwind configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jeff-YANGONtv/Goal24MM.git
   cd Goal24MM
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_NAME=Goal24MM
   NEXT_PUBLIC_SITE_URL=https://goal24mm.com
   NEXT_PUBLIC_RSS_FEED_URL=https://goal24mm.wordpress.com/feed/
   NEXT_PUBLIC_AD_BANNER_URL=https://your-ad-network.com/banner.jpg
   NEXT_REVALIDATE=3600
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 RSS Feed Integration

The application fetches content from a WordPress.com RSS feed using the `rss-parser` library. The integration layer normalizes RSS XML into a consistent JSON structure:

```javascript
{
  title: string,           // Article title
  slug: string,            // URL-friendly identifier
  link: string,            // Original WordPress URL
  date: string,            // Publication date (ISO 8601)
  excerpt: string,         // Short summary (160 chars)
  content: string,         // Full HTML content
  image: string,           // Featured image URL
  categories: string[],    // Article categories
  creator: string          // Author name
}
```

### Key Functions

- `fetchRssPosts()`: Fetches and parses all posts from the RSS feed
- `fetchSingleRssPost(slug)`: Retrieves a specific post by slug

## 🎨 Design Features

- **Dark Modern Theme**: Professional black background with red accent colors
- **Mobile-First**: Fully responsive design with bottom navigation on mobile
- **Performance**: Image optimization, caching strategies, lazy loading
- **Accessibility**: Semantic HTML, proper heading hierarchy, alt text

## 🔍 SEO Optimization

### Implemented Features

- **Dynamic Sitemap**: Auto-generated from RSS feed (`/sitemap.xml`)
- **Robots.txt**: Configured for search engine crawling (`/robots.txt`)
- **Open Graph**: Social media sharing metadata
- **Twitter Card**: Enhanced Twitter sharing
- **Canonical URLs**: Proper URL canonicalization
- **Meta Tags**: Title, description, keywords, author
- **Structured Data**: Ready for schema.org implementation

### SEO Best Practices

1. **Content Updates**: RSS feed is checked every hour (configurable via `NEXT_REVALIDATE`)
2. **Dynamic Routes**: Article pages are pre-rendered at build time
3. **Image Optimization**: WebP and AVIF formats with responsive sizes
4. **Performance**: Optimized for Core Web Vitals

## ⚡ Performance Optimization

### Caching Strategy

- **ISR (Incremental Static Regeneration)**: Articles revalidate every 3600 seconds
- **Image Caching**: Optimized with Next.js Image component
- **HTTP Caching**: Cache-Control headers configured in `next.config.js`
- **CDN**: Vercel's global CDN for fast content delivery

### Image Optimization

- Multiple formats (WebP, AVIF)
- Responsive image sizes
- Lazy loading
- Automatic srcset generation

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Environment Variables on Vercel**:
   ```
   NEXT_PUBLIC_SITE_NAME=Goal24MM
   NEXT_PUBLIC_SITE_URL=https://goal24mm.com
   NEXT_PUBLIC_RSS_FEED_URL=https://goal24mm.wordpress.com/feed/
   NEXT_PUBLIC_AD_BANNER_URL=https://your-ad-network.com/banner.jpg
   NEXT_REVALIDATE=3600
   ```

4. **Deploy**: Click "Deploy" and Vercel will automatically build and deploy your site

## 📊 Page Structure

### Homepage (`/`)
- Breaking News section (first 6 posts)
- Advertisement banner
- Latest Articles section (next 6 posts)

### Articles Page (`/articles`)
- Complete list of all RSS posts
- Grid layout with cards
- Responsive design

### Single Article (`/news/[slug]`)
- Full article content
- Featured image
- Publication date and author
- Related articles section
- Bottom advertisement

### Other Pages
- **Live Scores** (`/live`): Placeholder for live score integration
- **Odds** (`/odds`): Placeholder for odds integration
- **Contact** (`/contact`): Contact form (static)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Site name | `Goal24MM` |
| `NEXT_PUBLIC_SITE_URL` | Production URL | `https://goal24mm.com` |
| `NEXT_PUBLIC_RSS_FEED_URL` | WordPress RSS feed | `https://goal24mm.wordpress.com/feed/` |
| `NEXT_PUBLIC_AD_BANNER_URL` | Advertisement image | `https://ads.example.com/banner.jpg` |
| `NEXT_REVALIDATE` | ISR revalidation time (seconds) | `3600` |

### Customization

- **Colors**: Update Tailwind classes in components (primary red: `text-red-600`)
- **Fonts**: Modify in `styles/globals.css`
- **RSS Feed**: Change `NEXT_PUBLIC_RSS_FEED_URL` in `.env.local`
- **Caching**: Adjust `NEXT_REVALIDATE` for different update frequencies

## 🐛 Troubleshooting

### RSS Feed Not Loading
- Verify the RSS feed URL is accessible
- Check browser console for CORS errors
- Ensure `rss-parser` is installed: `npm install rss-parser`

### Images Not Displaying
- Verify image URLs are accessible
- Check `next.config.js` for correct remote patterns
- Ensure image domains are whitelisted

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## 📝 Development

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📄 License

This project is private and proprietary to Goal24MM.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## 🔗 Links

- **WordPress Blog**: https://goal24mm.wordpress.com
- **RSS Feed**: https://goal24mm.wordpress.com/feed/
- **Live Site**: https://goal24mm.com
- **GitHub**: https://github.com/Jeff-YANGONtv/Goal24MM

---

**Last Updated**: June 2026
**Version**: 1.0.0
**Status**: Production Ready
