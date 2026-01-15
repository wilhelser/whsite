# 🔗 Linktree-Style Links Section

## Overview

Your site now has a beautiful Linktree-style links section that automatically fetches thumbnail images from the websites you link to!

## Features

✅ **Automatic Thumbnails** - Fetches Open Graph images from linked websites  
✅ **Fallback to Favicon** - Uses site favicon if no OG image is found  
✅ **Responsive Design** - Looks great on all devices  
✅ **Hover Effects** - Smooth animations and visual feedback  
✅ **Easy to Update** - Just edit a YAML file  

## How to Add Links

Edit `_data/links.yml` and add your links:

```yaml
- url: "https://example.com"
  title: "Link Title"
  description: "Short description of the link"

- url: "https://another-site.com"
  title: "Another Link"
  description: "Another description"
  image: "https://another-site.com/custom-image.jpg"  # Optional: custom image
```

**Note:** You can optionally specify a custom `image` URL if the site doesn't have Open Graph tags or you want to use a specific image.

### Example:

```yaml
- url: "https://www.youtube.com/@wilhelserTV"
  title: "YouTube Channel"
  description: "Watch my latest videos"

- url: "https://www.tiktok.com/@wilhelser"
  title: "TikTok"
  description: "Follow me on TikTok"

- url: "https://twitter.com/yourhandle"
  title: "Twitter"
  description: "Follow me on Twitter"

- url: "https://wilhelser.com"
  title: "My Website"
  description: "Visit my main site"
```

## How It Works

### 1. Thumbnail Fetching

The JavaScript automatically:
1. Fetches the webpage using a CORS proxy (allorigins.win)
2. Parses the HTML to find Open Graph meta tags
3. Extracts the `og:image` or `twitter:image` URL
4. Displays the image as a thumbnail
5. Falls back to favicon if no OG image is found

### 2. Supported Meta Tags

The script looks for these meta tags in order:
- `<meta property="og:image" content="...">`
- `<meta name="twitter:image" content="...">`
- `<meta name="twitter:image:src" content="...">`
- Favicon as fallback

### 3. CORS Proxy

Since browsers block cross-origin requests, we use a free CORS proxy:
- **Service**: allorigins.win
- **Free**: Yes
- **Rate Limits**: Reasonable for personal sites
- **Alternative**: You can use your own proxy if needed

## Customization

### Change Colors

Edit `assets/css/style.css`:

```css
.link-card:hover {
    border-color: var(--accent-color); /* Change hover color */
}
```

### Change Thumbnail Size

```css
.link-thumbnail {
    width: 80px;  /* Change width */
    height: 80px; /* Change height */
}
```

### Change Layout

The links are in a vertical list by default. To make them a grid:

```css
.links-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
```

## Troubleshooting

### Thumbnails Not Loading

**Problem**: Some sites block CORS proxies or don't have OG images.

**Solution**: The script automatically falls back to favicons. If that fails too, you'll see a link icon placeholder.

### Slow Loading

**Problem**: Fetching thumbnails can be slow for many links.

**Solution**: The images use lazy loading and load asynchronously, so they won't block the page.

### CORS Proxy Issues

**Problem**: The free CORS proxy might have rate limits.

**Solutions**:
1. Use a different proxy (update the `proxyUrl` in `main.js`)
2. Set up your own CORS proxy
3. Use a serverless function (Netlify/Vercel)

## Advanced: Custom Thumbnails

If you want to specify custom thumbnails instead of auto-fetching:

1. Add an `image` field to your link:

```yaml
- url: "https://example.com"
  title: "My Link"
  description: "Description"
  image: "https://example.com/custom-image.jpg"
```

2. Update the HTML in `index.html` to use the custom image:

```html
<img src="{{ link.image | default: '' }}" alt="{{ link.title }}" class="link-image" loading="lazy">
```

3. Update the JavaScript to skip fetching if image is provided.

## Styling Details

### Card Structure

```
┌─────────────────────────────────────┐
│ [Thumbnail] Title              [→]  │
│             Description              │
│             example.com              │
└─────────────────────────────────────┘
```

### Hover Effects

- Card lifts up slightly
- Blue accent border appears
- Arrow moves to the right
- Blue glow shadow

### Mobile Responsive

- Smaller thumbnails (60px vs 80px)
- Adjusted padding
- Smaller fonts
- Full width cards

## Examples of Good Links

- Social media profiles (Twitter, Instagram, LinkedIn)
- YouTube channel
- TikTok profile
- Personal website
- Blog
- Portfolio
- GitHub profile
- Patreon/Ko-fi
- Newsletter signup
- Contact form
- Store/shop

## Performance

- **Lazy Loading**: Images only load when visible
- **Async Fetching**: Doesn't block page load
- **Caching**: Browser caches fetched images
- **Fallbacks**: Quick favicon fallback if OG image fails

---

**Your Linktree-style section is ready!** 🎉

Just add your links to `_data/links.yml` and they'll appear with automatic thumbnails.

