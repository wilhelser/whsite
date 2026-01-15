# Personal Website - Jekyll

A modern, single-page personal website built with Jekyll, inspired by medusa0xf.com design.

## Features

- 🎨 Modern, dark-themed design
- 📱 Fully responsive
- 🎥 YouTube latest video integration
- 📹 TikTok videos showcase
- ⚡ Fast and lightweight
- 🔗 Smooth scrolling navigation

## Setup

### Prerequisites

- Ruby (2.7 or higher)
- Bundler

### Installation

1. Install dependencies:
```bash
bundle install
```

2. Configure your site in `_config.yml`:
   - Update `title` with your name
   - Update `description` with your tagline
   - Add your YouTube channel ID
   - Add your YouTube API key (optional, for automatic latest video)
   - Add your TikTok username

3. Add your TikTok videos in `_data/tiktoks.yml`:
   - Add the full URL of each TikTok video
   - Add optional title and description

### Running Locally

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` in your browser.

## Configuration

### YouTube Integration

To automatically display your latest YouTube video:

1. Get a YouTube Data API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add your channel ID and API key to `_config.yml`
3. The latest video will automatically load on the page

Alternatively, you can manually set a video ID in `assets/js/main.js`.

### TikTok Integration

TikTok videos are managed through the `_data/tiktoks.yml` file:

```yaml
- url: "https://www.tiktok.com/@username/video/1234567890"
  title: "Video Title"
  description: "Video description"
```

The site uses TikTok's official embed script to display videos.

## Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-bg: #0a0a0a;
    --accent-color: #3b82f6;
    /* ... more variables */
}
```

### Navigation

Edit the navigation links in `_includes/header.html` to match your page sections.

### Content Sections

The main page (`index.html`) has three sections:
- **Hero**: Your name and tagline
- **Video**: Latest YouTube video
- **Recent**: TikTok videos grid

Add or modify sections as needed.

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Select the main branch as source

### Netlify

1. Connect your repository to Netlify
2. Build command: `jekyll build`
3. Publish directory: `_site`

### Custom Server

Build the site and upload the `_site` folder:

```bash
bundle exec jekyll build
```

## License

Feel free to use this template for your personal website!

