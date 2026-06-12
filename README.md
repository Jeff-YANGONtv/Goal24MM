# Goal24MM - Headless Football News Platform

A professional, mobile-first football news website for Myanmar fans.

## Tech Stack
- **Frontend**: Next.js (App Router)
- **CMS**: WordPress (Headless via REST API)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Project Structure
- `app/`: Next.js pages and layouts.
- `components/`: Reusable UI components (Header, Ads, Cards).
- `lib/`: WordPress API integration logic.
- `public/`: Static assets (Logo, Ad placeholders).
- `styles/`: Global CSS.

## Setup Instructions
1. **WordPress Backend**:
   - Set up a WordPress site.
   - Create categories: News, Articles, Live Score, Odds.
   - Ensure REST API is enabled (default in modern WP).

2. **Frontend Configuration**:
   - Clone this repository.
   - Copy `.env.local` and set `NEXT_PUBLIC_WORDPRESS_URL` to your WordPress URL.
   - Run `npm install` and `npm run dev`.

3. **Deployment**:
   - Push to GitHub.
   - Connect your GitHub repo to Vercel.
   - Add environment variables in Vercel dashboard.
