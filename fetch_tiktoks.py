#!/usr/bin/env python3
"""
TikTok Video Fetcher
This script fetches your latest TikTok videos and updates _data/tiktoks.yml

Usage:
    python3 fetch_tiktoks.py

Requirements:
    pip install requests pyyaml

Note: This uses TikTok's unofficial API. For production use, consider:
- RapidAPI TikTok scraper
- Manual updates to _data/tiktoks.yml
"""

import requests
import yaml
import sys
from pathlib import Path

def fetch_tiktok_videos(username, count=6):
    """
    Fetch latest TikTok videos for a user.
    
    Note: This is a placeholder implementation. TikTok doesn't have a public API.
    You'll need to either:
    1. Use a third-party service like RapidAPI
    2. Manually add video URLs to _data/tiktoks.yml
    3. Use TikTok's RSS feed (if available)
    """
    
    print(f"Fetching TikTok videos for @{username}...")
    print("\n⚠️  TikTok doesn't have a public API.")
    print("\nOptions to get your videos:")
    print("1. Manually copy video URLs from https://www.tiktok.com/@" + username)
    print("2. Use a third-party service (RapidAPI, etc.)")
    print("3. Use browser automation (Selenium/Playwright)")
    print("\nFor now, please manually add your video URLs to _data/tiktoks.yml")
    print("\nExample format:")
    print("""
- url: "https://www.tiktok.com/@wilhelserTV/video/1234567890"
  title: "Your Video Title"
  description: "Video description"
""")
    
    return []

def update_tiktoks_yml(videos):
    """Update the _data/tiktoks.yml file with fetched videos."""
    data_dir = Path('_data')
    data_dir.mkdir(exist_ok=True)
    
    yml_file = data_dir / 'tiktoks.yml'
    
    with open(yml_file, 'w') as f:
        f.write("# TikTok Videos\n")
        f.write("# Auto-generated - do not edit manually\n\n")
        yaml.dump(videos, f, default_flow_style=False, allow_unicode=True)
    
    print(f"\n✅ Updated {yml_file}")

def main():
    # Read config
    try:
        with open('_config.yml', 'r') as f:
            config = yaml.safe_load(f)
            username = config.get('tiktok_username', 'wilhelserTV')
    except FileNotFoundError:
        username = 'wilhelserTV'
        print("⚠️  _config.yml not found, using default username")
    
    videos = fetch_tiktok_videos(username)
    
    if videos:
        update_tiktoks_yml(videos)
    else:
        print("\n💡 Tip: You can manually create _data/tiktoks.yml with your video URLs")

if __name__ == '__main__':
    main()

