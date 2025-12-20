/**
 * AtlasCine - TMDB Data Loader
 * Carga datos reales desde TMDB sin guardar localmente
 */

const TMDB_CONFIG = {
    apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGQzMjFmMjRiNmYyYjMyODU1YzIwOWI5MjQzNDZmNyIsIm5iZiI6MTczNzkyNDMwNC44OTEsInN1YiI6IjY3OTc1ZWUwODExNGMwOGZmZDk4YWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y-2e-jfIXsrzmAi1gTujzgYvjMNZ7FfDCLKoYGKF08s',
    baseUrl: 'https://api.themoviedb.org/3',
    imageBase: 'https://image.tmdb.org/t/p'
};

// Headers para las peticiones
const headers = {
    'Authorization': `Bearer ${TMDB_CONFIG.apiKey}`,
    'Content-Type': 'application/json'
};

/**
 * Fetch helper con manejo de errores
 */
async function tmdbFetch(endpoint) {
    try {
        const response = await fetch(`${TMDB_CONFIG.baseUrl}${endpoint}`, { headers });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

/**
 * Convertir datos de TMDB a formato AtlasCine
 */
function convertToAtlasCineFormat(item, type) {
    return {
        id: `${type}-${item.id}`,
        tmdbId: item.id,
        title: item.title || item.name,
        type: type,
        year: (item.release_date || item.first_air_date || '').substring(0, 4),
        rating: Math.round((item.vote_average || 0) * 10),
        language: item.original_language === 'en' ? 'Inglés' :
                  item.original_language === 'es' ? 'Español' :
                  item.original_language === 'ja' ? 'Japonés' :
                  item.original_language === 'ko' ? 'Coreano' :
                  item.original_language === 'hi' ? 'Hindi' :
                  item.original_language === 'tr' ? 'Turco' :
                  item.original_language === 'th' ? 'Tailandés' :
                  item.original_language === 'fr' ? 'Francés' : 'Otro',
        region: item.origin_country?.[0] === 'US' ? 'US' :
                item.origin_country?.[0] === 'KR' ? 'Asia' :
                item.origin_country?.[0] === 'JP' ? 'Asia' :
                item.origin_country?.[0] === 'IN' ? 'India' :
                item.origin_country?.[0] === 'TR' ? 'Asia' :
                item.origin_country?.[0] === 'TH' ? 'Asia' : 'US',
        genres: item.genre_ids || [],
        poster: item.poster_path ? `${TMDB_CONFIG.imageBase}/w500${item.poster_path}` : '',
        backdrop: item.backdrop_path ? `${TMDB_CONFIG.imageBase}/original${item.backdrop_path}` : '',
        description: item.overview || 'Sin descripción disponible.',
        servers: [
            `https://vidsrc.to/embed/${type}/${item.id}`,
            `https://vidsrc.xyz/embed/${type}/${item.id}`,
            `https://www.2embed.cc/embed/${item.id}`,
            `https://multiembed.mov/?video_id=${item.id}&tmdb=1`
        ]
    };
}

/**
 * CARGAR PELÍCULAS TRENDING
 */
async function loadTrendingMovies(page = 1) {
    const data = await tmdbFetch(`/trending/movie/week?page=${page}&language=es-ES`);
    if (!data || !data.results) return [];
    return data.results.map(item => convertToAtlasCineFormat(item, 'movie'));
}

/**
 * CARGAR PELÍCULAS POPULARES
 */
async function loadPopularMovies(page = 1) {
    const data = await tmdbFetch(`/movie/popular?page=${page}&language=es-ES`);
    if (!data || !data.results) return [];
    return data.results.map(item => convertToAtlasCineFormat(item, 'movie'));
}

/**
 * CARGAR PELÍCULAS TOP RATED
 */
async function loadTopRatedMovies(page = 1) {
    const data = await tmdbFetch(`/movie/top_rated?page=${page}&language=es-ES`);
    if (!data || !data.results) return [];
    return data.results.map(item => convertToAtlasCineFormat(item, 'movie'));
}

/**
 * CARGAR SERIES TRENDING
 */
async function loadTrendingSeries(page = 1) {
    const data = await tmdbFetch(`/trending/tv/week?page=${page}&language=es-ES`);
    if (!data || !data.results) return [];
    return data.results.map(item => convertToAtlasCineFormat(item, 'tv'));
}

/**
 * CARGAR SERIES POPULARES
 */
async function loadPopularSeries(page = 1) {
    const data = await tmdbFetch(`/tv/popular?page=${page}&language=es-ES`);
    if (!data || !data.results) return [];
    return data.results.map(item => convertToAtlasCineFormat(item, 'tv'));
}

/**
 * CARGAR SERIES TOP RATED
 */
async function loadTopRatedSeries(page = 1) {
    const data = await tmdbFetch(`/tv/top_rated?page=${page}&language=es-ES`);
    if (!data || !data.results) return [];
    return data.results.map(item => convertToAtlasCineFormat(item, 'tv'));
}

/**
 * CARGAR ANIME (Series con género Animation de origen JP/KR)
 */
async function loadAnime(page = 1) {
    const data = await tmdbFetch(`/discover/tv?with_genres=16&with_origin_country=JP&page=${page}&language=es-ES&sort_by=popularity.desc`);
    if (!data || !data.results) return [];
    return data.results.map(item => {
        const converted = convertToAtlasCineFormat(item, 'tv');
        converted.type = 'anime';
        return converted;
    });
}

/**
 * CARGAR K-DRAMAS
 */
async function loadKDramas(page = 1) {
    const data = await tmdbFetch(`/discover/tv?with_origin_country=KR&page=${page}&language=es-ES&sort_by=popularity.desc`);
    if (!data || !data.results) return [];
    return data.results.map(item => convertToAtlasCineFormat(item, 'tv'));
}

/**
 * CARGAR TODO EL CONTENIDO
 * Carga datos reales desde TMDB en tiempo real
 */
async function loadAllContent() {
    console.log('%c🎬 TMDB Loader', 'font-size: 14px; font-weight: bold; color: #01b4e4;');
    console.log('%c⏳ Cargando contenido real desde TMDB...', 'color: #999;');

    try {
        // Cargar todo en paralelo
        const [
            trendingMovies,
            popularMovies,
            topMovies,
            trendingSeries,
            popularSeries,
            topSeries,
            anime,
            kdramas
        ] = await Promise.all([
            loadTrendingMovies(1),
            loadPopularMovies(1),
            loadTopRatedMovies(1),
            loadTrendingSeries(1),
            loadPopularSeries(1),
            loadTopRatedSeries(1),
            loadAnime(1),
            loadKDramas(1)
        ]);

        // Combinar todo sin duplicados
        const allContent = [
            ...trendingMovies,
            ...popularMovies,
            ...topMovies,
            ...trendingSeries,
            ...popularSeries,
            ...topSeries,
            ...anime,
            ...kdramas
        ];

        // Eliminar duplicados por tmdbId
        const unique = Array.from(
            new Map(allContent.map(item => [item.tmdbId, item])).values()
        );

        console.log('%c✅ Contenido cargado', 'color: #46d369; font-weight: bold;');
        console.log(`📊 Total: ${unique.length} items`);
        console.log(`🎬 Películas: ${unique.filter(i => i.type === 'movie').length}`);
        console.log(`📺 Series: ${unique.filter(i => i.type === 'tv').length}`);
        console.log(`🎌 Anime: ${unique.filter(i => i.type === 'anime').length}`);

        return unique;

    } catch (error) {
        console.error('❌ Error cargando contenido:', error);
        return [];
    }
}

/**
 * INICIALIZAR Y CARGAR DATOS
 */
async function initTMDBLoader() {
    const content = await loadAllContent();

    // Hacer disponible globalmente
    window.database = content;

    // Disparar evento
    const event = new CustomEvent('tmdbContentLoaded', {
        detail: { content, count: content.length }
    });
    window.dispatchEvent(event);

    return content;
}

// Exportar funciones
window.initTMDBLoader = initTMDBLoader;
window.loadAllContent = loadAllContent;
window.loadTrendingMovies = loadTrendingMovies;
window.loadPopularMovies = loadPopularMovies;
window.loadTrendingSeries = loadTrendingSeries;
window.loadAnime = loadAnime;
window.loadKDramas = loadKDramas;
