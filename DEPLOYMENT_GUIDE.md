# Goal24MM Deployment Guide

Complete guide for deploying Goal24MM to Vercel and other platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Vercel Deployment](#vercel-deployment)
4. [Post-Deployment Checklist](#post-deployment-checklist)
5. [Performance Optimization](#performance-optimization)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Git repository access
- Vercel account (for Vercel deployment)
- WordPress site with REST API enabled (for content)

## Environment Variables

### Required Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME=Goal24MM
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_RSS_FEED_URL=https://your-wordpress-site.com/feed/

# Optional: Advertisement
NEXT_PUBLIC_AD_BANNER_URL=https://your-ad-provider.com/banner.jpg

# Revalidation
NEXT_REVALIDATE=3600
```

### Environment Variable Descriptions

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_SITE_NAME` | Your site name | Goal24MM | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | https://goal24mm.vercel.app | Yes |
| `NEXT_PUBLIC_RSS_FEED_URL` | WordPress RSS feed URL | https://goal24mm.wordpress.com/feed/ | Yes |
| `NEXT_PUBLIC_AD_BANNER_URL` | Advertisement banner URL | (placeholder) | No |
| `NEXT_REVALIDATE` | ISR revalidation time (seconds) | 3600 | No |

## Vercel Deployment

### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `Goal24MM` project

### Step 2: Configure Environment Variables

1. In Vercel project settings, go to "Environment Variables"
2. Add all required environment variables from the table above
3. Make sure to add them for all environments (Production, Preview, Development)

### Step 3: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

### Step 4: Custom Domain (Optional)

1. Go to project settings → "Domains"
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Post-Deployment Checklist

### SEO & Indexing

- [ ] Verify `robots.txt` is accessible at `/robots.txt`
- [ ] Verify `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify JSON-LD structured data with [Schema.org validator](https://validator.schema.org/)
- [ ] Test Open Graph tags with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Performance

- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Target scores: Performance 90+, SEO 100
- [ ] Test Core Web Vitals with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Monitor performance in Vercel Analytics

### Security

- [ ] Verify security headers are present (use [Security Headers](https://securityheaders.com/))
- [ ] Test SSL certificate (should be automatic with Vercel)
- [ ] Enable HSTS preload (optional, advanced)
- [ ] Review CORS policies if needed

### Functionality

- [ ] Test homepage loads correctly
- [ ] Test article pages load with content
- [ ] Test search functionality
- [ ] Test category pages
- [ ] Test contact form submission
- [ ] Test mobile responsiveness
- [ ] Test offline functionality (PWA)

### Analytics & Monitoring

- [ ] Set up Google Analytics
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure Vercel Analytics
- [ ] Set up uptime monitoring

## Performance Optimization

### Image Optimization

- Images are automatically optimized by Next.js
- Supported formats: AVIF, WebP, JPEG, PNG
- Lazy loading is enabled by default
- Responsive images with `srcSet` are generated automatically

### Caching Strategy

- **Static assets**: 1 year cache (immutable)
- **Next.js bundles**: 1 year cache (immutable)
- **HTML pages**: No cache (revalidated on demand)
- **API responses**: 10 minutes cache

### Code Splitting

- Pages are automatically code-split
- Dynamic imports are used for heavy components
- CSS is automatically minified and optimized

### Database & API

- RSS feed is fetched and cached for 1 hour
- Search results are cached for 10 minutes
- Category data is cached for 1 hour

## Monitoring & Maintenance

### Regular Tasks

- **Daily**: Monitor error logs and user feedback
- **Weekly**: Check analytics and performance metrics
- **Monthly**: Review and update content, test all features
- **Quarterly**: Update dependencies and security patches

### Monitoring Tools

- **Vercel Analytics**: Built-in performance monitoring
- **Google Search Console**: SEO and indexing status
- **Google Analytics**: User behavior and traffic
- **Sentry** (optional): Error tracking
- **UptimeRobot** (optional): Uptime monitoring

### Updating Content

Content is automatically fetched from your WordPress RSS feed. To update:

1. Publish new articles in WordPress
2. Articles appear in Goal24MM within 1 hour (ISR revalidation)
3. For immediate updates, trigger manual revalidation in Vercel

## Troubleshooting

### Build Fails

**Error**: `NEXT_PUBLIC_RSS_FEED_URL is not defined`

**Solution**: Add `NEXT_PUBLIC_RSS_FEED_URL` to environment variables in Vercel

### No Content Appears

**Error**: Homepage shows "No news available"

**Solution**: 
1. Verify RSS feed URL is correct
2. Check that WordPress RSS feed is accessible
3. Check Vercel logs for fetch errors

### Search Not Working

**Error**: Search returns no results

**Solution**:
1. Verify RSS feed is being fetched correctly
2. Check browser console for API errors
3. Verify `/api/search` endpoint is working

### Images Not Loading

**Error**: Images show as broken

**Solution**:
1. Verify image URLs are accessible
2. Check that domains are added to `next.config.js` remotePatterns
3. Verify CORS headers if using external image service

### Slow Performance

**Error**: Page load is slow

**Solution**:
1. Check Vercel Analytics for bottlenecks
2. Verify RSS feed fetch time
3. Check for large images or unoptimized assets
4. Consider enabling caching for more resources

### PWA Not Installing

**Error**: "Install app" option not showing

**Solution**:
1. Verify `manifest.json` is accessible
2. Verify HTTPS is enabled
3. Check browser console for manifest errors
4. Ensure app meets PWA requirements

## Rollback

If you need to rollback to a previous version:

1. Go to Vercel project → Deployments
2. Find the previous deployment
3. Click the three dots → "Promote to Production"

## Support

For additional help:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Goal24MM GitHub Issues](https://github.com/Jeff-YANGONtv/Goal24MM/issues)

## Additional Resources

- [Web Vitals Guide](https://web.dev/vitals/)
- [SEO Best Practices](https://developers.google.com/search/docs)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [Next.js Performance](https://nextjs.org/learn/seo/introduction-to-seo)
