// ============================================
// AtlasCine Main Application
// ============================================
// Note: API config and database are loaded from separate modules
// config.js provides: GEMINI_API_KEY, GEMINI_API_URL, VIDEO_SOURCES, getWeekNumber()
// databases/*.js provide: database array with all content

// Multilingual Support
let currentLanguage = localStorage.getItem('atlascine_language') || 'es';

const translations = {
    es: {
        siteName: 'AtlasCine',
        nav: { home: 'Inicio', movies: 'Películas', series: 'Series', anime: 'Anime', blog: 'Blog', favorites: 'Favoritos', search: 'Buscar películas, series, anime...' },
        home: { weeklyTitle: 'RECOMENDACIONES DE LA SEMANA', trending: '🔥 Lo más visto ahora', hollywood: '🇺🇸 Grandes Producciones de Hollywood', anime: '🎌 Anime Destacado', european: '🇪🇺 Cine Europeo', latin: '🌎 Cine Latinoamericano', asian: '🏮 Cine Asiático', bollywood: '🇮🇳 Bollywood', african: '🌍 Cine Africano', hindi: '🇮🇳 Dramas Hindi', korean: '🇰🇷 K-Dramas', turkish: '🇹🇷 Series Turcas', thai: '🇹🇭 Dramas Tailandeses' },
        sections: { movies: 'Películas', series: 'Series', anime: 'Anime' },
        filters: { language: 'Idioma / Región:', genre: 'Género:', all: 'Todos' },
        player: { changeServer: 'Cambiar Servidor:', server: 'Servidor', adCountdown: 'Anuncio:', skipAd: 'Saltar Anuncio', loading: 'Cargando Servidor' },
        blog: { title: 'Tendencias de Entretenimiento', subtitle: 'Descubre lo que está sucediendo en el mundo del cine, series y entretenimiento', back: 'Volver', generating: 'Generando artículo con IA...', featured: 'Artículos Destacados' },
        news: { title: 'Noticias de la Semana', refresh: 'Actualizar', loading: 'Generando noticias con IA...', updated: 'Noticias actualizadas', error: 'Error al cargar noticias. Por favor, intenta de nuevo más tarde.' }
    },
    ar: {
        siteName: 'أطلس سينما',
        nav: { home: 'الرئيسية', movies: 'أفلام', series: 'مسلسلات', anime: 'أنمي', blog: 'مدونة', favorites: 'المفضلة', search: 'ابحث عن أفلام، مسلسلات، أنمي...' },
        home: { weeklyTitle: 'توصيات الأسبوع', trending: '🔥 الأكثر مشاهدة الآن', hollywood: '🇺🇸 إنتاجات هوليوود الكبرى', anime: '🎌 أنمي مميز', european: '🇪🇺 سينما أوروبية', latin: '🌎 سينما أمريكا اللاتينية', asian: '🏮 سينما آسيوية', bollywood: '🇮🇳 بوليوود', african: '🌍 سينما أفريقية', hindi: '🇮🇳 دراما هندية', korean: '🇰🇷 دراما كورية', turkish: '🇹🇷 مسلسلات تركية', thai: '🇹🇭 دراما تايلاندية' },
        sections: { movies: 'أفلام', series: 'مسلسلات', anime: 'أنمي' },
        filters: { language: 'اللغة / المنطقة:', genre: 'النوع:', all: 'الكل' },
        player: { changeServer: 'تغيير الخادم:', server: 'خادم', adCountdown: 'إعلان:', skipAd: 'تخطي الإعلان', loading: 'جاري التحميل' },
        blog: { title: 'اتجاهات الترفيه', subtitle: 'اكتشف ما يحدث في عالم السينما والمسلسلات والترفيه', back: 'رجوع', generating: 'جاري إنشاء المقال...', featured: 'مقالات مميزة' },
        news: { title: 'أخبار الأسبوع', refresh: 'تحديث', loading: 'جاري إنشاء الأخبار...', updated: 'تم تحديث الأخبار', error: 'خطأ في تحميل الأخبار. يرجى المحاولة مرة أخرى.' }
    },
    fr: {
        siteName: 'AtlasCine',
        nav: { home: 'Accueil', movies: 'Films', series: 'Séries', anime: 'Anime', blog: 'Blog', favorites: 'Favoris', search: 'Rechercher films, séries, anime...' },
        home: { weeklyTitle: 'RECOMMANDATIONS DE LA SEMAINE', trending: '🔥 Les plus regardés', hollywood: '🇺🇸 Productions Hollywood', anime: '🎌 Anime en Vedette', european: '🇪🇺 Cinéma Européen', latin: '🌎 Cinéma Latino-Américain', asian: '🏮 Cinéma Asiatique', bollywood: '🇮🇳 Bollywood', african: '🌍 Cinéma Africain', hindi: '🇮🇳 Dramas Hindi', korean: '🇰🇷 K-Dramas', turkish: '🇹🇷 Séries Turques', thai: '🇹🇭 Dramas Thaïlandais' },
        sections: { movies: 'Films', series: 'Séries', anime: 'Anime' },
        filters: { language: 'Langue / Région:', genre: 'Genre:', all: 'Tous' },
        player: { changeServer: 'Changer de Serveur:', server: 'Serveur', adCountdown: 'Publicité:', skipAd: 'Passer', loading: 'Chargement' },
        blog: { title: 'Tendances Divertissement', subtitle: 'Découvrez ce qui se passe dans le monde du cinéma et des séries', back: 'Retour', generating: 'Génération de l\'article...', featured: 'Articles en Vedette' },
        news: { title: 'Actualités de la Semaine', refresh: 'Actualiser', loading: 'Génération des actualités...', updated: 'Actualités mises à jour', error: 'Erreur lors du chargement des actualités. Veuillez réessayer.' }
    },
    en: {
        siteName: 'AtlasCine',
        nav: { home: 'Home', movies: 'Movies', series: 'Series', anime: 'Anime', blog: 'Blog', favorites: 'Favorites', search: 'Search movies, series, anime...' },
        home: { weeklyTitle: 'WEEKLY RECOMMENDATIONS', trending: '🔥 Trending Now', hollywood: '🇺🇸 Hollywood Blockbusters', anime: '🎌 Featured Anime', european: '🇪🇺 European Cinema', latin: '🌎 Latin American Cinema', asian: '🏮 Asian Cinema', bollywood: '🇮🇳 Bollywood', african: '🌍 African Cinema', hindi: '🇮🇳 Hindi Dramas', korean: '🇰🇷 K-Dramas', turkish: '🇹🇷 Turkish Series', thai: '🇹🇭 Thai Dramas' },
        sections: { movies: 'Movies', series: 'Series', anime: 'Anime' },
        filters: { language: 'Language / Region:', genre: 'Genre:', all: 'All' },
        player: { changeServer: 'Change Server:', server: 'Server', adCountdown: 'Ad:', skipAd: 'Skip Ad', loading: 'Loading Server' },
        blog: { title: 'Entertainment Trends', subtitle: 'Discover what\'s happening in cinema, series and entertainment', back: 'Back', generating: 'Generating article with AI...', featured: 'Featured Articles' },
        news: { title: 'News of the Week', refresh: 'Refresh', loading: 'Generating news with AI...', updated: 'News updated', error: 'Error loading news. Please try again later.' }
    }
};

function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) value = value?.[k];
    return value || key;
}

// ============================================
// Database is loaded from separate source files
// ============================================
// The database variable is populated by:
// - js/databases/hdtoday.js (general content)
// - js/databases/lodynet.js (Hindi & Turkish)
// - js/databases/aradramatv.js (Asian dramas)
// - js/databases/pelisflix.js (streaming originals)
// - js/databases/index.js (combines all with error handling)
//
// If one source fails, others continue working independently

// Database will be available as global variable from databases/index.js

// ============================================
// Application State
// ============================================
let selectedContent = null;
let currentGenreFilter = 'all';

// LocalStorage Functions
function getFavorites() {
    const favs = localStorage.getItem('atlascine_favorites');
    return favs ? JSON.parse(favs) : [];
}

function saveToFavorites(id) {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('atlascine_favorites', JSON.stringify(favorites));
        return true;
    }
    return false;
}

function removeFromFavorites(id) {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem('atlascine_favorites', JSON.stringify(favorites));
        return true;
    }
    return false;
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

// Get weekly recommendations (rotates based on week number)
function getWeeklyRecommendations() {
    const weekNum = getWeekNumber();
    const shuffled = [...database].sort(() => 0.5 - Math.random());
    const startIndex = (weekNum * 8) % database.length;
    return shuffled.slice(startIndex, startIndex + 8);
}

// Change Language Function
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('atlascine_language', lang);

    // Update HTML direction for Arabic (RTL)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update UI translations
    updateUITranslations();

    // Re-render content with language filter
    renderHome();
    renderMovies();
    renderSeries();
    renderAnime();
    generateTrendingTopics();

    showToast(lang === 'es' ? 'Idioma cambiado' : lang === 'ar' ? 'تم تغيير اللغة' : lang === 'fr' ? 'Langue changée' : 'Language changed');
}

// Update UI with translations
function updateUITranslations() {
    // Site name
    document.getElementById('siteLogo').textContent = t('siteName');

    // Navigation links
    const navLinks = document.querySelectorAll('#navLinks .nav-link');
    navLinks[0].textContent = t('nav.home');
    navLinks[1].textContent = t('nav.movies');
    navLinks[2].textContent = t('nav.series');
    navLinks[3].textContent = t('nav.anime');
    navLinks[4].textContent = t('nav.blog');

    // Search placeholder
    document.getElementById('searchInput').placeholder = t('nav.search');

    // Section titles
    const moviesTitle = document.querySelector('#movies h1');
    const seriesTitle = document.querySelector('#series h1');
    const animeTitle = document.querySelector('#anime h1');
    if (moviesTitle) moviesTitle.textContent = t('sections.movies');
    if (seriesTitle) seriesTitle.textContent = t('sections.series');
    if (animeTitle) animeTitle.textContent = t('sections.anime');

    // Blog section
    const blogMainTitle = document.getElementById('blogMainTitle');
    const blogSubtitleEl = document.getElementById('blogSubtitle');
    const topicsTitle = document.getElementById('topicsTitle');
    const blogBackText = document.getElementById('blogBackText');
    const blogLoadingText = document.getElementById('blogLoadingText');
    if (blogMainTitle) blogMainTitle.textContent = t('blog.title');
    if (blogSubtitleEl) blogSubtitleEl.textContent = t('blog.subtitle');
    if (topicsTitle) topicsTitle.innerHTML = `<span style="font-size: 32px;">🔥</span><span>${t('blog.featured')}</span>`;
    if (blogBackText) blogBackText.textContent = t('blog.back');
    if (blogLoadingText) blogLoadingText.textContent = t('blog.generating');

    // News feed
    const newsTitle = document.getElementById('newsTitle');
    const newsRefreshText = document.getElementById('newsRefreshText');
    const newsLoadingText = document.getElementById('newsLoadingText');
    if (newsTitle) newsTitle.innerHTML = `📰 <span>${t('news.title')}</span>`;
    if (newsRefreshText) newsRefreshText.textContent = t('news.refresh');
    if (newsLoadingText) newsLoadingText.textContent = t('news.loading');

    // Update language selector
    document.getElementById('languageSelector').value = currentLanguage;
}

// Filter content based on language
function getFilteredContent() {
    if (currentLanguage === 'ar') {
        // For Arabic, prioritize Arabic audience content (Hindi, Korean, Turkish, Thai)
        return database.filter(i =>
            i.language === 'Hindi' ||
            i.language === 'Coreano' ||
            i.language === 'Turco' ||
            i.language === 'Tailandés' ||
            i.language === 'Japonés' ||
            i.language === 'Chino' ||
            i.region === 'India' ||
            i.region === 'Asia'
        );
    }
    // For other languages, show all content
    return database;
}

// Initialize App Function - Called after Firebase loads data
function initializeApp() {
    console.log('🚀 Inicializando AtlasCine App...');

    // Verificar que database esté disponible
    if (!window.database || window.database.length === 0) {
        console.warn('⚠️ Database aún no está cargado, esperando...');
        // Reintentar después de 1 segundo
        setTimeout(initializeApp, 1000);
        return;
    }

    console.log(`✅ Database disponible: ${window.database.length} items`);

    // Set initial language
    const savedLang = localStorage.getItem('atlascine_language') || 'es';
    currentLanguage = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
    document.getElementById('languageSelector').value = savedLang;

    updateUITranslations();
    renderHome();
    renderMovies();
    renderSeries();
    renderAnime();
    renderProducerRows(); // Render streaming platform content
    setupNavigation();
    setupSearch();
    setupGenreFilters();
    setupScrollNav();
    generateTrendingTopics();
    loadNewsFeed(); // Load weekly entertainment news

    console.log('🎉 AtlasCine listo!');
}

// Hacer la función disponible globalmente
window.initializeApp = initializeApp;

// Render Home sections
function renderHome() {
    const content = getFilteredContent();

    const weekly = getWeeklyRecommendations();
    const trending = content.filter(i => i.rating >= 90).slice(0, 10);
    const hollywood = content.filter(i => i.region === 'US' && i.type === 'movie').slice(0, 10);
    const anime = content.filter(i => i.type === 'anime').slice(0, 10);
    const european = content.filter(i => i.region === 'EU').slice(0, 8);
    const latin = content.filter(i => i.region === 'LatAm').slice(0, 8);
    const asian = content.filter(i => i.region === 'Asia' && i.type === 'movie').slice(0, 8);
    const bollywood = content.filter(i => i.region === 'India' && !i.language).slice(0, 8);
    const african = content.filter(i => i.region === 'Africa').slice(0, 8);

    // New language-specific rows for Arabic audience
    const hindi = content.filter(i => i.language === 'Hindi').slice(0, 10);
    const korean = content.filter(i => i.language === 'Coreano').slice(0, 10);
    const turkish = content.filter(i => i.language === 'Turco').slice(0, 10);
    const thai = content.filter(i => i.language === 'Tailandés').slice(0, 10);

    document.getElementById('weeklyRow').innerHTML = weekly.map(createCard).join('');
    document.getElementById('trendingRow').innerHTML = trending.map(createCard).join('');
    document.getElementById('hollywoodRow').innerHTML = hollywood.map(createCard).join('');
    document.getElementById('animeHomeRow').innerHTML = anime.map(createCard).join('');
    document.getElementById('europeanRow').innerHTML = european.map(createCard).join('');
    document.getElementById('latinRow').innerHTML = latin.map(createCard).join('');
    document.getElementById('asianRow').innerHTML = asian.map(createCard).join('');
    document.getElementById('bollywoodRow').innerHTML = bollywood.map(createCard).join('');
    document.getElementById('africanRow').innerHTML = african.map(createCard).join('');

    // Populate new language rows
    if (document.getElementById('hindiRow')) {
        document.getElementById('hindiRow').innerHTML = hindi.map(createCard).join('');
    }
    if (document.getElementById('koreanRow')) {
        document.getElementById('koreanRow').innerHTML = korean.map(createCard).join('');
    }
    if (document.getElementById('turkishRow')) {
        document.getElementById('turkishRow').innerHTML = turkish.map(createCard).join('');
    }
    if (document.getElementById('thaiRow')) {
        document.getElementById('thaiRow').innerHTML = thai.map(createCard).join('');
    }
}

// Global filter state
let currentMovieGenre = 'all';
let currentMovieLanguage = 'all';
let currentSeriesGenre = 'all';
let currentSeriesLanguage = 'all';

// Render Movies
function renderMovies(genre = currentMovieGenre, language = currentMovieLanguage) {
    currentMovieGenre = genre;
    currentMovieLanguage = language;

    const content = getFilteredContent();
    let movies = content.filter(i => i.type === 'movie');

    if (genre !== 'all') {
        movies = movies.filter(i => i.genre.includes(genre));
    }

    if (language !== 'all') {
        movies = movies.filter(i => i.language === language);
    }

    document.getElementById('moviesGrid').innerHTML = movies.map(createCard).join('');
}

// Render Series
function renderSeries(genre = currentSeriesGenre, language = currentSeriesLanguage) {
    currentSeriesGenre = genre;
    currentSeriesLanguage = language;

    const content = getFilteredContent();
    let series = content.filter(i => i.type === 'series');

    if (genre !== 'all') {
        series = series.filter(i => i.genre.includes(genre));
    }

    if (language !== 'all') {
        series = series.filter(i => i.language === language);
    }

    document.getElementById('seriesGrid').innerHTML = series.map(createCard).join('');
}

// Render Anime
function renderAnime(genre = 'all') {
    const content = getFilteredContent();
    const anime = genre === 'all'
        ? content.filter(i => i.type === 'anime')
        : content.filter(i => i.type === 'anime' && i.genre.includes(genre));
    document.getElementById('animeGrid').innerHTML = anime.map(createCard).join('');
}

// Render Producer Rows (Netflix, Amazon, Disney+, etc.)
function renderProducerRows() {
    const producers = {
        'Netflix': 'netflixRow',
        'Amazon': 'amazonRow',
        'Disney': 'disneyRow',
        'HBO': 'hboRow',
        'Hulu': 'huluRow',
        'Fox': 'foxRow'
    };

    Object.entries(producers).forEach(([producer, rowId]) => {
        const producerContent = database.filter(i => i.producer === producer);
        const rowElement = document.getElementById(rowId);

        if (rowElement) {
            if (producerContent.length > 0) {
                rowElement.innerHTML = producerContent.slice(0, 10).map(createCard).join('');
            } else {
                // Show placeholder if no content available
                rowElement.innerHTML = `
                    <div style="padding: 40px; text-align: center; color: rgba(255,255,255,0.5);">
                        <p>Contenido próximamente...</p>
                    </div>
                `;
            }
        }
    });
}

// Create Card with Favorite Icon
function createCard(item) {
    const favClass = isFavorite(item.id) ? 'active' : '';
    const heartIcon = isFavorite(item.id) ? '❤️' : '🤍';

    return `
        <div class="card" onclick="openModal(${item.id})">
            <img src="${item.thumbnail}" alt="${item.title}">
            <div class="fav-icon ${favClass}" onclick="event.stopPropagation(); toggleFavorite(${item.id})">
                ${heartIcon}
            </div>
            <div class="card-overlay">
                <div style="font-weight: 700; margin-bottom: 4px;">${item.title}</div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                    <span>⭐ ${item.rating}%</span>
                    <span>${item.year}</span>
                </div>
            </div>
        </div>
    `;
}

// Toggle Favorite
function toggleFavorite(id) {
    const item = database.find(i => i.id === id);
    if (!item) return;

    if (isFavorite(id)) {
        removeFromFavorites(id);
        showToast(`${item.title} eliminada de favoritos`);
    } else {
        saveToFavorites(id);
        showToast(`${item.title} añadida a favoritos`);
    }

    // Re-render current section
    renderHome();
    renderMovies(currentGenreFilter);
    renderSeries(currentGenreFilter);
    renderAnime(currentGenreFilter);
}

// Open Modal
function openModal(id) {
    selectedContent = database.find(i => i.id === id);
    if (!selectedContent) return;

    document.getElementById('modalHero').style.backgroundImage = `url(${selectedContent.thumbnail})`;
    document.getElementById('modalTitle').textContent = selectedContent.title;
    document.getElementById('modalRating').innerHTML = `⭐ ${selectedContent.rating}%`;
    document.getElementById('modalYear').textContent = selectedContent.year;
    document.getElementById('modalCountry').textContent = selectedContent.country;
    document.getElementById('modalDescription').textContent = selectedContent.description;

    const genresHTML = selectedContent.genre.map(g =>
        `<span class="badge" style="background: rgba(255,255,255,0.1);">${g}</span>`
    ).join('');
    document.getElementById('modalGenres').innerHTML = genresHTML;

    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = 'auto';

    // Clean up video player if exists
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.remove();
    }
}

// Estado global del reproductor
window.playerState = {
    season: 1,
    episode: 1,
    serverIndex: 0
};

// Play Content - Mejorado con soporte para series (temporadas/episodios)
function playContent() {
    if (!selectedContent || !selectedContent.tmdbId) return;

    closeModal();

    const isSeries = selectedContent.type === 'series' || selectedContent.type === 'anime';
    const videoType = isSeries ? 'tv' : 'movie';

    // Reset player state
    window.playerState = { season: 1, episode: 1, serverIndex: 0 };

    // Create video modal
    const videoModal = document.createElement('div');
    videoModal.id = 'videoModal';
    videoModal.className = 'modal active';
    videoModal.innerHTML = `
        <div class="modal-content" style="max-width: 1400px; max-height: 95vh; overflow-y: auto;">
            <button onclick="closeVideoPlayer()" style="position: absolute; top: 15px; right: 15px; z-index: 100; background: rgba(0,0,0,0.8); border: none; color: #fff; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 24px;">×</button>

            <!-- Header con titulo -->
            <div style="padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px 12px 0 0;">
                <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                    <img src="${selectedContent.thumbnail}" alt="${selectedContent.title}" style="width: 80px; height: 120px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">${selectedContent.title}</h2>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                            <span style="background: #e50914; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">${selectedContent.year}</span>
                            <span style="color: rgba(255,255,255,0.7); font-size: 13px;">⭐ ${selectedContent.rating}%</span>
                            <span style="color: rgba(255,255,255,0.5); font-size: 13px;">${selectedContent.country}</span>
                            ${isSeries ? '<span style="background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; font-size: 12px;">📺 Serie</span>' : '<span style="background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; font-size: 12px;">🎬 Película</span>'}
                            <a href="${DIRECT_LINK_URL}" target="_blank" style="background: #28a745; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                                ⬇️ Descargar
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Selector de Temporada/Episodio (solo para series) -->
            ${isSeries ? `
            <div style="padding: 15px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <label style="color: rgba(255,255,255,0.7); font-size: 14px;">📅 Temporada:</label>
                        <select id="seasonSelect" onchange="updateEpisodeSelector()" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 15px; border-radius: 6px; font-size: 14px; cursor: pointer;">
                            ${generateSeasonOptions(10)}
                        </select>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <label style="color: rgba(255,255,255,0.7); font-size: 14px;">🎬 Episodio:</label>
                        <select id="episodeSelect" onchange="loadEpisode()" style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 15px; border-radius: 6px; font-size: 14px; cursor: pointer;">
                            ${generateEpisodeOptions(24)}
                        </select>
                    </div>
                    <button onclick="loadEpisode()" style="background: #e50914; border: none; color: #fff; padding: 8px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                        ▶ Reproducir
                    </button>
                </div>
            </div>
            ` : ''}

            <!-- Selector de Servidores -->
            <div style="padding: 15px 20px; background: rgba(0,0,0,0.2);" id="serverSelection">
                <p style="margin-bottom: 12px; font-size: 13px; color: rgba(255,255,255,0.6);">🖥️ Selecciona servidor:</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                    <button onclick="changeServer(0)" class="server-btn active" data-server="0">
                        <span style="font-size: 16px;">🌐</span> VidSrc
                    </button>
                    <button onclick="changeServer(1)" class="server-btn" data-server="1">
                        <span style="font-size: 16px;">🚀</span> VidSrc Pro
                    </button>
                    <button onclick="changeServer(2)" class="server-btn" data-server="2">
                        <span style="font-size: 16px;">🔒</span> EmbedSu
                    </button>
                </div>
                <div style="margin-top: 12px; padding: 10px; background: rgba(229,9,20,0.1); border-left: 3px solid #e50914; border-radius: 4px;">
                    <p style="font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 5px;">
                        💡 <strong>Si el video no carga:</strong>
                    </p>
                    <ul style="font-size: 10px; color: rgba(255,255,255,0.6); margin-left: 15px; line-height: 1.6;">
                        <li>Prueba cambiar de servidor (botones arriba)</li>
                        <li>Abre la consola del navegador (F12) y revisa los mensajes</li>
                        <li>Verifica que tu navegador permita iframes de sitios externos</li>
                        <li>Algunos servidores pueden tardar 10-30 segundos en cargar</li>
                    </ul>
                </div>
            </div>

            <!-- Ad Banner Space -->
            <div id="adBannerSpace" style="width: 100%; min-height: 70px; background: linear-gradient(90deg, #0f0f23 0%, #1a1a2e 100%); display: flex; align-items: center; justify-content: center; gap: 12px; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span style="font-size: 20px;">📢</span>
                <p style="color: rgba(255,255,255,0.4); font-size: 12px;">Espacio publicitario - PropellerAds</p>
            </div>

            <!-- Video Player -->
            <div class="video-player" style="background: #000;">
                <div class="video-container" id="videoContainer">
                    <iframe
                        id="mainVideo"
                        width="100%"
                        height="100%"
                        src=""
                        frameborder="0"
                        allowfullscreen
                        allow="autoplay; encrypted-media; picture-in-picture"
                    ></iframe>
                </div>
            </div>

            <!-- Controles rapidos para series -->
            ${isSeries ? `
            <div style="padding: 15px 20px; background: rgba(0,0,0,0.3); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <button onclick="prevEpisode()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    ⬅️ Episodio Anterior
                </button>
                <span id="currentEpisodeLabel" style="color: rgba(255,255,255,0.7); font-size: 14px;">T1 E1</span>
                <button onclick="nextEpisode()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    Siguiente Episodio ➡️
                </button>
            </div>
            ` : ''}
        </div>
    `;

    document.body.appendChild(videoModal);
    document.body.style.overflow = 'hidden';

    // Add styles
    addPlayerStyles();

    // Add iframe error handling
    setupIframeErrorHandling();

    // Load content
    if (isSeries) {
        loadEpisode();
    } else {
        loadMovie();
    }
}

// Generar opciones de temporadas
function generateSeasonOptions(maxSeasons) {
    let options = '';
    for (let i = 1; i <= maxSeasons; i++) {
        options += `<option value="${i}">Temporada ${i}</option>`;
    }
    return options;
}

// Generar opciones de episodios
function generateEpisodeOptions(maxEpisodes) {
    let options = '';
    for (let i = 1; i <= maxEpisodes; i++) {
        options += `<option value="${i}">Episodio ${i}</option>`;
    }
    return options;
}

// Actualizar selector de episodios cuando cambia la temporada
function updateEpisodeSelector() {
    window.playerState.season = parseInt(document.getElementById('seasonSelect').value);
    window.playerState.episode = 1;
    document.getElementById('episodeSelect').value = 1;
}

// Cargar episodio de serie
function loadEpisode() {
    const season = document.getElementById('seasonSelect')?.value || 1;
    const episode = document.getElementById('episodeSelect')?.value || 1;

    window.playerState.season = parseInt(season);
    window.playerState.episode = parseInt(episode);

    updateVideoSource();
    updateEpisodeLabel();
}

// Cargar película
function loadMovie() {
    updateVideoSource();
}

// Actualizar fuente del video
function updateVideoSource() {
    const mainVideo = document.getElementById('mainVideo');
    if (!mainVideo || !selectedContent) {
        console.error('❌ No se encontró el iframe o no hay contenido seleccionado');
        return;
    }

    // Validar tmdbId
    if (!selectedContent.tmdbId) {
        console.error('❌ El contenido no tiene tmdbId:', selectedContent);
        showToast('Error: Contenido sin ID válido');
        return;
    }

    const isSeries = selectedContent.type === 'series' || selectedContent.type === 'anime';
    const videoType = isSeries ? 'tv' : 'movie';
    const serverIndex = window.playerState.serverIndex;

    let url;
    if (isSeries) {
        const s = window.playerState.season;
        const e = window.playerState.episode;

        // URLs con temporada y episodio (3 servidores seguros y confiables)
        const sources = [
            `https://vidsrc.xyz/embed/${videoType}/${selectedContent.tmdbId}/${s}/${e}`,
            `https://vidsrc.to/embed/${videoType}/${selectedContent.tmdbId}/${s}/${e}`,
            `https://embed.su/embed/${videoType}/${selectedContent.tmdbId}/${s}/${e}`
        ];
        url = sources[serverIndex] || sources[0];
    } else {
        // URLs para películas (3 servidores seguros y confiables)
        const sources = [
            `https://vidsrc.xyz/embed/${videoType}/${selectedContent.tmdbId}`,
            `https://vidsrc.to/embed/${videoType}/${selectedContent.tmdbId}`,
            `https://embed.su/embed/${videoType}/${selectedContent.tmdbId}`
        ];
        url = sources[serverIndex] || sources[0];
    }

    console.log('🎬 Cargando video:', {
        title: selectedContent.title,
        type: videoType,
        tmdbId: selectedContent.tmdbId,
        server: serverIndex + 1,
        url: url
    });

    mainVideo.src = url;
    showToast(`Cargando Servidor ${serverIndex + 1}...`);
}

// Actualizar label del episodio actual
function updateEpisodeLabel() {
    const label = document.getElementById('currentEpisodeLabel');
    if (label) {
        label.textContent = `T${window.playerState.season} E${window.playerState.episode}`;
    }
}

// Episodio anterior
function prevEpisode() {
    if (window.playerState.episode > 1) {
        window.playerState.episode--;
        document.getElementById('episodeSelect').value = window.playerState.episode;
        loadEpisode();
    } else if (window.playerState.season > 1) {
        window.playerState.season--;
        window.playerState.episode = 24; // Ultimo episodio de la temporada anterior
        document.getElementById('seasonSelect').value = window.playerState.season;
        document.getElementById('episodeSelect').value = window.playerState.episode;
        loadEpisode();
    }
}

// Siguiente episodio
function nextEpisode() {
    if (window.playerState.episode < 24) {
        window.playerState.episode++;
        document.getElementById('episodeSelect').value = window.playerState.episode;
        loadEpisode();
    } else if (window.playerState.season < 10) {
        window.playerState.season++;
        window.playerState.episode = 1;
        document.getElementById('seasonSelect').value = window.playerState.season;
        document.getElementById('episodeSelect').value = 1;
        loadEpisode();
    }
}

// Agregar estilos del reproductor
function addPlayerStyles() {
    if (document.getElementById('playerStyles')) return;

    const style = document.createElement('style');
    style.id = 'playerStyles';
    style.textContent = `
        .server-btn {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .server-btn:hover {
            background: rgba(229,9,20,0.3);
            border-color: #e50914;
        }
        .server-btn.active {
            background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
            border-color: #e50914;
        }
        #videoModal select {
            background: #1a1a1a !important;
            color: #fff !important;
        }
        #videoModal select option {
            background: #1a1a1a;
            color: #fff;
        }
    `;
    document.head.appendChild(style);
}

// Setup iframe error handling
function setupIframeErrorHandling() {
    const mainVideo = document.getElementById('mainVideo');
    if (!mainVideo) return;

    let loadTimeout;

    // Detectar cuando el iframe carga correctamente
    mainVideo.addEventListener('load', function() {
        console.log('✅ Iframe cargado');
        clearTimeout(loadTimeout);
    });

    // Detectar errores del iframe
    mainVideo.addEventListener('error', function() {
        console.error('❌ Error al cargar el iframe');
        showToast('Error al cargar el video. Prueba otro servidor.');
    });

    // Timeout para detectar si el iframe no carga en 30 segundos
    loadTimeout = setTimeout(function() {
        console.warn('⚠️ El iframe está tardando mucho en cargar');

        // Mostrar mensaje de ayuda al usuario
        const videoContainer = document.getElementById('videoContainer');
        if (videoContainer && !videoContainer.querySelector('.iframe-loading-warning')) {
            const warning = document.createElement('div');
            warning.className = 'iframe-loading-warning';
            warning.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.9); color: #fff; padding: 30px; border-radius: 12px; text-align: center; z-index: 999; max-width: 500px;';
            warning.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 15px;">⏳</div>
                <h3 style="margin-bottom: 15px; font-size: 20px;">El video está tardando en cargar</h3>
                <p style="color: rgba(255,255,255,0.7); margin-bottom: 20px; line-height: 1.6;">
                    Esto puede deberse a tu conexión o a que el servidor está lento.<br>
                    Prueba cambiar de servidor o espera un momento más.
                </p>
                <button onclick="this.parentElement.remove()" style="background: #e50914; border: none; color: #fff; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Entendido
                </button>
            `;
            videoContainer.style.position = 'relative';
            videoContainer.appendChild(warning);
        }
    }, 30000);
}

// Change server manually
function changeServer(serverIndex) {
    // Update active button
    document.querySelectorAll('.server-btn').forEach((btn, idx) => {
        if (idx === serverIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update player state and reload
    window.playerState.serverIndex = serverIndex;
    updateVideoSource();
}

// Close Video Player
function closeVideoPlayer() {
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.remove();
    }
    document.body.style.overflow = 'auto';
}

// Add to List (Favorites)
function addToList() {
    if (selectedContent) {
        if (saveToFavorites(selectedContent.id)) {
            showToast(`${selectedContent.title} añadida a Mi Lista`);
        } else {
            showToast(`${selectedContent.title} ya está en Mi Lista`);
        }
    }
}

// Show Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Setup Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');

            window.scrollTo(0, 0);
        });
    });
}

// Setup Search
function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) return;

        const results = database.filter(i =>
            i.title.toLowerCase().includes(query) ||
            i.genre.some(g => g.toLowerCase().includes(query)) ||
            i.country.toLowerCase().includes(query)
        );

        document.getElementById('moviesGrid').innerHTML = results.map(createCard).join('');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('[data-section="movies"]').classList.add('active');
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        document.getElementById('movies').classList.add('active');
    });
}

// Setup Genre Filters
function setupGenreFilters() {
    // Movies - Genre Filters
    document.querySelectorAll('#movieGenres .genre-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#movieGenres .genre-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderMovies(pill.dataset.genre, currentMovieLanguage);
        });
    });

    // Movies - Language Filters
    document.querySelectorAll('#movieLanguages .genre-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#movieLanguages .genre-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderMovies(currentMovieGenre, pill.dataset.language);
        });
    });

    // Series - Genre Filters
    document.querySelectorAll('#seriesGenres .genre-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#seriesGenres .genre-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderSeries(pill.dataset.genre, currentSeriesLanguage);
        });
    });

    // Series - Language Filters
    document.querySelectorAll('#seriesLanguages .genre-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#seriesLanguages .genre-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderSeries(currentSeriesGenre, pill.dataset.language);
        });
    });

    // Anime
    document.querySelectorAll('#animeGenres .genre-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#animeGenres .genre-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentGenreFilter = pill.dataset.genre;
            renderAnime(currentGenreFilter);
        });
    });
}

// Scroll Nav Background
function setupScrollNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Generate Blog with Gemini
// Generate Entertainment Trending Topics automatically - Multilingual
function generateTrendingTopics() {
    const topicsTranslations = {
        es: [
            { emoji: '🔥', title: 'Boom de K-Dramas y Doramas', description: 'Explorando el fenómeno global de las series coreanas, japonesas y asiáticas', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { emoji: '🎬', title: 'Cine de Bollywood y Tollywood', description: 'El auge global del cine hindi y su influencia internacional', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { emoji: '🌍', title: 'Series Turcas: Conquista Mundial', description: 'Cómo las series turcas cautivan audiencias globales', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { emoji: '📺', title: 'El Futuro del Streaming', description: 'Tendencias 2025: contenido internacional y nuevos formatos', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
            { emoji: '🎌', title: 'Anime: De Nicho a Mainstream', description: 'El anime domina el entretenimiento global', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
            { emoji: '🏆', title: 'Premios y Diversidad Global', description: 'Oscars, Emmys y el reconocimiento al cine mundial', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
        ],
        ar: [
            { emoji: '🔥', title: 'انتشار الدراما الكورية والآسيوية', description: 'استكشاف ظاهرة المسلسلات الكورية واليابانية العالمية', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { emoji: '🎬', title: 'سينما بوليوود وتوليوود', description: 'صعود السينما الهندية وتأثيرها الدولي', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { emoji: '🌍', title: 'المسلسلات التركية: غزو عالمي', description: 'كيف أسرت المسلسلات التركية الجماهير العالمية', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { emoji: '📺', title: 'مستقبل البث المباشر', description: 'اتجاهات 2025: المحتوى الدولي والأشكال الجديدة', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
            { emoji: '🎌', title: 'الأنمي: من الهامش إلى القمة', description: 'الأنمي يهيمن على الترفيه العالمي', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
            { emoji: '🏆', title: 'الجوائز والتنوع العالمي', description: 'الأوسكار والإيمي واعتراف بالسينما العالمية', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
        ],
        en: [
            { emoji: '🔥', title: 'K-Drama & Asian Drama Boom', description: 'Exploring the global phenomenon of Korean and Asian series', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { emoji: '🎬', title: 'Bollywood & Tollywood Cinema', description: 'The global rise of Hindi cinema and its influence', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { emoji: '🌍', title: 'Turkish Series: Global Conquest', description: 'How Turkish dramas captivate worldwide audiences', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { emoji: '📺', title: 'The Future of Streaming', description: '2025 trends: international content and new formats', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
            { emoji: '🎌', title: 'Anime: From Niche to Mainstream', description: 'Anime dominates global entertainment', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
            { emoji: '🏆', title: 'Awards & Global Diversity', description: 'Oscars, Emmys and world cinema recognition', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
        ],
        fr: [
            { emoji: '🔥', title: 'Boom des K-Dramas et Doramas', description: 'Explorer le phénomène mondial des séries coréennes et asiatiques', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { emoji: '🎬', title: 'Cinéma Bollywood et Tollywood', description: 'L\'essor mondial du cinéma hindi et son influence', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { emoji: '🌍', title: 'Séries Turques: Conquête Mondiale', description: 'Comment les séries turques captivent le monde', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { emoji: '📺', title: 'L\'Avenir du Streaming', description: 'Tendances 2025: contenu international et nouveaux formats', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
            { emoji: '🎌', title: 'Anime: Du Niche au Mainstream', description: 'L\'anime domine le divertissement mondial', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
            { emoji: '🏆', title: 'Prix et Diversité Mondiale', description: 'Oscars, Emmys et reconnaissance du cinéma mondial', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
        ]
    };

    const trendingTopics = topicsTranslations[currentLanguage] || topicsTranslations.es;
    const topicsGrid = document.getElementById('trendingTopicsGrid');
    if (!topicsGrid) return;

    topicsGrid.innerHTML = trendingTopics.map((topic, index) => `
        <div class="topic-card" data-topic-index="${index}">
            <div class="topic-card-bg" style="background: ${topic.gradient};">
                <div class="topic-card-emoji">${topic.emoji}</div>
                <h3 class="topic-card-title">${topic.title}</h3>
                <p class="topic-card-desc">${topic.description}</p>
            </div>
            <div class="topic-card-arrow">→</div>
        </div>
    `).join('');

    // Add click event listeners
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => {
            const topicIndex = parseInt(card.dataset.topicIndex);
            const topic = trendingTopics[topicIndex];
            if (topic) {
                generateTrendingBlog(topic.title, `Write a detailed article about: ${topic.title}. ${topic.description}`);
            }
        });
    });
}

// Generate Blog Article from Trending Topic
async function generateTrendingBlog(title, prompt) {
    const topicsGrid = document.getElementById('trendingTopicsGrid');
    const blogLoading = document.getElementById('blogLoading');
    const articleContent = document.getElementById('articleContent');
    const blogArticle = document.getElementById('blogArticle');

    if (!topicsGrid || !blogLoading || !articleContent || !blogArticle) {
        console.error('Blog elements not found');
        return;
    }

    topicsGrid.style.display = 'none';
    blogLoading.style.display = 'block';

    try {
        console.log('Generating blog article for:', title);

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Response Error:', errorData);
            throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        // Check if response has the expected structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
            console.error('Unexpected API response:', data);
            throw new Error('Invalid API response structure');
        }

        const text = data.candidates[0].content.parts[0].text;

        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff;">$1</strong>')
            .replace(/\n\n/g, '</p><p style="margin-bottom: 16px;">')
            .replace(/^# (.*?)$/gm, '<h2 style="font-size: 32px; font-weight: 800; margin: 32px 0 16px;">$1</h2>')
            .replace(/^## (.*?)$/gm, '<h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">$1</h3>')
            .replace(/^### (.*?)$/gm, '<h4 style="font-size: 20px; font-weight: 600; margin: 20px 0 10px;">$1</h4>');

        articleContent.innerHTML = `<p style="margin-bottom: 16px;">${formatted}</p>`;
        blogLoading.style.display = 'none';
        blogArticle.style.display = 'block';

        console.log('Blog article generated successfully');

    } catch (error) {
        console.error('Error generating blog article:', error);
        blogLoading.style.display = 'none';

        // Show fallback article instead of error
        const fallbackArticle = getFallbackArticle(title);
        articleContent.innerHTML = fallbackArticle;
        blogArticle.style.display = 'block';

        showToast('Mostrando artículo guardado');
    }
}

// Fallback articles when API fails
function getFallbackArticle(title) {
    const articles = {
        'Boom de K-Dramas y Doramas': `
            <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 24px;">El Fenómeno Global de los K-Dramas</h2>
            <p style="margin-bottom: 16px;">Los K-Dramas han experimentado un crecimiento exponencial en popularidad mundial durante los últimos años. Lo que comenzó como un fenómeno regional asiático se ha convertido en una fuerza dominante en el entretenimiento global.</p>
            <h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">El Impacto de Squid Game</h3>
            <p style="margin-bottom: 16px;"><strong style="color: #fff;">Squid Game</strong> marcó un antes y un después en la historia del streaming. La serie de Netflix se convirtió en el contenido más visto de la plataforma, demostrando que las historias coreanas pueden resonar con audiencias de todo el mundo.</p>
            <h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">Plataformas y Accesibilidad</h3>
            <p style="margin-bottom: 16px;">Netflix, Viki, y otras plataformas han invertido millones en contenido coreano, haciendo que estos dramas sean más accesibles que nunca. Los subtítulos en múltiples idiomas han eliminado barreras lingüísticas.</p>
            <h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">Series Recomendadas</h3>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">All of Us Are Dead</strong> - Zombies en un instituto coreano</p>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">Taxi Driver</strong> - Justicia por cuenta propia</p>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">Sweet Home</strong> - Terror y supervivencia</p>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">Crash Landing on You</strong> - Romance entre dos Coreas</p>
        `,
        'Cine de Bollywood y Tollywood': `
            <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 24px;">El Poder del Cine Indio</h2>
            <p style="margin-bottom: 16px;">Bollywood produce más de 1,500 películas al año, convirtiéndose en la industria cinematográfica más prolífica del mundo. Pero más allá de los números, es la calidad y el impacto emocional lo que ha conquistado audiencias globales.</p>
            <h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">RRR: Un Fenómeno Global</h3>
            <p style="margin-bottom: 16px;"><strong style="color: #fff;">RRR</strong> ganó el Oscar a Mejor Canción Original con "Naatu Naatu", llevando el cine indio a los escenarios más prestigiosos de Hollywood. La película demostró que las producciones indias pueden competir a nivel mundial.</p>
            <h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">Clásicos Imperdibles</h3>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">3 Idiots</strong> - Comedia con mensaje profundo</p>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">Baahubali</strong> - Épica fantasía india</p>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">Dangal</strong> - Lucha y empoderamiento</p>
            <p style="margin-bottom: 16px;">• <strong style="color: #fff;">PK</strong> - Sátira social brillante</p>
        `,
        'default': `
            <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 24px;">${title}</h2>
            <p style="margin-bottom: 16px;">El entretenimiento global está en constante evolución. Cada día, nuevas producciones de diferentes partes del mundo capturan la atención de millones de espectadores.</p>
            <h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">La Era del Streaming</h3>
            <p style="margin-bottom: 16px;">Las plataformas de streaming han democratizado el acceso al contenido internacional. Ya no es necesario esperar años para ver las últimas producciones de Corea, India, Turquía o Japón.</p>
            <h3 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px;">Diversidad Cultural</h3>
            <p style="margin-bottom: 16px;">La diversidad en el entretenimiento enriquece nuestra experiencia como espectadores. Cada cultura aporta perspectivas únicas, estilos narrativos distintivos y emociones universales que nos conectan como humanidad.</p>
            <p style="margin-bottom: 16px;">En AtlasCine, celebramos esta diversidad ofreciéndote lo mejor del cine y las series de todo el mundo.</p>
        `
    };

    return articles[title] || articles['default'];
}

// Close Blog
function closeBlog() {
    document.getElementById('blogArticle').style.display = 'none';
    document.getElementById('trendingTopicsGrid').style.display = 'grid';
}

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeVideoPlayer();
        closeFooterModal();
    }
});

// Footer Functions

// Footer Pages Content
const footerPages = {
    press: {
        title: 'Prensa',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">Sala de Prensa AtlasCine</h3>
            <p>Bienvenidos al centro de prensa de AtlasCine. Aquí encontrarás recursos para medios de comunicación, bloggers y periodistas.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Sobre AtlasCine</h3>
            <p>AtlasCine es una plataforma de streaming gratuita que ofrece contenido internacional diverso: películas de Hollywood, K-Dramas coreanos, anime japonés, series turcas, Bollywood y cine latinoamericano.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Recursos de Marca</h3>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>Logo oficial de AtlasCine</li>
                <li>Guía de estilo de marca</li>
                <li>Imágenes promocionales</li>
                <li>Kit de prensa descargable</li>
            </ul>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Contacto de Prensa</h3>
            <p><strong>Email:</strong> press@atlascine.com</p>
            <p>Respondemos a consultas de medios en un plazo de 24-48 horas.</p>
        `
    },
    careers: {
        title: 'Trabaja con Nosotros',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">Únete al Equipo AtlasCine</h3>
            <p>En AtlasCine estamos construyendo el futuro del entretenimiento digital. Buscamos personas apasionadas por el cine, la tecnología y la diversidad cultural.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Cultura de Trabajo</h3>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>🌍 Equipo internacional y remoto</li>
                <li>🎬 Pasión por el cine de todo el mundo</li>
                <li>💡 Innovación constante</li>
                <li>🤝 Ambiente colaborativo</li>
            </ul>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Áreas de Interés</h3>
            <p>Siempre buscamos talento en:</p>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>Desarrollo Web (Frontend/Backend)</li>
                <li>Diseño UX/UI</li>
                <li>Curación de Contenido</li>
                <li>Marketing Digital</li>
                <li>Community Management</li>
            </ul>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Interesado?</h3>
            <p>Envía tu CV y portfolio a: <strong>careers@atlascine.com</strong></p>
        `
    },
    about: {
        title: 'Sobre Nosotros',
        content: `
            <p><strong>AtlasCine</strong> es tu destino definitivo para descubrir las mejores películas, series y anime de todo el mundo.</p>

            <p>Fundada con la pasión por el cine internacional, nuestra misión es acercar a los espectadores contenido de calidad de todos los rincones del planeta. Desde las grandes producciones de Hollywood hasta joyas ocultas del cine independiente europeo, pasando por el fascinante mundo del anime japonés y las producciones latinoamericanas.</p>

            <p><strong>Nuestra Misión:</strong> Democratizar el acceso al entretenimiento audiovisual global, ofreciendo una plataforma intuitiva donde puedas explorar, descubrir y disfrutar contenido diverso sin barreras.</p>

            <p><strong>Nuestros Valores:</strong></p>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>🌍 <strong>Diversidad Cultural:</strong> Celebramos el cine de todas las culturas</li>
                <li>✨ <strong>Calidad:</strong> Solo el mejor contenido seleccionado</li>
                <li>🔄 <strong>Actualización Constante:</strong> Nuevas recomendaciones cada semana</li>
                <li>👥 <strong>Comunidad:</strong> Construyendo una comunidad global de cinéfilos</li>
            </ul>
        `
    },
    privacy: {
        title: 'Política de Privacidad',
        content: `
            <p><strong>Última actualización:</strong> Noviembre 2024</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">1. Información que Recopilamos</h3>
            <p>AtlasCine utiliza localStorage del navegador para guardar tus preferencias de contenido favorito. Esta información se almacena únicamente en tu dispositivo y no se transmite a nuestros servidores.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">2. Uso de Cookies</h3>
            <p>Utilizamos cookies técnicas esenciales para el funcionamiento del sitio. No utilizamos cookies de terceros para rastreo o publicidad.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">3. Contenido de Terceros</h3>
            <p>El contenido de video es proporcionado por servicios externos. Consulta sus políticas de privacidad correspondientes.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">4. Tus Derechos</h3>
            <p>Puedes eliminar todos los datos almacenados localmente limpiando el caché y las cookies de tu navegador.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">5. Contacto</h3>
            <p>Para consultas sobre privacidad: privacy@atlascine.com</p>
        `
    },
    terms: {
        title: 'Términos de Uso',
        content: `
            <p><strong>Última actualización:</strong> Noviembre 2024</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">1. Aceptación de Términos</h3>
            <p>Al acceder y usar AtlasCine, aceptas estar sujeto a estos términos de uso y todas las leyes aplicables.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">2. Uso del Servicio</h3>
            <p>AtlasCine es una plataforma de descubrimiento de contenido. No almacenamos ni distribuimos contenido multimedia. Todo el contenido es proporcionado por servicios de terceros.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">3. Propiedad Intelectual</h3>
            <p>Todo el contenido, diseño, y marca de AtlasCine están protegidos por derechos de autor y otras leyes de propiedad intelectual.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">4. Limitación de Responsabilidad</h3>
            <p>AtlasCine no se hace responsable del contenido proporcionado por servicios externos.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">5. Modificaciones</h3>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
        `
    },
    cookies: {
        title: 'Política de Cookies',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Qué son las Cookies?</h3>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo para recordar información sobre tu visita.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Cookies que Utilizamos</h3>
            <p><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio (navegación, preferencias de idioma).</p>
            <p><strong>Cookies de Funcionalidad:</strong> Recordar tus películas favoritas y preferencias de visualización.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Control de Cookies</h3>
            <p>Puedes controlar y/o eliminar las cookies según desees. Consulta la configuración de tu navegador para más información.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Cookies de Terceros</h3>
            <p>Algunos servicios de video pueden usar sus propias cookies. Consulta sus políticas respectivas.</p>
        `
    },
    dmca: {
        title: 'DMCA / Derechos de Autor',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">Aviso Importante</h3>
            <p>AtlasCine no almacena, reproduce, ni distribuye contenido multimedia en sus servidores. Actuamos únicamente como un servicio de índice y agregación de contenido alojado en plataformas de terceros.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Respeto a los Derechos de Autor</h3>
            <p>Respetamos los derechos de propiedad intelectual de terceros y esperamos que nuestros usuarios hagan lo mismo.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Procedimiento de Notificación</h3>
            <p>Si crees que tu obra protegida por derechos de autor está siendo enlazada indebidamente, contacta a:</p>
            <p><strong>Email:</strong> dmca@atlascine.com</p>
            <p><strong>Incluye en tu notificación:</strong></p>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>Identificación de la obra protegida</li>
                <li>URL específica del contenido</li>
                <li>Información de contacto</li>
                <li>Declaración de buena fe</li>
                <li>Firma electrónica o física</li>
            </ul>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Tiempo de Respuesta</h3>
            <p>Procesamos todas las notificaciones válidas en un plazo de 48-72 horas.</p>
        `
    },
    faq: {
        title: 'Preguntas Frecuentes',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Es gratis usar AtlasCine?</h3>
            <p>Sí, AtlasCine es completamente gratuito. No requiere registro ni suscripción.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Necesito crear una cuenta?</h3>
            <p>No, puedes explorar todo el contenido sin necesidad de registro. Tus favoritos se guardan localmente en tu navegador.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Con qué frecuencia se actualiza el contenido?</h3>
            <p>Actualizamos nuestras recomendaciones semanalmente con nuevo contenido de todo el mundo.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Puedo descargar películas?</h3>
            <p>AtlasCine es una plataforma de streaming. No ofrecemos descargas directas.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Funciona en dispositivos móviles?</h3>
            <p>Sí, AtlasCine es totalmente responsive y funciona en smartphones, tablets y computadoras.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Qué navegadores son compatibles?</h3>
            <p>Chrome, Firefox, Safari, Edge y Opera en sus versiones más recientes.</p>
        `
    },
    help: {
        title: 'Centro de Ayuda',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">Cómo Usar AtlasCine</h3>
            <p><strong>1. Explorar Contenido:</strong> Navega por las diferentes categorías en el menú principal (Películas, Series, Anime).</p>
            <p><strong>2. Buscar:</strong> Usa la barra de búsqueda en la parte superior para encontrar títulos específicos.</p>
            <p><strong>3. Favoritos:</strong> Click en el corazón para guardar tus películas favoritas.</p>
            <p><strong>4. Reproducir:</strong> Click en cualquier título para ver más detalles y reproducir.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Problemas Comunes</h3>
            <p><strong>El video no carga:</strong> Verifica tu conexión a internet o intenta con otro navegador.</p>
            <p><strong>No veo mis favoritos:</strong> Asegúrate de no haber limpiado las cookies del navegador.</p>
            <p><strong>El sitio no responde:</strong> Actualiza la página (F5) o limpia el caché del navegador.</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Contacto</h3>
            <p>¿Necesitas más ayuda? Escríbenos a: support@atlascine.com</p>
        `
    },
    contact: {
        title: 'Contacto',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">¿Cómo podemos ayudarte?</h3>
            <p>Estamos aquí para escucharte. Ponte en contacto con nosotros a través de cualquiera de estos canales:</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Email</h3>
            <p><strong>General:</strong> info@atlascine.com</p>
            <p><strong>Soporte:</strong> support@atlascine.com</p>
            <p><strong>Colaboraciones:</strong> partners@atlascine.com</p>
            <p><strong>Prensa:</strong> press@atlascine.com</p>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Redes Sociales</h3>
            <p>Síguenos en nuestras redes sociales para las últimas novedades:</p>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>Facebook: @atlascine</li>
                <li>Twitter: @atlascine</li>
                <li>Instagram: @atlascine</li>
                <li>YouTube: @atlascine</li>
            </ul>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Tiempo de Respuesta</h3>
            <p>Respondemos a todos los mensajes en un plazo de 24-48 horas hábiles.</p>
        `
    },
    sitemap: {
        title: 'Mapa del Sitio',
        content: `
            <h3 style="margin-top: 24px; margin-bottom: 12px;">Navegación Principal</h3>
            <ul style="margin-left: 20px; line-height: 2;">
                <li><strong>Inicio:</strong> Recomendaciones semanales y contenido destacado</li>
                <li><strong>Películas:</strong> Catálogo completo organizado por género</li>
                <li><strong>Series:</strong> Series de todo el mundo</li>
                <li><strong>Anime:</strong> Animación japonesa y mundial</li>
                <li><strong>Blog:</strong> Artículos sobre cine y entretenimiento</li>
            </ul>

            <h3 style="margin-top: 24px; margin-bottom: 12px;">Categorías por Región</h3>
            <ul style="margin-left: 20px; line-height: 2;">
                <li>🇺🇸 Cine de Hollywood</li>
                <li>🇪🇺 Cine Europeo</li>
                <li>🌎 Cine Latinoamericano</li>
                <li>🏮 Cine Asiático</li>
                <li>🇮🇳 Bollywood</li>
                <li>🌍 Cine Africano</li>
                <li>🎌 Anime</li>
            </ul>
        `
    }
};

// Open Footer Link (Social Media)
function openFooterLink(url, event) {
    event.preventDefault();

    // Create modal for external links
    const footerModal = document.getElementById('footerModal');
    const modalTitle = document.getElementById('footerModalTitle');
    const modalContent = document.getElementById('footerModalContent');

    modalTitle.textContent = 'Saliendo de AtlasCine';
    modalContent.innerHTML = `
        <p>Estás a punto de ser redirigido a un sitio externo:</p>
        <p style="margin: 20px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 8px; word-break: break-all;">
            <strong>${url}</strong>
        </p>
        <p>¿Deseas continuar?</p>
        <div style="display: flex; gap: 12px; margin-top: 30px;">
            <button class="btn btn-primary" onclick="window.open('${url}', '_blank'); closeFooterModal();">
                Sí, continuar
            </button>
            <button class="btn btn-secondary" onclick="closeFooterModal();">
                Cancelar
            </button>
        </div>
    `;

    footerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open Footer Page (Privacy, Terms, etc.)
function openFooterPage(page, event) {
    event.preventDefault();

    const pageData = footerPages[page];
    if (!pageData) return;

    const footerModal = document.getElementById('footerModal');
    const modalTitle = document.getElementById('footerModalTitle');
    const modalContent = document.getElementById('footerModalContent');

    modalTitle.textContent = pageData.title;
    modalContent.innerHTML = pageData.content;

    footerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Footer Modal
function closeFooterModal() {
    const footerModal = document.getElementById('footerModal');
    footerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show Section from Footer
function showSection(section, event) {
    event.preventDefault();

    // Remove active from all nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    // Add active to clicked nav link
    const navLink = document.querySelector(`[data-section="${section}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }

    // Hide all sections
    document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));

    // Show selected section
    document.getElementById(section).classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Navigate to Home when clicking logo
function navigateToHome() {
    // Remove active from all nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    // Add active to home nav link
    const homeLink = document.querySelector('[data-section="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Hide all sections
    document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));

    // Show home section
    document.getElementById('home').classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// ============================================
// NEWS FEED - Weekly Entertainment News
// ============================================

// Check if news needs to be refreshed (weekly)
function needsNewsRefresh() {
    const lastUpdate = localStorage.getItem('atlascine_news_last_update');
    if (!lastUpdate) return true;

    const lastUpdateDate = new Date(parseInt(lastUpdate));
    const now = new Date();
    const daysSinceUpdate = (now - lastUpdateDate) / (1000 * 60 * 60 * 24);

    // Refresh if more than 7 days old
    return daysSinceUpdate >= 7;
}

// Load news feed (from cache or generate new)
async function loadNewsFeed() {
    const newsContent = document.getElementById('newsContent');
    const newsLoading = document.getElementById('newsLoading');

    if (!newsContent) return;

    // Check if we have cached news and it's still fresh
    const cachedNews = localStorage.getItem('atlascine_news_feed');

    if (cachedNews && !needsNewsRefresh()) {
        // Display cached news
        newsContent.innerHTML = cachedNews;
        newsContent.style.display = 'grid';
        newsLoading.style.display = 'none';
    } else {
        // Generate fresh news
        await generateNewsFeed();
    }
}

// Generate fresh entertainment news with Gemini
async function generateNewsFeed() {
    const newsContent = document.getElementById('newsContent');
    const newsLoading = document.getElementById('newsLoading');

    if (!newsContent || !newsLoading) return;

    newsContent.style.display = 'none';
    newsLoading.style.display = 'block';

    try {
        const prompt = `Generate 5 current entertainment industry news headlines for this week. Include a mix of: streaming platform announcements, box office updates, international cinema trends (especially K-Dramas, Bollywood, anime, Turkish series), major film/series releases, and industry awards/festivals.

For each news item, provide:
1. A catchy headline (50-80 characters)
2. A brief description (100-150 characters)
3. An emoji that represents the news category

Format your response EXACTLY as JSON (no markdown, no code blocks, just pure JSON):
[
  {"emoji": "🎬", "headline": "...", "description": "..."},
  {"emoji": "📺", "headline": "...", "description": "..."},
  ...
]

Make the news relevant to global audiences, focusing on international content (K-Dramas, Bollywood, anime, Turkish series, Latin American cinema) as those are the main interests of AtlasCine users.`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.candidates || !data.candidates[0]) {
            throw new Error('Invalid response');
        }

        let text = data.candidates[0].content.parts[0].text;

        // Clean the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Parse JSON
        const newsItems = JSON.parse(text);

        // Generate HTML for news items
        const newsHTML = newsItems.map(item => `
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border-left: 4px solid #e50914; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
                <div style="display: flex; gap: 16px; align-items: start;">
                    <div style="font-size: 32px; flex-shrink: 0;">${item.emoji}</div>
                    <div style="flex: 1;">
                        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px; line-height: 1.4;">${item.headline}</h3>
                        <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.6;">${item.description}</p>
                    </div>
                </div>
            </div>
        `).join('');

        // Display news
        newsContent.innerHTML = newsHTML;
        newsContent.style.display = 'grid';
        newsLoading.style.display = 'none';

        // Cache the news and update timestamp
        localStorage.setItem('atlascine_news_feed', newsHTML);
        localStorage.setItem('atlascine_news_last_update', Date.now().toString());

        showToast(t('news.updated'));

    } catch (error) {
        console.error('Error generating news:', error);
        newsLoading.style.display = 'none';

        // Show fallback news instead of error
        const fallbackNews = getFallbackNews();
        newsContent.innerHTML = fallbackNews;
        newsContent.style.display = 'grid';
    }
}

// Fallback news when API fails - Multilingual
function getFallbackNews() {
    const newsTranslations = {
        es: [
            { emoji: '🎬', headline: 'Netflix apuesta por más contenido coreano en 2025', description: 'La plataforma anuncia inversión de $2.5 mil millones en producciones asiáticas para los próximos años.' },
            { emoji: '🇮🇳', headline: 'Bollywood rompe récords de taquilla internacional', description: 'Las películas indias alcanzan nuevos mercados en Medio Oriente y América Latina con doblajes locales.' },
            { emoji: '🎌', headline: 'Anime supera a Hollywood en streaming global', description: 'Por primera vez, el anime japonés lidera las listas de contenido más visto en plataformas digitales.' },
            { emoji: '🇹🇷', headline: 'Series turcas conquistan 150 países', description: 'Los dramas turcos se consolidan como el segundo contenido más exportado después del cine estadounidense.' },
            { emoji: '📺', headline: 'Nuevas temporadas de K-Dramas confirmadas', description: 'Squid Game, Sweet Home y All of Us Are Dead anuncian continuaciones para alegría de los fans.' }
        ],
        ar: [
            { emoji: '🎬', headline: 'نتفليكس تستثمر في المحتوى الكوري 2025', description: 'المنصة تعلن استثمار 2.5 مليار دولار في الإنتاجات الآسيوية خلال السنوات القادمة.' },
            { emoji: '🇮🇳', headline: 'بوليوود تحطم أرقام شباك التذاكر العالمي', description: 'الأفلام الهندية تصل إلى أسواق جديدة في الشرق الأوسط وأمريكا اللاتينية.' },
            { emoji: '🎌', headline: 'الأنمي يتفوق على هوليوود في البث العالمي', description: 'لأول مرة، الأنمي الياباني يتصدر قوائم المحتوى الأكثر مشاهدة على المنصات الرقمية.' },
            { emoji: '🇹🇷', headline: 'المسلسلات التركية تغزو 150 دولة', description: 'الدراما التركية تصبح ثاني أكثر المحتويات تصديراً بعد السينما الأمريكية.' },
            { emoji: '📺', headline: 'تأكيد مواسم جديدة من الدراما الكورية', description: 'Squid Game و Sweet Home و All of Us Are Dead يعلنون عن استمرارهم لفرحة المعجبين.' }
        ],
        en: [
            { emoji: '🎬', headline: 'Netflix bets big on Korean content in 2025', description: 'Platform announces $2.5 billion investment in Asian productions over the coming years.' },
            { emoji: '🇮🇳', headline: 'Bollywood breaks international box office records', description: 'Indian films reach new markets in Middle East and Latin America with local dubbing.' },
            { emoji: '🎌', headline: 'Anime surpasses Hollywood in global streaming', description: 'For the first time, Japanese anime leads most-watched content lists on digital platforms.' },
            { emoji: '🇹🇷', headline: 'Turkish series conquer 150 countries', description: 'Turkish dramas become the second most exported content after American cinema.' },
            { emoji: '📺', headline: 'New K-Drama seasons confirmed', description: 'Squid Game, Sweet Home and All of Us Are Dead announce continuations to fans delight.' }
        ],
        fr: [
            { emoji: '🎬', headline: 'Netflix mise sur le contenu coréen en 2025', description: 'La plateforme annonce un investissement de 2,5 milliards de dollars dans les productions asiatiques.' },
            { emoji: '🇮🇳', headline: 'Bollywood bat des records au box-office international', description: 'Les films indiens atteignent de nouveaux marchés au Moyen-Orient et en Amérique latine.' },
            { emoji: '🎌', headline: 'L\'anime dépasse Hollywood en streaming mondial', description: 'Pour la première fois, l\'anime japonais domine les listes de contenu le plus regardé.' },
            { emoji: '🇹🇷', headline: 'Les séries turques conquièrent 150 pays', description: 'Les drames turcs deviennent le deuxième contenu le plus exporté après le cinéma américain.' },
            { emoji: '📺', headline: 'Nouvelles saisons de K-Dramas confirmées', description: 'Squid Game, Sweet Home et All of Us Are Dead annoncent des suites pour le bonheur des fans.' }
        ]
    };

    const news = newsTranslations[currentLanguage] || newsTranslations.es;

    return news.map(item => `
        <div class="news-card">
            <div class="news-emoji">${item.emoji}</div>
            <div class="news-content">
                <h3 class="news-headline">${item.headline}</h3>
                <p class="news-description">${item.description}</p>
            </div>
        </div>
    `).join('');
}

// Refresh news feed manually
async function refreshNewsFeed() {
    await generateNewsFeed();
}

// Update footer year automatically
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Call on page load
updateFooterYear();
