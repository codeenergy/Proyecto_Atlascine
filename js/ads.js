/**
 * AtlasCine Ad Manager - Sistema de Rotación Mejorado
 * Sistema optimizado con rotación frecuente de anuncios
 */

// ====================================
// CONFIGURACIÓN DE ANUNCIOS
// ====================================

const AdConfig = {
    // Tiempos reducidos para mostrar anuncios más frecuentemente
    initialDelay: 9000,      // 9 segundos (antes 5)
    rotationInterval: 240000, // 4 minutos (antes 15 min)
    maxAdsPerSession: 6,    // Máximo de anuncios por sesión
    currentAdCount: 0
};

// Guardar timestamp de última vista
function shouldShowAd() {
    const lastAdTime = localStorage.getItem('lastAdTime');
    const now = Date.now();

    // Si no hay timestamp o pasaron más de 2 minutos, mostrar
    if (!lastAdTime || (now - parseInt(lastAdTime)) > AdConfig.rotationInterval) {
        localStorage.setItem('lastAdTime', now.toString());
        return true;
    }
    return false;
}

// Actualizar contador de anuncios
function incrementAdCount() {
    AdConfig.currentAdCount++;
    sessionStorage.setItem('adCount', AdConfig.currentAdCount.toString());
}

function getAdCount() {
    const count = sessionStorage.getItem('adCount');
    return count ? parseInt(count) : 0;
}

// ====================================
// ANUNCIO 1: IN-PAGE PUSH
// ====================================
function loadInPagePush() {
    if (getAdCount() >= AdConfig.maxAdsPerSession) {
        console.log('⚠️ Límite de anuncios alcanzado esta sesión');
        return;
    }

    if (!shouldShowAd()) {
        console.log('⏱️ Esperando tiempo entre anuncios...');
        return;
    }

    setTimeout(() => {
        (function (s) {
            s.dataset.zone = '10266837';
            s.src = 'https://nap5k.com/tag.min.js';
            console.log('✅ In-Page Push: Cargado');
            incrementAdCount();
        })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
    }, AdConfig.initialDelay);
}

// ====================================
// ANUNCIO 2: BANNER ROTATIVO
// ====================================
function loadBannerAd() {
    const bannerSpace = document.getElementById('adBannerSpace');
    if (!bannerSpace) return;

    // Script de banner (puedes añadir tu zona de PropellerAds aquí)
    const bannerScript = document.createElement('script');
    bannerScript.async = true;
    bannerScript.setAttribute('data-cfasync', 'false');
    bannerScript.src = 'https://nap5k.com/tag.min.js';
    bannerScript.dataset.zone = '10244474'; // Usa tu zona de banner

    bannerSpace.innerHTML = '';
    bannerSpace.appendChild(bannerScript);

    console.log('✅ Banner Ad: Cargado');
}

// ====================================
// SISTEMA DE ROTACIÓN
// ====================================
function setupAdRotation() {
    // Cargar primer anuncio
    loadInPagePush();

    // Rotar anuncios cada 2 minutos
    setInterval(() => {
        if (getAdCount() < AdConfig.maxAdsPerSession && shouldShowAd()) {
            console.log('🔄 Rotando anuncio...');

            // Alternar entre diferentes tipos
            const adType = Math.random() > 0.5 ? 'push' : 'banner';

            if (adType === 'push') {
                loadInPagePush();
            } else {
                loadBannerAd();
            }
        }
    }, AdConfig.rotationInterval);
}

// ====================================
// EVENTO DE CAMBIO DE CONTENIDO
// ====================================
// Mostrar anuncio cuando el usuario navega a nuevo contenido
let lastContentId = null;

function onContentChange(contentId) {
    if (lastContentId !== contentId && shouldShowAd()) {
        console.log('📺 Nuevo contenido detectado, mostrando anuncio');
        loadInPagePush();
        lastContentId = contentId;
    }
}

// Hook para detectar cambios de contenido
if (typeof window !== 'undefined') {
    const originalPlayContent = window.playContent;
    if (originalPlayContent) {
        window.playContent = function(content) {
            onContentChange(content.id);
            return originalPlayContent.apply(this, arguments);
        };
    }
}

// ====================================
// INICIALIZAR
// ====================================
console.log('%c🎬 AtlasCine Ad Manager', 'font-size: 14px; font-weight: bold; color: #e50914;');
console.log('%cSistema de rotación activo: Anuncios cada 2 minutos', 'color: #999;');
console.log('%cMáximo: ' + AdConfig.maxAdsPerSession + ' anuncios por sesión', 'color: #999;');

// Iniciar sistema de rotación
setupAdRotation();

// Limpiar contador al cerrar sesión (opcional)
window.addEventListener('beforeunload', () => {
    // El contador se limpia automáticamente al cerrar el navegador (sessionStorage)
});
