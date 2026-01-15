# 🎬 How to Update Your TikTok Videos

## Quick Guide (2 minutes)

### Step 1: Open Your TikTok Profile

Open this URL in your browser:
```
https://www.tiktok.com/@wilhelser
```

Scroll down to make sure all your videos are loaded.

### Step 2: Open Browser Console

**Mac:**
- Chrome/Edge: Press `Cmd + Option + I`
- Firefox: Press `Cmd + Option + K`
- Safari: Press `Cmd + Option + C` (enable Developer menu first)

**Windows:**
- Chrome/Edge/Firefox: Press `F12` or `Ctrl + Shift + I`

### Step 3: Run the Extraction Script

1. Open the file `scripts/extract_tiktoks.js` in a text editor
2. Copy the entire contents (Cmd+A, Cmd+C)
3. Paste into the browser console
4. Press Enter

### Step 4: The Script Will:

✅ Find all your TikTok videos  
✅ Extract the URLs  
✅ Generate YAML format  
✅ **Copy it to your clipboard automatically!**

### Step 5: Update Your Site

1. Open `_data/tiktoks.yml` in your text editor
2. Paste the YAML (Cmd+V or Ctrl+V)
3. Save the file
4. Your Jekyll site will automatically reload with the new videos!

## Example Output

The script generates YAML like this:

```yaml
# TikTok videos for @wilhelser
# Generated on 2026-01-15

- url: "https://www.tiktok.com/@wilhelser/video/7123456789012345678"
  title: "Video 1"
  description: ""

- url: "https://www.tiktok.com/@wilhelser/video/7234567890123456789"
  title: "Video 2"
  description: ""
```

## Customizing Titles & Descriptions

After pasting, you can edit the titles and descriptions:

```yaml
- url: "https://www.tiktok.com/@wilhelser/video/7123456789012345678"
  title: "My Latest Political Commentary"
  description: "Discussing current events and policy"

- url: "https://www.tiktok.com/@wilhelser/video/7234567890123456789"
  title: "Breaking News Analysis"
  description: "Quick take on today's headlines"
```

## Tips

💡 **How many videos?** The script extracts all visible videos. Scroll down before running it to load more.

💡 **Pinned videos?** They'll appear first in the list. You can reorder them in the YAML file.

💡 **Update frequency?** Run this whenever you want to update which videos are shown on your site.

💡 **Limit display?** Your site currently shows up to 6 videos. Edit `index.html` to change this.

## Alternative: Manual Method

If you prefer to add videos one by one:

1. Go to https://www.tiktok.com/@wilhelser
2. Click on a video
3. Copy the URL from the address bar
4. Add it to `_data/tiktoks.yml`:

```yaml
- url: "PASTE_URL_HERE"
  title: "Your Title"
  description: "Your description"
```

## Troubleshooting

**Q: The console shows "Found 0 videos"**  
A: Make sure you're on your TikTok profile page and the videos have loaded. Try scrolling down first.

**Q: The YAML wasn't copied to clipboard**  
A: Some browsers block clipboard access. Just copy the YAML manually from the console output.

**Q: Videos aren't showing on my site**  
A: Check that:
- The YAML syntax is correct (proper indentation)
- The URLs are complete and valid
- Your Jekyll server is running
- You saved the `_data/tiktoks.yml` file

## Need Help?

Run the helper script for instructions:
```bash
./scripts/update_tiktoks.sh
```

Or check the full guide:
```
TIKTOK_SETUP.md
```

