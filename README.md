# Goal24MM - Football News & Live Scores Platform

A modern, production-ready football news website built with Next.js, Tailwind CSS, and WordPress integration.

## 🚀 Features

### Core Features
- **Latest Football News**: Real-time news updates from WordPress
- **Search Functionality**: Full-text search across all articles
- **Category System**: Browse news by category
- **Responsive Design**: Mobile-first, fully responsive UI
- **Dark Theme**: Professional dark theme optimized for readability

### Advanced Features
- **SEO Optimized**: Complete SEO implementation with JSON-LD schemas
- **PWA Support**: Installable app with offline support
- **Performance Optimized**: Lighthouse 90+ scores
- **Image Optimization**: Automatic image optimization and lazy loading
- **Caching Strategy**: Intelligent caching for fast performance
- **Security Headers**: Comprehensive security headers
- **Contact Form**: Fully functional contact form with validation

### Placeholder Features (Coming Soon)
- **Live Scores**: Real-time match tracking
- **Betting Odds**: Odds comparison and expert predictions

## 📋 Project Structure

```
Goal24MM/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form API
│   │   └── search/               # Search API
│   ├── categories/               # Category pages
│   ├── news/[slug]/              # Article detail pages
│   ├── search/                   # Search page
│   ├── articles/                 # Articles list
│   ├── live/                     # Live scores (placeholder)
│   ├── odds/                     # Betting odds (placeholder)
│   ├── contact/                  # Contact page
│   ├── layout.jsx                # Root layout
│   ├── page.jsx                  # Homepage
│   ├── robots.js                 # Robots.txt
│   └── sitemap.js                # Sitemap.xml
├── components/                   # React components
│   ├── Header.jsx                # Header with search
│   ├── BottomNav.jsx             # Mobile bottom navigation
│   ├── NewsCard.jsx              # News card component
│   ├── AdComponents.jsx          # Advertisement components
│   ├── Skeleton.jsx              # Loading skeletons
│   ├── ErrorState.jsx            # Error states
│   ├── OptimizedImage.jsx        # Optimized image component
│   └── ServiceWorkerRegister.jsx # PWA registration
├── lib/                          # Utility functions
│   ├── rss.js                    # RSS feed integration
│   ├── wordpress.js              # WordPress API integration
│   ├── seo.js                    # SEO utilities
│   └── utils/                    # Common utilities
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   └── offline.html              # Offline page
├── styles/                       # Global styles
│   └── globals.css               # Tailwind CSS
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── vercel.json                   # Vercel configuration
├── DEPLOYMENT_GUIDE.md           # Deployment documentation
└── package.json                  # Dependencies
```

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Content**: WordPress REST API / RSS Feed
- **Deployment**: Vercel
- **PWA**: Service Workers, Web App Manifest
- **SEO**: JSON-LD, Open Graph, Twitter Cards

## 📦 Installation

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Jeff-YANGONtv/Goal24MM.git
cd Goal24MM
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_SITE_NAME=Goal24MM
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_RSS_FEED_URL=https://your-wordpress-site.com/feed/
NEXT_PUBLIC_AD_BANNER_URL=https://your-ad-provider.com/banner.jpg
NEXT_REVALIDATE=3600
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Add environment variables
   - Click "Deploy"

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📖 Usage

### Adding New Articles

Articles are automatically fetched from your WordPress RSS feed. To add new articles:

1. Create a new post in WordPress
2. Publish the post
3. Goal24MM will automatically fetch it within 1 hour

### Customizing Content

#### Homepage
Edit `app/page.jsx` to customize sections.

#### Search
Search is fully implemented with real-time results.

#### Categories
Categories are automatically generated from WordPress.

### Customizing Styling

Edit `styles/globals.css` and `tailwind.config.js`.

## 🔍 SEO

Goal24MM includes comprehensive SEO features:

- **Dynamic Metadata**: Per-page titles and descriptions
- **Open Graph Tags**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific sharing
- **JSON-LD Schemas**: NewsArticle, Article, Organization, WebSite
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Duplicate content prevention
- **Breadcrumbs**: Navigation structure markup

## ⚡ Performance

Goal24MM is optimized for performance:

- **Lighthouse Score**: 90+
- **Core Web Vitals**: Optimized
- **Image Optimization**: Automatic AVIF/WebP conversion
- **Code Splitting**: Automatic per-page bundles
- **Caching**: Intelligent cache strategy
- **ISR**: Incremental Static Regeneration

## 🔐 Security

Security features implemented:

- **Security Headers**: CSP, X-Frame-Options, X-Content-Type-Options
- **HTTPS**: Automatic SSL/TLS
- **HSTS**: Strict Transport Security
- **Environment Variables**: Secure configuration
- **Input Validation**: Form validation and sanitization

## 📱 PWA Features

Goal24MM is a Progressive Web App:

- **Installable**: Add to home screen
- **Offline Support**: Works offline with cached content
- **Fast Loading**: Service worker caching
- **App-like Experience**: Full-screen mode

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📊 Analytics & Monitoring

Recommended tools:

- **Google Analytics**: User behavior tracking
- **Vercel Analytics**: Performance monitoring
- **Google Search Console**: SEO monitoring
- **Sentry**: Error tracking (optional)
- **UptimeRobot**: Uptime monitoring (optional)

## 🐛 Troubleshooting

### Common Issues

**Q: No content appears on homepage**
A: Check that `NEXT_PUBLIC_RSS_FEED_URL` is correct and the WordPress RSS feed is accessible.

**Q: Search not working**
A: Verify the `/api/search` endpoint is working and RSS feed is being fetched.

**Q: Images not loading**
A: Check that image domains are added to `next.config.js` remotePatterns.

**Q: Slow performance**
A: Check Vercel Analytics for bottlenecks, verify RSS feed fetch time.

For more troubleshooting, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting).

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Goal24MM Team** - Initial work and maintenance

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- WordPress for the content management system
- Vercel for hosting and deployment

## 📞 Support

For support, issues, or questions:

- Open an issue on [GitHub](https://github.com/Jeff-YANGONtv/Goal24MM/issues)
- Email: contact@goal24mm.com
- Twitter: [@Goal24MM](https://twitter.com/Goal24MM)

## 🔗 Links

- [Live Site](https://goal24mm.vercel.app)
- [GitHub Repository](https://github.com/Jeff-YANGONtv/Goal24MM)
- [WordPress Site](https://goal24mm.wordpress.com)

---

**Last Updated**: June 2026
**Status**: Production Ready ✅
