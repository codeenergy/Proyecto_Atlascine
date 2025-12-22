/**
 * AtlasCine - TMDB to Firebase Sync
 * Carga datos reales desde TMDB y los guarda en Firebase
 * USO: Ejecutar una vez para poblar la base de datos
 */

const TMDB_SYNC_CONFIG = {
    // Usando API Key v3 directamente (más estable)
    apiKey: '84d321f24b6f2b32855c209b924346f7',
    useV3Auth: true, // Usar autenticación v3 en lugar de Bearer token
    baseUrl: 'https://api.themoviedb.org/3',
    imageBase: 'https://image.tmdb.org/t/p',
    collection: 'movies_series' // Nombre de la colección en Firebase
};

/**
 * Mapear géneros de TMDB
 */
const GENRE_MAP = {
    28: 'Acción',
    12: 'Aventura',
    16: 'Animación',
    35: 'Comedia',
    80: 'Crimen',
    99: 'Documental',
    18: 'Drama',
    10751: 'Familiar',
    14: 'Fantasía',
    36: 'Historia',
    27: 'Terror',
    10402: 'Música',
    9648: 'Misterio',
    10749: 'Romance',
    878: 'Ciencia Ficción',
    10770: 'Película de TV',
    53: 'Thriller',
    10752: 'Bélica',
    37: 'Western',
    // Series
    10759: 'Acción y Aventura',
    10762: 'Kids',
    10763: 'Noticias',
    10764: 'Reality',
    10765: 'Ciencia Ficción y Fantasía',
    10766: 'Telenovela',
    10767: 'Talk',
    10768: 'Guerra y Política'
};

/**
 * Fetch desde TMDB con autenticación v3
 */
async function tmdbFetch(endpoint) {
    try {
        // Agregar api_key como parámetro de query para v3
        const separator = endpoint.includes('?') ? '&' : '?';
        const url = `${TMDB_SYNC_CONFIG.baseUrl}${endpoint}${separator}api_key=${TMDB_SYNC_CONFIG.apiKey}`;

        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

/**
 * Convertir item de TMDB a formato Firebase
 */
function convertToFirebaseFormat(item, type, source = 'tmdb') {
    const genreNames = (item.genre_ids || []).map(id => GENRE_MAP[id] || '').filter(g => g);

    return {
        // IDs
        tmdbId: item.id,
        source: source,

        // Info básica
        title: item.title || item.name,
        type: type,
        year: parseInt((item.release_date || item.first_air_date || '2024').substring(0, 4)),
        rating: Math.round((item.vote_average || 0) * 10),

        // Idioma y región
        language: mapLanguage(item.original_language),
        region: mapRegion(item.origin_country?.[0] || item.original_language),
        country: mapRegion(item.origin_country?.[0] || item.original_language),

        // Géneros (usar "genre" para consistencia con app.js)
        genre: genreNames,

        // Imágenes
        poster: item.poster_path ? `${TMDB_SYNC_CONFIG.imageBase}/w500${item.poster_path}` : '',
        backdrop: item.backdrop_path ? `${TMDB_SYNC_CONFIG.imageBase}/original${item.backdrop_path}` : '',

        // Descripción
        description: item.overview || 'Sin descripción disponible.',

        // Servidores
        servers: [
            `https://vidsrc.to/embed/${type}/${item.id}`,
            `https://vidsrc.xyz/embed/${type}/${item.id}`,
            `https://www.2embed.cc/embed/${item.id}`,
            `https://multiembed.mov/?video_id=${item.id}&tmdb=1`
        ],

        // Metadata
        popularity: item.popularity || 0,
        voteCount: item.vote_count || 0,
        adult: item.adult || false,

        // Timestamp
        addedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
}

/**
 * Mapear idioma
 */
function mapLanguage(lang) {
    const langMap = {
        'en': 'Inglés',
        'es': 'Español',
        'ja': 'Japonés',
        'ko': 'Coreano',
        'hi': 'Hindi',
        'tr': 'Turco',
        'th': 'Tailandés',
        'fr': 'Francés',
        'de': 'Alemán',
        'it': 'Italiano',
        'pt': 'Portugués',
        'zh': 'Chino',
        'ar': 'Árabe',
        'ru': 'Ruso'
    };
    return langMap[lang] || 'Otro';
}

/**
 * Mapear región
 */
function mapRegion(country) {
    if (!country) return 'US';

    const regionMap = {
        'US': 'US',
        'GB': 'EU',
        'FR': 'EU',
        'DE': 'EU',
        'IT': 'EU',
        'ES': 'EU',
        'KR': 'Asia',
        'JP': 'Asia',
        'CN': 'Asia',
        'TH': 'Asia',
        'IN': 'India',
        'TR': 'Asia',
        'MX': 'LatAm',
        'BR': 'LatAm',
        'AR': 'LatAm',
        'CO': 'LatAm',
        'NG': 'Africa',
        'ZA': 'Africa',
        'EG': 'Africa'
    };
    return regionMap[country] || 'US';
}

/**
 * GUARDAR EN FIREBASE
 */
async function saveToFirebase(item) {
    try {
        const db = firebase.firestore();
        const docId = `${item.source}-${item.type}-${item.tmdbId}`;

        await db.collection(TMDB_SYNC_CONFIG.collection).doc(docId).set(item, { merge: true });
        return true;
    } catch (error) {
        console.error('Error guardando en Firebase:', error);
        return false;
    }
}

/**
 * SYNC: Cargar y guardar películas trending
 */
async function syncTrendingMovies(pages = 3) {
    console.log('📥 Sincronizando películas trending...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/trending/movie/week?page=${page}&language=es-ES`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'movie', 'tmdb-trending');
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }

        // Delay para no exceder rate limit
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} películas trending guardadas`);
    return total;
}

/**
 * SYNC: Cargar y guardar películas populares
 */
async function syncPopularMovies(pages = 3) {
    console.log('📥 Sincronizando películas populares...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/movie/popular?page=${page}&language=es-ES`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'movie', 'tmdb-popular');
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} películas populares guardadas`);
    return total;
}

/**
 * SYNC: Cargar y guardar series trending
 */
async function syncTrendingSeries(pages = 3) {
    console.log('📥 Sincronizando series trending...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/trending/tv/week?page=${page}&language=es-ES`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'tv', 'tmdb-trending');
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} series trending guardadas`);
    return total;
}

/**
 * SYNC: Cargar y guardar series populares
 */
async function syncPopularSeries(pages = 3) {
    console.log('📥 Sincronizando series populares...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/tv/popular?page=${page}&language=es-ES`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'tv', 'tmdb-popular');
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} series populares guardadas`);
    return total;
}

/**
 * SYNC: Cargar y guardar anime
 */
async function syncAnime(pages = 3) {
    console.log('📥 Sincronizando anime...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/discover/tv?with_genres=16&with_origin_country=JP&page=${page}&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'anime', 'tmdb-anime');
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} anime guardados`);
    return total;
}

/**
 * SYNC: Cargar y guardar K-Dramas
 */
async function syncKDramas(pages = 3) {
    console.log('📥 Sincronizando K-Dramas...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/discover/tv?with_origin_country=KR&page=${page}&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'tv', 'tmdb-kdrama');
            firebaseItem.language = 'Coreano';
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} K-Dramas guardados`);
    return total;
}

/**
 * SYNC: Series Turcas
 */
async function syncTurkishSeries(pages = 2) {
    console.log('📥 Sincronizando series turcas...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/discover/tv?with_origin_country=TR&page=${page}&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'tv', 'tmdb-turkish');
            firebaseItem.language = 'Turco';
            firebaseItem.region = 'Turquía';
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} series turcas guardadas`);
    return total;
}

/**
 * SYNC: Dramas Tailandeses
 */
async function syncThaiDramas(pages = 2) {
    console.log('📥 Sincronizando dramas tailandeses...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/discover/tv?with_origin_country=TH&page=${page}&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'tv', 'tmdb-thai');
            firebaseItem.language = 'Tailandés';
            firebaseItem.region = 'Tailandia';
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} dramas tailandeses guardados`);
    return total;
}

/**
 * SYNC: Bollywood (Películas y Series de India)
 */
async function syncBollywood(pages = 2) {
    console.log('📥 Sincronizando Bollywood...');
    let total = 0;

    // Películas de India
    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/discover/movie?with_origin_country=IN&page=${page}&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'movie', 'tmdb-bollywood');
            firebaseItem.language = 'Hindi';
            firebaseItem.region = 'India';
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} contenido Bollywood guardado`);
    return total;
}

/**
 * SYNC: Cine Latinoamericano
 */
async function syncLatinMovies(pages = 2) {
    console.log('📥 Sincronizando cine latinoamericano...');
    let total = 0;

    const countries = ['MX', 'AR', 'BR', 'CO', 'CL'];

    for (const country of countries) {
        const data = await tmdbFetch(`/discover/movie?with_origin_country=${country}&page=1&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results.slice(0, 10)) {
            const firebaseItem = convertToFirebaseFormat(item, 'movie', 'tmdb-latin');
            firebaseItem.region = 'América Latina';
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} películas latinoamericanas guardadas`);
    return total;
}

/**
 * SYNC: Cine Europeo
 */
async function syncEuropeanMovies(pages = 2) {
    console.log('📥 Sincronizando cine europeo...');
    let total = 0;

    const countries = ['FR', 'IT', 'ES', 'DE', 'GB'];

    for (const country of countries) {
        const data = await tmdbFetch(`/discover/movie?with_origin_country=${country}&page=1&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results.slice(0, 10)) {
            const firebaseItem = convertToFirebaseFormat(item, 'movie', 'tmdb-european');
            firebaseItem.region = 'Europa';
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} películas europeas guardadas`);
    return total;
}

/**
 * SYNC: Dramas Chinos
 */
async function syncChineseDramas(pages = 2) {
    console.log('📥 Sincronizando dramas chinos...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/discover/tv?with_origin_country=CN&page=${page}&language=es-ES&sort_by=popularity.desc`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'tv', 'tmdb-chinese');
            firebaseItem.language = 'Chino';
            firebaseItem.region = 'China';
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} dramas chinos guardados`);
    return total;
}

/**
 * SYNC: Top Rated Movies
 */
async function syncTopRatedMovies(pages = 2) {
    console.log('📥 Sincronizando películas top rated...');
    let total = 0;

    for (let page = 1; page <= pages; page++) {
        const data = await tmdbFetch(`/movie/top_rated?page=${page}&language=es-ES`);
        if (!data || !data.results) continue;

        for (const item of data.results) {
            const firebaseItem = convertToFirebaseFormat(item, 'movie', 'tmdb-toprated');
            const saved = await saveToFirebase(firebaseItem);
            if (saved) total++;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`✅ ${total} películas top rated guardadas`);
    return total;
}

/**
 * SYNC COMPLETO - Ejecutar todo
 */
async function syncAllContent() {
    console.log('%c🔄 TMDB → Firebase Sync AMPLIADO', 'font-size: 16px; font-weight: bold; color: #01b4e4;');
    console.log('%c⏳ Iniciando sincronización completa con TODAS las categorías...', 'color: #999;');

    const startTime = Date.now();

    try {
        const results = await Promise.all([
            // Tendencias y Populares
            syncTrendingMovies(3),
            syncPopularMovies(3),
            syncTrendingSeries(3),
            syncPopularSeries(3),
            syncTopRatedMovies(2),

            // Anime y Dramas Asiáticos
            syncAnime(3),
            syncKDramas(3),
            syncChineseDramas(2),
            syncThaiDramas(2),

            // Contenido por Región
            syncBollywood(2),
            syncTurkishSeries(2),
            syncLatinMovies(2),
            syncEuropeanMovies(2)
        ]);

        const total = results.reduce((sum, val) => sum + val, 0);
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        console.log('%c✅ SINCRONIZACIÓN COMPLETA', 'font-size: 14px; font-weight: bold; color: #46d369;');
        console.log(`📊 Total guardado: ${total} items`);
        console.log(`⏱️ Tiempo: ${duration}s`);
        console.log('%c🌍 Categorías sincronizadas:', 'color: #01b4e4; font-weight: bold;');
        console.log('  • Películas Trending & Populares');
        console.log('  • Series Trending & Populares');
        console.log('  • Top Rated Movies');
        console.log('  • Anime Japonés');
        console.log('  • K-Dramas Coreanos');
        console.log('  • Dramas Chinos');
        console.log('  • Dramas Tailandeses');
        console.log('  • Series Turcas');
        console.log('  • Bollywood (India)');
        console.log('  • Cine Latinoamericano');
        console.log('  • Cine Europeo');

        return { success: true, total, duration };

    } catch (error) {
        console.error('❌ Error en sincronización:', error);
        return { success: false, error };
    }
}

/**
 * LIMPIAR COLECCIÓN (usar con cuidado)
 */
async function clearCollection() {
    const confirmed = confirm('¿Estás seguro de que quieres eliminar TODOS los datos de Firebase?');
    if (!confirmed) return;

    console.log('🗑️ Eliminando colección...');

    try {
        const db = firebase.firestore();
        const snapshot = await db.collection(TMDB_SYNC_CONFIG.collection).get();

        const batch = db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        console.log('✅ Colección eliminada');
    } catch (error) {
        console.error('❌ Error eliminando colección:', error);
    }
}

// Exportar funciones globalmente
window.syncAllContent = syncAllContent;
window.syncTrendingMovies = syncTrendingMovies;
window.syncPopularMovies = syncPopularMovies;
window.syncTrendingSeries = syncTrendingSeries;
window.syncPopularSeries = syncPopularSeries;
window.syncAnime = syncAnime;
window.syncKDramas = syncKDramas;
window.clearCollection = clearCollection;

console.log('%c📦 TMDB to Firebase Sync loaded', 'color: #01b4e4;');
console.log('%cEjecuta: syncAllContent() para sincronizar todo', 'color: #999;');
