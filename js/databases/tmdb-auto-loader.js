// TMDB Auto-Loader - Loads content directly from TMDB API
// No backend needed - works with static hosting
// Updates automatically every time the page loads

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGQzMjFmMjRiNmYyYjMyODU1YzIwOWI5MjQzNDZmNyIsIm5iZiI6MTczNzkyNDMwNC44OTEsInN1YiI6IjY3OTc1ZWUwODExNGMwOGZmZDk4YWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y-2e-jfIXsrzmAi1gTujzgYvjMNZ7FfDCLKoYGKF08s';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Database configurations
const autoLoaderConfig = {
    hdtoday: {
        name: 'HDToday',
        genres: [28, 12, 878],
        region: 'Hollywood',
        country: 'Estados Unidos',
        language: 'Inglés',
        startId: 1,
        limit: 30
    },
    lodynet: {
        name: 'Lodynet',
        originalLanguage: 'hi',
        region: 'Asia',
        country: 'India',
        language: 'Hindi',
        startId: 100,
        limit: 20
    },
    aradramatv: {
        name: 'ArabDramaTV',
        originalLanguage: 'ko',
        region: 'Asia',
        country: 'Corea del Sur',
        language: 'Coreano',
        startId: 300,
        limit: 30
    },
    pelisflix: {
        name: 'Pelisflix',
        genres: [18, 35, 10765],
        region: 'Hollywood',
        country: 'Estados Unidos',
        language: 'Inglés',
        startId: 200,
        limit: 25
    },
    vidsrc: {
        name: 'VidSrc',
        genres: [28, 878, 16],
        region: 'Hollywood',
        country: 'Estados Unidos',
        language: 'Inglés',
        startId: 400,
        limit: 25
    },
    embedsu: {
        name: 'EmbedSu',
        genres: [18, 53],
        region: 'Europa',
        country: 'Estados Unidos',
        language: 'Inglés',
        startId: 500,
        limit: 25
    },
    dramacool: {
        name: 'DramaCool',
        originalLanguage: 'ko,ja',
        region: 'Asia',
        country: 'Corea del Sur',
        language: 'Coreano',
        startId: 600,
        limit: 25
    },
    asiancrush: {
        name: 'AsianCrush',
        originalLanguage: 'hi,ja,zh',
        region: 'Asia',
        country: 'India',
        language: 'Hindi',
        startId: 700,
        limit: 25
    },
    cinecalidad: {
        name: 'Cinecalidad',
        genres: [28, 12],
        region: 'Hollywood',
        country: 'Estados Unidos',
        language: 'Inglés',
        startId: 800,
        limit: 25
    },
    cuevana: {
        name: 'Cuevana',
        genres: [28, 878, 27],
        region: 'Hollywood',
        country: 'Estados Unidos',
        language: 'Inglés',
        startId: 900,
        limit: 25
    }
};

// Genre map
const genreMap = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
    9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV',
    53: 'Thriller', 10752: 'War', 37: 'Western', 10765: 'Sci-Fi & Fantasy'
};

// Cache management
function getCacheKey(source) {
    return `atlascine_cache_${source}`;
}

function getCacheTimestampKey(source) {
    return `atlascine_cache_timestamp_${source}`;
}

function isCacheValid(source) {
    const timestamp = localStorage.getItem(getCacheTimestampKey(source));
    if (!timestamp) return false;

    const age = Date.now() - parseInt(timestamp);
    return age < CACHE_DURATION;
}

function saveToCache(source, data) {
    try {
        localStorage.setItem(getCacheKey(source), JSON.stringify(data));
        localStorage.setItem(getCacheTimestampKey(source), Date.now().toString());
    } catch (e) {
        console.warn(`⚠️ Could not save to cache: ${e.message}`);
    }
}

function getFromCache(source) {
    try {
        const data = localStorage.getItem(getCacheKey(source));
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.warn(`⚠️ Could not read from cache: ${e.message}`);
        return null;
    }
}

// TMDB API calls
async function tmdbRequest(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${TMDB_API_KEY}`,
            'accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
    }

    return await response.json();
}

async function fetchContentByGenre(type, genreId, page = 1) {
    return await tmdbRequest(`/discover/${type}`, {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc'
    });
}

async function fetchContentByLanguage(type, language, page = 1) {
    return await tmdbRequest(`/discover/${type}`, {
        with_original_language: language,
        page,
        sort_by: 'popularity.desc'
    });
}

async function fetchPopular(type, page = 1) {
    return await tmdbRequest(`/${type}/popular`, { page });
}

// Transform TMDB data to database format
function transformToDatabase(items, sourceName, config) {
    return items.map((item, index) => {
        const id = config.startId + index;
        const title = item.title || item.name;
        const type = item.media_type || (item.title ? 'movie' : 'series');
        const year = (item.release_date || item.first_air_date || '').substring(0, 4) || 2023;
        const thumbnail = item.poster_path
            ? `https://image.tmdb.org/t/p/original${item.poster_path}`
            : 'https://image.tmdb.org/t/p/original/default.jpg';

        const genres = (item.genre_ids || []).slice(0, 2).map(id => genreMap[id] || 'Drama');
        const rating = Math.round((item.vote_average || 7) * 10);
        const description = (item.overview || 'No description available.').substring(0, 150);

        return {
            id,
            tmdbId: String(item.id),
            title,
            thumbnail,
            year: parseInt(year),
            genre: genres,
            rating,
            description,
            region: config.region,
            country: config.country,
            type,
            language: config.language,
            source: sourceName
        };
    });
}

// Load content for a specific source
async function loadSource(sourceName) {
    const config = autoLoaderConfig[sourceName];
    if (!config) {
        console.warn(`⚠️ Unknown source: ${sourceName}`);
        return [];
    }

    // Check cache first
    if (isCacheValid(sourceName)) {
        const cached = getFromCache(sourceName);
        if (cached) {
            console.log(`✅ ${config.name} loaded from cache (${cached.length} titles)`);
            return cached;
        }
    }

    console.log(`📥 Loading ${config.name} from TMDB...`);

    let allContent = [];

    try {
        // Fetch based on configuration
        if (config.originalLanguage) {
            const languages = config.originalLanguage.split(',');
            for (const lang of languages) {
                const tvData = await fetchContentByLanguage('tv', lang.trim(), 1);
                const movieData = await fetchContentByLanguage('movie', lang.trim(), 1);

                if (tvData && tvData.results) allContent = allContent.concat(tvData.results);
                if (movieData && movieData.results) allContent = allContent.concat(movieData.results);
            }
        } else if (config.genres) {
            for (const genre of config.genres) {
                const movieData = await fetchContentByGenre('movie', genre, 1);
                const tvData = await fetchContentByGenre('tv', genre, 1);

                if (movieData && movieData.results) allContent = allContent.concat(movieData.results);
                if (tvData && tvData.results) allContent = allContent.concat(tvData.results);
            }
        } else {
            const movieData = await fetchPopular('movie', 1);
            const tvData = await fetchPopular('tv', 1);

            if (movieData && movieData.results) allContent = allContent.concat(movieData.results);
            if (tvData && tvData.results) allContent = allContent.concat(tvData.results);
        }

        // Remove duplicates and limit
        const uniqueContent = Array.from(new Map(allContent.map(item => [item.id, item])).values());
        const limitedContent = uniqueContent.slice(0, config.limit);

        // Transform to database format
        const transformed = transformToDatabase(limitedContent, sourceName, config);

        // Save to cache
        saveToCache(sourceName, transformed);

        console.log(`✅ ${config.name} loaded: ${transformed.length} titles`);
        return transformed;

    } catch (error) {
        console.error(`❌ Error loading ${config.name}:`, error.message);

        // Try to return cached data even if expired
        const cached = getFromCache(sourceName);
        if (cached) {
            console.log(`⚠️ Using expired cache for ${config.name}`);
            return cached;
        }

        return [];
    }
}

// Load all sources
async function loadAllSources() {
    console.log('🚀 TMDB Auto-Loader: Loading all sources...\n');

    const sources = Object.keys(autoLoaderConfig);
    const promises = sources.map(source => loadSource(source));
    const results = await Promise.all(promises);

    // Combine all results
    const combined = results.flat();

    console.log(`\n📊 Total loaded: ${combined.length} titles from ${sources.length} sources`);
    return combined;
}

// Initialize - This replaces the static databases
async function initAutoLoader() {
    console.log('🔄 Initializing TMDB Auto-Loader...');

    try {
        window.autoLoadedDatabase = await loadAllSources();
        console.log('✅ Auto-loader initialized successfully');

        // Trigger custom event for app to know database is ready
        window.dispatchEvent(new CustomEvent('databaseReady', {
            detail: { database: window.autoLoadedDatabase }
        }));

    } catch (error) {
        console.error('❌ Auto-loader initialization failed:', error);
        window.autoLoadedDatabase = [];
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadSource, loadAllSources, initAutoLoader };
}
