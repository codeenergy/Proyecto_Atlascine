// API Configuration
const GEMINI_API_KEY = 'AIzaSyBMDm5GvL-A_MiYYWZeNWwQaIYR9kpxfKg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// TMDB API Configuration
const TMDB_API_KEY = 'febf4ee4ded854aadc4c03d51456f537';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Video Embed Sources
const VIDEO_SOURCES = {
    vidsrc_xyz: (type, tmdbId) => `https://vidsrc.xyz/embed/${type}/${tmdbId}`,
    vidsrc_to: (type, tmdbId) => `https://vidsrc.to/embed/${type}/${tmdbId}`,
    embed2: (tmdbId) => `https://www.2embed.cc/embed/${tmdbId}`,
    multiembed: (tmdbId) => `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`
};

// Week calculation for weekly recommendations
function getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GEMINI_API_KEY, GEMINI_API_URL, VIDEO_SOURCES, getWeekNumber };
}
