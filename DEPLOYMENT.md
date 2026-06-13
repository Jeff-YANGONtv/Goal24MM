# Goal24MM Deployment Guide

This guide provides step-by-step instructions for deploying Goal24MM to Vercel and ensuring production readiness.

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] Build succeeds locally: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No linting errors: `npm run lint`
- [ ] Environment variables configured
- [ ] RSS feed URL is accessible
- [ ] Ad banner URL is configured
- [ ] All pages render correctly locally

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Ensure all changes are committed**:
   ```bash
   git status
   git add .
   git commit -m "Prepare for deployment"
   ```

2. **Push to GitHub**:
   ```bash
   git push origin main
   ```

### Step 2: Connect to Vercel

1. **Visit Vercel Dashboard**:
   - Go to https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository (Jeff-YANGONtv/Goal24MM)
   - Click "Import"

3. **Configure Project Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: .next (default)
   - **Install Command**: `npm install` (default)

### Step 3: Set Environment Variables

In the Vercel dashboard, add the following environment variables:

| Key | Value | Example |
|-----|-------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Your site name | `Goal24MM` |
| `NEXT_PUBLIC_SITE_URL` | Your production domain | `https://goal24mm.com` |
| `NEXT_PUBLIC_RSS_FEED_URL` | WordPress RSS feed URL | `https://goal24mm.wordpress.com/feed/` |
| `NEXT_PUBLIC_AD_BANNER_URL` | Ad banner image URL | `https://ads.example.com/banner.jpg` |
| `NEXT_REVALIDATE` | ISR revalidation time | `3600` |

**Steps**:
1. Click "Environment Variables"
2. Add each variable with its value
3. Select which environments (Production, Preview, Development)
4. Click "Save"

### Step 4: Deploy

1. **Trigger Deployment**:
   - Click "Deploy" button
   - Vercel will automatically build and deploy your site

2. **Monitor Build**:
   - Watch the build logs in real-time
   - Wait for "✓ Ready" message

3. **Access Your Site**:
   - Your site will be available at: `https://goal24mm.vercel.app`
   - Or your custom domain if configured

### Step 5: Configure Custom Domain

1. **Add Domain**:
   - Go to "Settings" → "Domains"
   - Click "Add"
   - Enter your domain: `goal24mm.com`

2. **Update DNS Records**:
   - Follow Vercel's DNS configuration instructions
   - Update your domain registrar with Vercel's nameservers or DNS records

3. **Verify Domain**:
   - Wait for DNS propagation (up to 48 hours)
   - Vercel will automatically generate SSL certificate

## 🔄 Continuous Deployment

Once connected, Vercel automatically deploys on:
- **Push to main branch**: Production deployment
- **Push to other branches**: Preview deployment
- **Pull requests**: Preview deployment

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**:
   - Go to "Settings" → "Analytics"
   - Enable "Web Analytics"

2. **Monitor Performance**:
   - Track Core Web Vitals
   - Monitor build times
   - Check deployment status

### Logs

1. **View Deployment Logs**:
   - Click on a deployment
   - View build and runtime logs

2. **Check Function Logs**:
   - Go to "Functions" tab
   - Monitor serverless function execution

## 🔧 Configuration for Production

### Image Optimization

The `next.config.js` is configured to:
- Cache images for 1 hour on CDN
- Support WebP and AVIF formats
- Automatically generate responsive sizes

### Caching Strategy

- **ISR Revalidation**: 3600 seconds (1 hour)
- **HTTP Cache**: 3600 seconds (1 hour)
- **Stale-while-revalidate**: 86400 seconds (24 hours)

To adjust caching:
1. Update `NEXT_REVALIDATE` in environment variables
2. Modify cache headers in `next.config.js`
3. Redeploy

### Performance Optimization

- **Static Generation**: Articles pre-rendered at build time
- **Incremental Static Regeneration**: New posts appear within 1 hour
- **Image Optimization**: Automatic format conversion and resizing
- **Code Splitting**: Automatic by Next.js

## 🔐 Security

### Environment Variables

- All `NEXT_PUBLIC_*` variables are visible in browser (use for public data only)
- Never commit `.env.local` to repository
- Use `.env.local.example` as template

### CORS & Headers

- Configured in `next.config.js`
- Remote image domains whitelisted
- Security headers can be added in `next.config.js`

## 🐛 Troubleshooting

### Build Fails

**Error**: "Cannot find module 'rss-parser'"
- **Solution**: Ensure `rss-parser` is in `package.json` dependencies
- Run: `npm install rss-parser`

**Error**: "Image optimization failed"
- **Solution**: Check image URLs are accessible
- Verify domains are in `next.config.js` remotePatterns

### Slow Performance

**Issue**: Pages load slowly
- **Solution**: 
  - Check RSS feed response time
  - Increase `NEXT_REVALIDATE` to reduce rebuild frequency
  - Verify image optimization is working

**Issue**: High build time
- **Solution**:
  - Check RSS feed has many posts
  - Limit posts in `fetchRssPosts()` if needed
  - Use `generateStaticParams()` for dynamic routes

### RSS Feed Issues

**Error**: "Failed to fetch RSS feed"
- **Solution**:
  - Verify RSS URL is correct
  - Check if WordPress site is accessible
  - Ensure RSS feed is enabled on WordPress

**Error**: "Images not loading from WordPress"
- **Solution**:
  - Add WordPress domain to `next.config.js` remotePatterns
  - Check image URLs in RSS feed
  - Verify WordPress allows external image access

## 📈 Scaling & Optimization

### For High Traffic

1. **Enable Vercel Pro**:
   - Unlimited bandwidth
   - Priority support
   - Advanced analytics

2. **Optimize Images**:
   - Use WebP format
   - Implement lazy loading
   - Compress images before upload

3. **Increase Cache TTL**:
   - Adjust `NEXT_REVALIDATE` to 86400 (24 hours)
   - Reduce RSS feed check frequency

### For Multiple Regions

1. **Enable Edge Caching**:
   - Vercel automatically caches in multiple regions
   - No additional configuration needed

2. **Monitor Regional Performance**:
   - Use Vercel Analytics
   - Check latency by region

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **RSS Parser Docs**: https://www.npmjs.com/package/rss-parser
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🔄 Rollback

If deployment has issues:

1. **Revert to Previous Deployment**:
   - Go to "Deployments"
   - Click on previous successful deployment
   - Click "Promote to Production"

2. **Revert Code Changes**:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

## ✅ Post-Deployment Verification

1. **Check Site Accessibility**:
   - Visit https://goal24mm.com
   - Verify homepage loads

2. **Test All Pages**:
   - [ ] Homepage
   - [ ] Articles listing
   - [ ] Single article
   - [ ] Contact page
   - [ ] Live scores (placeholder)
   - [ ] Odds (placeholder)

3. **Verify SEO**:
   - [ ] Sitemap accessible: `/sitemap.xml`
   - [ ] Robots.txt accessible: `/robots.txt`
   - [ ] Meta tags present
   - [ ] Open Graph tags present

4. **Check Performance**:
   - [ ] Images load quickly
   - [ ] Pages render within 3 seconds
   - [ ] No console errors
   - [ ] Mobile responsive

5. **Monitor Logs**:
   - Check Vercel deployment logs
   - Monitor function execution
   - Watch for errors

## 📝 Maintenance

### Regular Tasks

- **Weekly**: Monitor analytics and performance
- **Monthly**: Review and update dependencies
- **Quarterly**: Audit security and performance
- **As needed**: Update content via WordPress

### Update Dependencies

```bash
npm update
npm audit fix
npm run build
```

### Monitor RSS Feed

- Verify RSS feed is updating
- Check for broken images
- Monitor feed response time

---

**Last Updated**: June 2026
**Version**: 1.0.0
