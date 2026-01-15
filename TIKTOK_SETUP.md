# TikTok Integration Guide

## Overview

Unlike YouTube, TikTok doesn't provide a public API for fetching user videos. This guide explains your options for displaying TikTok videos on your Jekyll site.

## 🚀 Option 1: Browser Console Script (Easiest!)

The fastest way to extract all your TikTok video URLs at once using a browser console script.

### Quick Method:

1. **Run the helper script:**
   ```bash
   ./scripts/update_tiktoks.sh
   ```
   This will display the instructions and the script to copy.

2. **Or follow these steps:**
   - Open https://www.tiktok.com/@wilhelser in your browser
   - Scroll down to load all the videos you want to include
   - Open the browser console:
     - **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows)
     - **Firefox**: Press `F12` or `Cmd+Option+K` (Mac) or `Ctrl+Shift+K` (Windows)
     - **Safari**: Enable Developer menu first, then `Cmd+Option+C`
   - Copy the entire contents of `scripts/extract_tiktoks.js`
   - Paste it into the console and press Enter
   - The script will automatically copy the YAML to your clipboard!

3. **Paste into your site:**
   - Open `_data/tiktoks.yml`
   - Paste the generated YAML (Cmd+V or Ctrl+V)
   - Save the file
   - Your site will automatically reload with your videos!

### How it works:

The script finds all elements with `data-e2e="user-post-item"` (TikTok's video containers), extracts the first link from each, and generates properly formatted YAML.

## Option 2: Manual Updates

If you prefer to add videos one by one:

### Steps:

1. Go to your TikTok profile: https://www.tiktok.com/@wilhelser
2. Copy the URLs of your latest 6 videos (plus any pinned videos)
3. Edit `_data/tiktoks.yml` and add them:

```yaml
- url: "https://www.tiktok.com/@wilhelser/video/1234567890"
  title: "Your Video Title"
  description: "Brief description"

- url: "https://www.tiktok.com/@wilhelser/video/0987654321"
  title: "Another Video"
  description: "Another description"
```

4. The site will automatically embed these videos using TikTok's official embed script

## Option 3: Third-Party API Services

For automatic fetching, you can use third-party services:

### RapidAPI TikTok Scraper

1. Sign up at https://rapidapi.com/
2. Subscribe to a TikTok scraper API
3. Add your API key to `_config.yml`:
   ```yaml
   rapidapi_key: YOUR_RAPIDAPI_KEY
   ```
4. Uncomment the API fetching code in `assets/js/main.js`

### Other Services:

- **TikTok Unofficial API**: Various npm packages available
- **Apify TikTok Scraper**: Web scraping service
- **Custom scraper**: Use Playwright/Selenium

## Option 4: GitHub Actions (Automated)

Set up a GitHub Action to automatically fetch and update your TikTok videos daily:

1. Create `.github/workflows/update-tiktoks.yml`
2. Use a TikTok scraper action
3. Commit changes back to the repository

Example workflow coming soon!

## Option 5: RSS Feed (If Available)

Some TikTok profiles have RSS feeds. Check if yours does:

```
https://www.tiktok.com/@wilhelserTV/rss
```

If available, you can parse this feed to get video URLs.

## Current Implementation

The site currently uses **Option 1** (manual updates) because:
- ✅ Most reliable
- ✅ No API costs
- ✅ Full control over which videos to display
- ✅ Works with TikTok's official embed script

The videos will auto-embed and display beautifully on your site!

## Updating Videos

Whenever you want to update the displayed videos:

1. Edit `_data/tiktoks.yml`
2. Add/remove video URLs
3. Commit and push (or just save locally)
4. Jekyll will rebuild automatically (with --livereload)

## Tips

- **Pinned videos**: Add them first in the YAML file
- **Limit**: The site displays up to 6 videos
- **Titles**: Use descriptive titles for better SEO
- **Descriptions**: Optional but recommended

## Need Help?

If you want to implement automatic fetching, let me know which option you prefer and I can help set it up!

