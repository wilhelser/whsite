# Scripts

Helper scripts for managing your Jekyll site.

## TikTok Video Extraction

### `extract_tiktoks.js` - Browser Console Script

**This is the recommended method for extracting TikTok video URLs.**

#### How to use:

1. Open https://www.tiktok.com/@wilhelser in your browser
2. Scroll down to load all the videos you want
3. Open the browser console (F12 or Cmd+Option+I)
4. Copy the entire contents of `extract_tiktoks.js`
5. Paste into the console and press Enter
6. The YAML will be automatically copied to your clipboard!
7. Paste it into `_data/tiktoks.yml`

#### What it does:

- Finds all video containers with `data-e2e="user-post-item"`
- Extracts the first link from each container
- Generates properly formatted YAML
- Copies the result to your clipboard

### `update_tiktoks.sh` - Helper Script

Displays instructions and the JavaScript code to use.

```bash
./scripts/update_tiktoks.sh
```

### `fetch_tiktoks.rb` - Ruby Script (Not Working)

This was an attempt to fetch TikTok videos programmatically, but TikTok loads videos with JavaScript, so it doesn't work. Use the browser console script instead.

## Why Browser Console?

TikTok loads videos dynamically with JavaScript, so:
- ❌ Simple HTTP requests don't work (page is empty)
- ❌ Ruby/Python scripts can't see the videos
- ✅ Browser console can access the fully loaded page
- ✅ Easy to copy/paste the results

## Future Improvements

Possible automation options:
- Puppeteer/Playwright script to run headless browser
- GitHub Actions workflow to update daily
- Chrome extension for one-click extraction

