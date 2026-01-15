#!/usr/bin/env ruby
# Script to fetch TikTok video URLs from a profile page

require 'yaml'
require 'nokogiri'

# Configuration
TIKTOK_USERNAME = 'wilhelser'
OUTPUT_FILE = '_data/tiktoks.yml'
MAX_VIDEOS = 6  # Number of latest videos to fetch

def fetch_tiktok_page(username)
  url = "https://www.tiktok.com/@#{username}"

  puts "Fetching TikTok profile: #{url}"

  # Use curl to fetch the page (avoids SSL issues)
  html = `curl -s -L "#{url}"`

  if $?.exitstatus != 0
    puts "Error: Failed to fetch page with curl"
    exit 1
  end

  html
end

def extract_video_urls(html)
  doc = Nokogiri::HTML(html)
  
  # Find all video containers with data-e2e="user-post-item"
  video_items = doc.css('[data-e2e="user-post-item"]')
  
  puts "Found #{video_items.length} videos"
  
  videos = []
  
  video_items.first(MAX_VIDEOS).each_with_index do |item, index|
    # Get the first link inside the container
    link = item.css('a').first
    
    if link && link['href']
      url = link['href']
      
      # Make sure it's a full URL
      url = "https://www.tiktok.com#{url}" unless url.start_with?('http')
      
      videos << {
        'url' => url,
        'title' => "Video #{index + 1}",
        'description' => ''
      }
      
      puts "  #{index + 1}. #{url}"
    end
  end
  
  videos
end

def save_to_yaml(videos)
  # Create the YAML content with comments
  yaml_content = <<~YAML
    # TikTok videos for @#{TIKTOK_USERNAME}
    # Auto-generated on #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}
    # 
    # To update: run `ruby scripts/fetch_tiktoks.rb`
    # To customize titles/descriptions, edit this file manually
    
  YAML
  
  yaml_content += videos.to_yaml.sub(/^---\n/, '')
  
  File.write(OUTPUT_FILE, yaml_content)
  puts "\nSaved #{videos.length} videos to #{OUTPUT_FILE}"
end

# Main execution
begin
  html = fetch_tiktok_page(TIKTOK_USERNAME)
  videos = extract_video_urls(html)
  
  if videos.empty?
    puts "\nWarning: No videos found. TikTok might be blocking automated requests."
    puts "You may need to manually add video URLs to #{OUTPUT_FILE}"
    exit 1
  end
  
  save_to_yaml(videos)
  
  puts "\n✅ Success! Your TikTok videos have been updated."
  puts "   Edit #{OUTPUT_FILE} to customize titles and descriptions."
  
rescue StandardError => e
  puts "\n❌ Error: #{e.message}"
  puts e.backtrace.first(5).join("\n")
  exit 1
end

