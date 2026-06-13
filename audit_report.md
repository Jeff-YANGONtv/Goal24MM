# Goal24MM Repository Audit Report

## 1. Current Repository Structure

```
/home/ubuntu/Goal24MM
├── README.md
├── app
│   ├── articles
│   │   └── page.jsx
│   ├── contact
│   │   └── page.jsx
│   ├── layout.jsx
│   ├── live
│   │   └── page.jsx
│   ├── news
│   │   └── [slug]
│   │       └── page.jsx
│   ├── odds
│   │   └── page.jsx
│   └── page.jsx
├── components
│   ├── AdBanner.jsx
│   ├── BottomNav.jsx
│   ├── Header.jsx
│   ├── NewsCard.jsx
│   └── PostContent.jsx
├── lib
│   ├── fetchCategories.js
│   ├── fetchPosts.js
│   ├── fetchSinglePost.js
│   └── wordpress.js
├── package.json
└── styles
    └── globals.css
```

## 2. Files Dependent on WordPress REST API

The following files have been identified as depending on the WordPress REST API or related helper functions:

- `/home/ubuntu/Goal24MM/app/page.jsx`: Imports `fetchPosts`.
- `/home/ubuntu/Goal24MM/lib/fetchPosts.js`: Likely contains logic to fetch posts using the WordPress REST API.
- `/home/ubuntu/Goal24MM/lib/fetchSinglePost.js`: Likely contains logic to fetch a single post using the WordPress REST API.
- `/home/ubuntu/Goal24MM/lib/wordpress.js`: Contains the base URL for the WordPress REST API (`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`).

These files will require significant refactoring to switch from the WordPress REST API to the RSS Feed architecture.
