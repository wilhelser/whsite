// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Load YouTube latest video
    loadLatestYouTubeVideo();
    
    // Load TikTok videos
    loadTikTokVideos();

    // Scroll effects
    setupScrollEffects();

    // Load link thumbnails
    loadLinkThumbnails();
});

// YouTube API Integration
async function loadLatestYouTubeVideo() {
    const videoContainer = document.getElementById('youtube-video');

    // Get data from attributes
    const videoUrl = videoContainer.dataset.videoUrl;
    const channelId = videoContainer.dataset.channelId;
    const apiKey = videoContainer.dataset.apiKey;

    // First, check if there's a hardcoded video URL
    if (videoUrl && videoUrl !== 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID') {
        // Extract video ID from URL
        const videoId = extractYouTubeVideoId(videoUrl);
        if (videoId) {
            displayYouTubeVideo(videoId);
            return;
        }
    }

    // Fallback to API if no hardcoded URL
    if (apiKey && channelId && apiKey !== 'YOUR_YOUTUBE_API_KEY') {
        try {
            // Fetch more videos to filter out Shorts
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`
            );
            const data = await response.json();

            // Check for API errors
            if (data.error) {
                console.error('YouTube API Error:', data.error);
                showYouTubePlaceholder(`YouTube API Error: ${data.error.message || 'Unknown error'}`);
                return;
            }

            if (data.items && data.items.length > 0) {
                // Filter out Shorts (videos with #short or #shorts in title/description)
                const regularVideos = data.items.filter(item => {
                    const title = item.snippet.title.toLowerCase();
                    const description = item.snippet.description.toLowerCase();

                    // Check if it's NOT a Short
                    return !title.includes('#short') &&
                           !description.includes('#short') &&
                           !title.includes('#shorts') &&
                           !description.includes('#shorts');
                });

                if (regularVideos.length > 0) {
                    const videoId = regularVideos[0].id.videoId;
                    displayYouTubeVideo(videoId);
                } else {
                    showYouTubePlaceholder('No regular videos found (only Shorts available).');
                }
            } else {
                showYouTubePlaceholder('No videos found on this channel.');
            }
        } catch (error) {
            console.error('Error loading YouTube video:', error);
            showYouTubePlaceholder('Error loading video. Please check your API key.');
        }
    } else {
        showYouTubePlaceholder('Please configure your YouTube video URL in _config.yml');
    }
}

// Extract YouTube video ID from various URL formats
function extractYouTubeVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

function displayYouTubeVideo(videoId) {
    const videoContainer = document.getElementById('youtube-video');
    videoContainer.innerHTML = `
        <div class="video-wrapper">
            <iframe 
                src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `;
}

function showYouTubePlaceholder(message) {
    const videoContainer = document.getElementById('youtube-video');
    videoContainer.innerHTML = `
        <div class="video-placeholder">
            <p>${message || 'Unable to load video.'}</p>
            <p>Please check your YouTube API configuration in _config.yml</p>
        </div>
    `;
}

// TikTok Integration
async function loadTikTokVideos() {
    const tiktokGrid = document.getElementById('tiktok-grid');
    const username = tiktokGrid.dataset.username;

    if (!username || username === 'YOUR_TIKTOK_USERNAME') {
        showTikTokPlaceholder('Please configure your TikTok username in _config.yml');
        return;
    }

    try {
        // Option 1: Use TikTok RSS feed (if available)
        // Option 2: Use a third-party API service
        // Option 3: Manual configuration via _data/tiktoks.yml

        // For now, we'll use a manual approach with the data file
        // You can integrate with services like:
        // - RapidAPI TikTok scraper
        // - TikTok's unofficial API
        // - Or manually update _data/tiktoks.yml

        showTikTokPlaceholder(
            'TikTok automatic fetching requires a third-party API service. ' +
            'Please add your video URLs to _data/tiktoks.yml or integrate with a TikTok API service.'
        );

    } catch (error) {
        console.error('Error loading TikTok videos:', error);
        showTikTokPlaceholder('Error loading TikTok videos.');
    }
}

function showTikTokPlaceholder(message) {
    const tiktokGrid = document.getElementById('tiktok-grid');
    tiktokGrid.innerHTML = `
        <div class="tiktok-placeholder">
            <p>${message}</p>
            <p>Alternative: Add your TikTok video URLs manually to <code>_data/tiktoks.yml</code></p>
            <p>Or visit your TikTok profile: <a href="https://www.tiktok.com/@${tiktokGrid.dataset.username}" target="_blank">@${tiktokGrid.dataset.username}</a></p>
        </div>
    `;
}

// Scroll effects
function setupScrollEffects() {
    const menuBlur = document.getElementById('menu-blur');
    const backgroundBlur = document.getElementById('background-blur');
    const scrollToTop = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', function() {
        const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Menu blur effect
        if (menuBlur) {
            menuBlur.style.opacity = Math.min(scroll / 300, 1);
        }

        // Background blur effect
        if (backgroundBlur) {
            backgroundBlur.style.opacity = Math.min(scroll / 300, 0.5);
        }

        // Show/hide scroll to top button
        if (scrollToTop) {
            if (scroll > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        }
    });
}

// Link Thumbnails (Linktree-style)
async function loadLinkThumbnails() {
    const linkCards = document.querySelectorAll('.link-card');

    linkCards.forEach(async (card) => {
        const url = card.dataset.url;
        const customImage = card.dataset.customImage;
        const img = card.querySelector('.link-image');

        if (!url || !img) return;

        // If custom image is specified, use it directly
        if (customImage) {
            img.src = customImage;
            img.onload = () => {
                img.classList.add('loaded');
            };
            img.onerror = () => {
                // If custom image fails, try favicon
                try {
                    const domain = new URL(url).origin;
                    img.src = `${domain}/favicon.ico`;
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                } catch (e) {
                    console.error('Could not load custom image or favicon for', url);
                }
            };
            return;
        }

        try {
            // Try to fetch Open Graph image using a CORS proxy
            const thumbnailUrl = await fetchOpenGraphImage(url);

            if (thumbnailUrl) {
                img.src = thumbnailUrl;
                img.onload = () => {
                    img.classList.add('loaded');
                };
                img.onerror = () => {
                    // If image fails to load, try favicon as fallback
                    const domain = new URL(url).origin;
                    img.src = `${domain}/favicon.ico`;
                };
            } else {
                // Fallback to favicon
                const domain = new URL(url).origin;
                img.src = `${domain}/favicon.ico`;
                img.onload = () => {
                    img.classList.add('loaded');
                };
            }
        } catch (error) {
            console.error('Error loading thumbnail for', url, error);
            // Try favicon as last resort
            try {
                const domain = new URL(url).origin;
                img.src = `${domain}/favicon.ico`;
                img.onload = () => {
                    img.classList.add('loaded');
                };
            } catch (e) {
                // If all fails, just hide the placeholder
                console.error('Could not load any image for', url);
            }
        }
    });
}

async function fetchOpenGraphImage(url) {
    try {
        // Use a CORS proxy to fetch the page
        // Option 1: Use allorigins.win (free CORS proxy)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.contents) {
            // Parse HTML to find og:image meta tag
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');

            // Try different meta tags in order of preference
            const ogImage = doc.querySelector('meta[property="og:image"]');
            const twitterImage = doc.querySelector('meta[name="twitter:image"]');
            const twitterImageSrc = doc.querySelector('meta[name="twitter:image:src"]');

            let imageUrl = null;

            if (ogImage) {
                imageUrl = ogImage.getAttribute('content');
            } else if (twitterImage) {
                imageUrl = twitterImage.getAttribute('content');
            } else if (twitterImageSrc) {
                imageUrl = twitterImageSrc.getAttribute('content');
            }

            // Make sure the URL is absolute
            if (imageUrl && !imageUrl.startsWith('http')) {
                const baseUrl = new URL(url);
                imageUrl = new URL(imageUrl, baseUrl.origin).href;
            }

            return imageUrl;
        }
    } catch (error) {
        console.error('Error fetching Open Graph image:', error);
        return null;
    }

    return null;
}

