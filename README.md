# Goal24MM - Football News Website

A modern, production-ready football news website built with Next.js, featuring real-time RSS feed integration from WordPress, mobile-first responsive design, and SEO optimization.

## 🚀 Features

- **RSS Feed Integration**: Automatically fetches and displays latest football news from WordPress
- **Mobile-First Design**: Fully responsive layout optimized for all devices
- **Dynamic Article Pages**: Individual article pages with full content rendering
- **Related Articles**: Smart recommendation system showing related posts
- **Ad System**: Reusable ad banner components throughout the site
- **Bottom Navigation**: Mobile-friendly navigation bar
- **SEO Optimized**: Proper metadata, structured data, and clean URLs
- **Performance**: Optimized images, caching, and fast loading times
- **Dark Modern UI**: Professional dark theme with red accent colors

## 📁 Project Structure

```
goal24mm/
├── app/
│   ├── page.jsx                 # Home page with RSS news feed
│   ├── news/
│   │   └── [slug]/page.jsx      # Dynamic article detail page
│   ├── contact/page.jsx         # Contact form page
│   ├── live-score/page.jsx      # Live scores page (static)
│   ├── odds/page.jsx            # Betting odds page (static)
│   ├── layout.jsx               # Root layout with navigation
│   └── globals.css              # Global styles
├── components/
│   ├── BottomNav.jsx            # Mobile bottom navigation
│   ├── NewsCard.jsx             # Individual news card component
│   ├── AdBanner.jsx             # Reusable ad banner component
│   └── PostList.jsx             # Grid layout for multiple posts
├── lib/
│   └── rss.js                   # RSS feed parsing and fetching logic
├── public/
│   └── favicon.ico              # Site favicon
├── package.json                 # Dependencies and scripts
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS
- **RSS Parsing**: xml2js
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jeff-YANGONtv/Goal24MM.git
   cd goal24mm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### RSS Feed URL
The RSS feed URL is configured in `lib/rss.js`:
```javascript
const RSS_FEED_URL = 'https://goal24mm.wordpress.com/feed/';
```

To change the feed source, update this URL in the file.

### Tailwind Colors
Customize colors in `tailwind.config.js`:
```javascript
colors: {
  primary: '#1F2937',      // Dark gray
  secondary: '#111827',    // Darker gray
  accent: '#EF4444',       // Red
}
```

## 📱 Pages

### Home Page (`/`)
- Displays featured article at the top
- Shows grid of latest news articles
- Includes ad banners between sections
- Responsive card layout

### Article Page (`/news/[slug]`)
- Full article content from RSS feed
- Featured image (if available)
- Publication date and time
- Related articles section
- Ad banner

### Contact Page (`/contact`)
- Contact form with validation
- Social media links section
- Professional form styling

### Live Score Page (`/live-score`)
- Mock live score data
- Match status indicators
- Ready for API integration

### Odds Page (`/odds`)
- Betting odds display
- Responsible gambling disclaimer
- Ready for odds API integration

## 🎨 Components

### NewsCard
Displays individual news articles in a card format with image, title, excerpt, and date.

```jsx
<NewsCard article={article} />
```

### AdBanner
Reusable ad banner component with different positioning options.

```jsx
<AdBanner position="top" />
```

### BottomNav
Mobile-first bottom navigation with active state indicators.

### PostList
Grid layout component for displaying multiple articles.

```jsx
<PostList articles={articles} title="Latest News" />
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Environment Variables** (if needed):
   - No additional environment variables required for basic setup

### Build for Production

```bash
npm run build
npm start
```

## 📊 Performance Optimization

- **Image Optimization**: Uses Next.js Image component with lazy loading
- **RSS Caching**: 1-hour cache revalidation for RSS feed
- **Static Generation**: Articles pre-rendered at build time
- **Code Splitting**: Automatic code splitting by Next.js
- **CSS Optimization**: Tailwind CSS purging unused styles

## 🔍 SEO Features

- **Meta Tags**: Proper title, description, and OG tags on all pages
- **Structured Data**: Article schema for search engines
- **Clean URLs**: Semantic URL structure
- **Sitemap**: Automatically generated by Next.js
- **Mobile Friendly**: Mobile-first responsive design

## 🐛 Troubleshooting

### RSS Feed Not Loading
- Check internet connection
- Verify RSS feed URL is correct
- Check browser console for errors
- Ensure WordPress site is accessible

### Images Not Displaying
- Verify image URLs are accessible
- Check browser console for CORS errors
- Images from external sources may require configuration

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind CSS configuration

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please contact: contact@goal24mm.com

## 🔗 Links

- **Live Site**: (Add your deployment URL)
- **WordPress Source**: https://goal24mm.wordpress.com/
- **GitHub Repository**: https://github.com/Jeff-YANGONtv/Goal24MM

---

Built with ❤️ for football fans worldwide
