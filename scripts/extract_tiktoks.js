// Browser console script to extract TikTok video URLs
// 
// HOW TO USE:
// 1. Open https://www.tiktok.com/@wilhelser in your browser
// 2. Scroll down to load all the videos you want
// 3. Open the browser console (F12 or Cmd+Option+I)
// 4. Paste this entire script and press Enter
// 5. Copy the output and paste it into _data/tiktoks.yml

(function() {
  console.log('🔍 Extracting TikTok videos...\n');
  
  // Find all video containers
  const videoItems = document.querySelectorAll('[data-e2e="user-post-item"]');
  
  console.log(`Found ${videoItems.length} videos\n`);
  
  if (videoItems.length === 0) {
    console.log('❌ No videos found. Make sure:');
    console.log('   1. You are on a TikTok profile page');
    console.log('   2. The page has finished loading');
    console.log('   3. You have scrolled down to load videos');
    return;
  }
  
  const videos = [];
  
  videoItems.forEach((item, index) => {
    // Get the first link inside the container
    const link = item.querySelector('a');
    
    if (link && link.href) {
      videos.push({
        url: link.href,
        title: `Video ${index + 1}`,
        description: ''
      });
    }
  });
  
  console.log('📋 Copy the YAML below and paste it into _data/tiktoks.yml:\n');
  console.log('─'.repeat(60));
  
  // Generate YAML output
  const yaml = `# TikTok videos for @wilhelser
# Generated on ${new Date().toISOString().split('T')[0]}
# 
# To update: 
# 1. Visit https://www.tiktok.com/@wilhelser
# 2. Run the extract_tiktoks.js script in the browser console
# 3. Copy the output and paste it here

${videos.map(v => `- url: "${v.url}"
  title: "${v.title}"
  description: ""`).join('\n\n')}
`;
  
  console.log(yaml);
  console.log('─'.repeat(60));
  console.log(`\n✅ Found ${videos.length} videos`);
  console.log('\n💡 TIP: You can edit the titles and descriptions after pasting');
  
  // Also copy to clipboard if available
  if (navigator.clipboard) {
    navigator.clipboard.writeText(yaml).then(() => {
      console.log('\n📋 YAML has been copied to your clipboard!');
      console.log('   Just paste it into _data/tiktoks.yml');
    }).catch(() => {
      console.log('\n⚠️  Could not copy to clipboard automatically.');
      console.log('   Please copy the YAML above manually.');
    });
  }
  
})();

