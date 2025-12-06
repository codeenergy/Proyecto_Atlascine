// ============================================
// TMDB API Integration & Smart LocalStorage Cache
// ============================================

// TMDB API Configuration
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGQzMjFmMjRiNmYyYjMyODU1YzIwOWI5MjQzNDZmNyIsIm5iZiI6MTczNzkyNDMwNC44OTEsInN1YiI6IjY3OTc1ZWUwODExNGMwOGZmZDk4YWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y-2e-jfIXsrzmAi1gTujzgYvjMNZ7FfDCLKoYGKF08s';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Cache configuration
const CACHE_CONFIG = {
    version: '1.0.0',
    expirationDays: 7, // Cache expires after 7 days
    maxItems: 500, // Maximum items to store
    compressionEnabled: true
};

// Cache keys
const CACHE_KEYS = {
    trending: 'atlascine_cache_trending',
    movies2024: 'atlascine_cache_movies_2024',
    series2024: 'atlascine_cache_series_2024',
    anime: 'atlascine_cache_anime',
    search: 'atlascine_cache_search',
    metadata: 'atlascine_cache_metadata'
};

// ============================================
// LocalStorage Cache Manager
// ============================================

class CacheManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize cache metadata
        const metadata = this.getMetadata();
        if (!metadata || metadata.version !== CACHE_CONFIG.version) {
            this.clearAll();
            this.setMetadata({
                version: CACHE_CONFIG.version,
                created: Date.now()
            });
        }
    }

    // Get cache metadata
    getMetadata() {
        try {
            const data = localStorage.getItem(CACHE_KEYS.metadata);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading cache metadata:', e);
            return null;
        }
    }

    // Set cache metadata
    setMetadata(metadata) {
        try {
            localStorage.setItem(CACHE_KEYS.metadata, JSON.stringify(metadata));
        } catch (e) {
            console.error('Error writing cache metadata:', e);
        }
    }

    // Compress data (simple JSON minification + base64)
    compress(data) {
        if (!CACHE_CONFIG.compressionEnabled) return JSON.stringify(data);

        try {
            // Minify by removing unnecessary data and converting to compact format
            const compacted = this.compactData(data);
            return JSON.stringify(compacted);
        } catch (e) {
            console.error('Compression error:', e);
            return JSON.stringify(data);
        }
    }

    // Decompress data
    decompress(compressed) {
        if (!CACHE_CONFIG.compressionEnabled) return JSON.parse(compressed);

        try {
            const compacted = JSON.parse(compressed);
            return this.expandData(compacted);
        } catch (e) {
            console.error('Decompression error:', e);
            return JSON.parse(compressed);
        }
    }

    // Compact data to reduce storage size
    compactData(items) {
        return items.map(item => ({
            i: item.id,
            t: item.title,
            th: item.thumbnail,
            r: item.rating,
            y: item.year,
            g: item.genres, // Array of genre IDs
            ty: item.type,
            tm: item.tmdbId,
            d: item.description?.substring(0, 200) // Limit description
        }));
    }

    // Expand compacted data
    expandData(compacted) {
        return compacted.map(item => ({
            id: item.i,
            title: item.t,
            thumbnail: item.th,
            rating: item.r,
            year: item.y,
            genres: item.g,
            type: item.ty,
            tmdbId: item.tm,
            description: item.d || ''
        }));
    }

    // Set cache with expiration
    set(key, data, customExpiration = null) {
        try {
            const expirationMs = (customExpiration || CACHE_CONFIG.expirationDays) * 24 * 60 * 60 * 1000;
            const cacheEntry = {
                data: this.compress(data),
                timestamp: Date.now(),
                expiration: Date.now() + expirationMs
            };

            localStorage.setItem(key, JSON.stringify(cacheEntry));
            return true;
        } catch (e) {
            // Storage quota exceeded - clear old caches
            if (e.name === 'QuotaExceededError') {
                console.warn('Storage quota exceeded, clearing old cache...');
                this.clearExpired();
                try {
                    localStorage.setItem(key, JSON.stringify({
                        data: this.compress(data),
                        timestamp: Date.now(),
                        expiration: Date.now() + 24 * 60 * 60 * 1000
                    }));
                    return true;
                } catch (e2) {
                    console.error('Failed to cache after cleanup:', e2);
                    return false;
                }
            }
            console.error('Cache set error:', e);
            return false;
        }
    }

    // Get cache if not expired
    get(key) {
        try {
            const cached = localStorage.getItem(key);
            if (!cached) return null;

            const cacheEntry = JSON.parse(cached);

            // Check expiration
            if (Date.now() > cacheEntry.expiration) {
                localStorage.removeItem(key);
                return null;
            }

            return this.decompress(cacheEntry.data);
        } catch (e) {
            console.error('Cache get error:', e);
            return null;
        }
    }

    // Check if cache exists and is valid
    isValid(key) {
        try {
            const cached = localStorage.getItem(key);
            if (!cached) return false;

            const cacheEntry = JSON.parse(cached);
            return Date.now() <= cacheEntry.expiration;
        } catch (e) {
            return false;
        }
    }

    // Clear expired caches
    clearExpired() {
        const keys = Object.values(CACHE_KEYS);
        keys.forEach(key => {
            if (!this.isValid(key)) {
                localStorage.removeItem(key);
            }
        });
    }

    // Clear all caches
    clearAll() {
        const keys = Object.values(CACHE_KEYS);
        keys.forEach(key => localStorage.removeItem(key));
    }

    // Get cache size info
    getCacheInfo() {
        let totalSize = 0;
        const info = {};

        Object.entries(CACHE_KEYS).forEach(([name, key]) => {
            const cached = localStorage.getItem(key);
            if (cached) {
                const size = new Blob([cached]).size;
                totalSize += size;
                info[name] = {
                    size: size,
                    sizeKB: (size / 1024).toFixed(2),
                    valid: this.isValid(key)
                };
            }
        });

        return {
            total: totalSize,
            totalKB: (totalSize / 1024).toFixed(2),
            totalMB: (totalSize / 1024 / 1024).toFixed(2),
            caches: info
        };
    }
}

// Initialize cache manager
const cache = new CacheManager();

// ============================================
// TMDB API Functions
// ============================================

// Fetch from TMDB with error handling
async function tmdbFetch(endpoint, params = {}) {
    try {
        const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${TMDB_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('TMDB fetch error:', error);
        return null;
    }
}

// Get image URL
function getImageUrl(path, size = 'w500') {
    if (!path) return 'https://via.placeholder.com/500x750/1a1a2e/e50914?text=No+Image';
    return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

// Map TMDB genre IDs to names
const GENRE_MAP = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    10759: 'Action', 10762: 'Kids', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi', 10766: 'Soap', 10767: 'Talk', 10768: 'War'
};

// Convert TMDB item to app format
function convertTMDBItem(item, type) {
    const isAnime = item.genre_ids?.includes(16) || item.origin_country?.includes('JP');
    const year = (item.release_date || item.first_air_date || '').substring(0, 4) || '2024';

    return {
        id: `tmdb_${type}_${item.id}`,
        tmdbId: item.id,
        title: item.title || item.name,
        thumbnail: getImageUrl(item.poster_path),
        backdrop: getImageUrl(item.backdrop_path, 'w1280'),
        rating: Math.round((item.vote_average || 0) * 10),
        year: year,
        genres: (item.genre_ids || []).map(id => GENRE_MAP[id] || 'Other').filter(Boolean),
        type: isAnime ? 'anime' : type,
        description: item.overview || 'No description available.',
        country: item.origin_country?.[0] || 'US',
        language: item.original_language?.toUpperCase() || 'EN'
    };
}

// ============================================
// Main Fetch Functions with Cache
// ============================================

// Get trending content (movies + TV)
async function fetchTrending() {
    const cached = cache.get(CACHE_KEYS.trending);
    if (cached) {
        console.log('Using cached trending data');
        return cached;
    }

    console.log('Fetching fresh trending data from TMDB...');

    const [moviesData, tvData] = await Promise.all([
        tmdbFetch('/trending/movie/week', { language: 'es-ES' }),
        tmdbFetch('/trending/tv/week', { language: 'es-ES' })
    ]);

    if (!moviesData || !tvData) return [];

    const movies = (moviesData.results || []).slice(0, 10).map(item => convertTMDBItem(item, 'movie'));
    const series = (tvData.results || []).slice(0, 10).map(item => convertTMDBItem(item, 'series'));

    const trending = [...movies, ...series];
    cache.set(CACHE_KEYS.trending, trending);

    return trending;
}

// Get movies from 2024
async function fetchMovies2024() {
    const cached = cache.get(CACHE_KEYS.movies2024);
    if (cached) {
        console.log('Using cached 2024 movies');
        return cached;
    }

    console.log('Fetching 2024 movies from TMDB...');

    const data = await tmdbFetch('/discover/movie', {
        language: 'es-ES',
        'primary_release_year': '2024',
        'sort_by': 'popularity.desc',
        page: 1
    });

    if (!data) return [];

    const movies = (data.results || []).map(item => convertTMDBItem(item, 'movie'));
    cache.set(CACHE_KEYS.movies2024, movies);

    return movies;
}

// Get series from 2024
async function fetchSeries2024() {
    const cached = cache.get(CACHE_KEYS.series2024);
    if (cached) {
        console.log('Using cached 2024 series');
        return cached;
    }

    console.log('Fetching 2024 series from TMDB...');

    const data = await tmdbFetch('/discover/tv', {
        language: 'es-ES',
        'first_air_date_year': '2024',
        'sort_by': 'popularity.desc',
        page: 1
    });

    if (!data) return [];

    const series = (data.results || []).map(item => convertTMDBItem(item, 'series'));
    cache.set(CACHE_KEYS.series2024, series);

    return series;
}

// Get anime content
async function fetchAnime() {
    const cached = cache.get(CACHE_KEYS.anime);
    if (cached) {
        console.log('Using cached anime data');
        return cached;
    }

    console.log('Fetching anime from TMDB...');

    const data = await tmdbFetch('/discover/tv', {
        language: 'es-ES',
        'with_genres': '16',
        'with_origin_country': 'JP',
        'sort_by': 'popularity.desc',
        page: 1
    });

    if (!data) return [];

    const anime = (data.results || []).map(item => convertTMDBItem(item, 'anime'));
    cache.set(CACHE_KEYS.anime, anime);

    return anime;
}

// Search by name (with caching)
async function searchContent(query) {
    const cacheKey = `${CACHE_KEYS.search}_${query.toLowerCase()}`;
    const cached = cache.get(cacheKey);

    if (cached) {
        console.log(`Using cached search results for: ${query}`);
        return cached;
    }

    console.log(`Searching TMDB for: ${query}`);

    const data = await tmdbFetch('/search/multi', {
        language: 'es-ES',
        query: query,
        page: 1
    });

    if (!data) return [];

    const results = (data.results || [])
        .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
        .map(item => convertTMDBItem(item, item.media_type === 'movie' ? 'movie' : 'series'));

    // Cache search results for 1 day
    cache.set(cacheKey, results, 1);

    return results;
}

// ============================================
// Initialize and populate cache
// ============================================

async function initializeCache() {
    console.log('Initializing TMDB cache system...');

    // Fetch all data in parallel
    await Promise.all([
        fetchTrending(),
        fetchMovies2024(),
        fetchSeries2024(),
        fetchAnime()
    ]);

    console.log('Cache initialized successfully!');
    console.log('Cache info:', cache.getCacheInfo());
}

// Export functions for use in app
window.TMDBCache = {
    fetchTrending,
    fetchMovies2024,
    fetchSeries2024,
    fetchAnime,
    searchContent,
    initializeCache,
    cache,
    getCacheInfo: () => cache.getCacheInfo(),
    clearCache: () => cache.clearAll()
};

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCache);
} else {
    initializeCache();
}
