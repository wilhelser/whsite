#!/bin/bash
# TikTok Video URL Updater
# This script helps you quickly add TikTok video URLs to _data/tiktoks.yml

echo "🎵 TikTok Video URL Updater"
echo "=========================="
echo ""
echo "Please paste your TikTok video URLs (one per line)."
echo "Press Ctrl+D when done."
echo ""

# Create _data directory if it doesn't exist
mkdir -p _data

# Start the YAML file
cat > _data/tiktoks.yml << 'EOF'
# TikTok Videos
# Add your latest TikTok video URLs here
# The site will display up to 6 videos

EOF

# Read URLs from user
counter=1
while IFS= read -r url; do
    if [[ $url =~ ^https://.*tiktok\.com.* ]]; then
        # Extract video ID from URL
        video_id=$(echo "$url" | grep -oE '[0-9]{19}' | head -1)
        
        cat >> _data/tiktoks.yml << EOF
- url: "$url"
  title: "TikTok Video $counter"
  description: "Video from @wilhelserTV"

EOF
        echo "✅ Added video $counter"
        ((counter++))
    fi
done

echo ""
echo "✅ Updated _data/tiktoks.yml with $((counter-1)) videos"
echo ""
echo "To manually edit, open: _data/tiktoks.yml"

