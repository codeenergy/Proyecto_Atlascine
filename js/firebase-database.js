/**
 * AtlasCine - Firebase Database Manager
 * Gestión de contenido en tiempo real con caché inteligente
 */

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos de caché
const COLLECTION_NAME = 'movies_series';

// ====================================
// SISTEMA DE CACHÉ INTELIGENTE
// ====================================

function getCacheKey(source) {
    return `firebase_cache_${source}`;
}

function getCacheTimestampKey(source) {
    return `firebase_cache_time_${source}`;
}

function isCacheValid(source) {
    const timestamp = localStorage.getItem(getCacheTimestampKey(source));
    if (!timestamp) return false;

    const now = Date.now();
    const cacheAge = now - parseInt(timestamp);

    return cacheAge < CACHE_DURATION;
}

function saveToCache(source, data) {
    try {
        localStorage.setItem(getCacheKey(source), JSON.stringify(data));
        localStorage.setItem(getCacheTimestampKey(source), Date.now().toString());
        console.log(`💾 Cache guardado: ${source} (${data.length} items)`);
    } catch (error) {
        console.warn('⚠️ Error guardando cache:', error);
    }
}

function getFromCache(source) {
    try {
        const cached = localStorage.getItem(getCacheKey(source));
        if (cached) {
            const data = JSON.parse(cached);
            console.log(`⚡ Cargado desde cache: ${source} (${data.length} items)`);
            return data;
        }
    } catch (error) {
        console.warn('⚠️ Error leyendo cache:', error);
    }
    return null;
}

// ====================================
// FIREBASE OPERATIONS
// ====================================

/**
 * Cargar contenido desde Firebase
 * @param {string} source - Nombre de la fuente (hdtoday, lodynet, etc.)
 * @returns {Promise<Array>} Array de contenido
 */
async function loadFromFirebase(source) {
    // Verificar caché primero
    if (isCacheValid(source)) {
        const cached = getFromCache(source);
        if (cached) return cached;
    }

    try {
        const db = firebase.firestore();
        const snapshot = await db.collection(COLLECTION_NAME)
            .where('source', '==', source)
            .limit(100)
            .get();

        const content = [];
        snapshot.forEach(doc => {
            content.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log(`🔥 Firebase: ${source} cargado (${content.length} items)`);

        // Guardar en caché
        saveToCache(source, content);

        return content;
    } catch (error) {
        console.error(`❌ Error cargando ${source} desde Firebase:`, error);

        // Intentar usar caché expirado como fallback
        const cached = getFromCache(source);
        if (cached) {
            console.log(`⚠️ Usando caché expirado de ${source}`);
            return cached;
        }

        return [];
    }
}

/**
 * Cargar todo el contenido de todas las fuentes
 * @param {Array<string>} sources - Array de nombres de fuentes
 * @returns {Promise<Array>} Array combinado de todo el contenido
 */
async function loadAllContent(sources) {
    console.log('🔄 Cargando contenido de Firebase...');

    try {
        // Cargar todas las fuentes en paralelo
        const promises = sources.map(source => loadFromFirebase(source));
        const results = await Promise.all(promises);

        // Combinar todos los resultados
        const allContent = results.flat();

        console.log(`✅ Total cargado: ${allContent.length} items de ${sources.length} fuentes`);

        return allContent;
    } catch (error) {
        console.error('❌ Error cargando contenido:', error);
        return [];
    }
}

/**
 * Agregar o actualizar contenido en Firebase
 * (Solo para uso administrativo)
 */
async function addContentToFirebase(contentData) {
    try {
        const db = firebase.firestore();
        const docRef = await db.collection(COLLECTION_NAME).add(contentData);
        console.log('✅ Contenido agregado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Error agregando contenido:', error);
        throw error;
    }
}

/**
 * Limpiar caché manualmente
 */
function clearCache() {
    const keys = Object.keys(localStorage);
    let cleared = 0;

    keys.forEach(key => {
        if (key.startsWith('firebase_cache_')) {
            localStorage.removeItem(key);
            cleared++;
        }
    });

    console.log(`🗑️ Cache limpiado: ${cleared} items eliminados`);
}

// ====================================
// SOURCES CONFIGURATION
// ====================================

const FIREBASE_SOURCES = [
    'tmdb-trending',
    'tmdb-popular',
    'tmdb-anime',
    'tmdb-kdrama'
];

// ====================================
// AUTO-SYNC desde TMDB si Firebase vacío
// ====================================

async function autoSyncFromTMDB() {
    console.log('%c🔄 Auto-Sync desde TMDB', 'font-size: 14px; font-weight: bold; color: #01b4e4;');
    console.log('%c⏳ Firebase vacío detectado. Sincronizando automáticamente...', 'color: #999;');

    try {
        // Verificar que syncAllContent esté disponible
        if (!window.syncAllContent) {
            console.error('❌ syncAllContent no está disponible. Asegúrate de que tmdb-to-firebase.js esté cargado.');
            return false;
        }

        // Ejecutar sincronización automática
        console.log('%c📥 Descargando contenido de TMDB...', 'color: #01b4e4;');
        const result = await window.syncAllContent();

        if (result.success) {
            console.log(`%c✅ Auto-sync completado! ${result.total} items guardados en Firebase`, 'color: #46d369; font-weight: bold;');
            return true;
        }

        return false;
    } catch (error) {
        console.error('❌ Error en auto-sync:', error);
        return false;
    }
}

// ====================================
// MIGRACIÓN AUTOMÁTICA DE DATOS
// ====================================

async function autoMigrateOldData() {
    console.log('%c🔄 Verificando migración de datos...', 'color: #01b4e4;');

    // Verificar si la migración ya se completó
    const migrationDone = localStorage.getItem('atlascine_migration_done');
    if (migrationDone === 'true') {
        console.log('%c✅ Migración ya completada anteriormente', 'color: #46d369;');
        return 0;
    }

    try {
        const db = firebase.firestore();
        const batchSize = 100;
        let totalMigrated = 0;
        let hasMore = true;
        let lastDoc = null;

        while (hasMore) {
            let query = db.collection(COLLECTION_NAME).limit(batchSize);

            if (lastDoc) {
                query = query.startAfter(lastDoc);
            }

            const snapshot = await query.get();

            if (snapshot.empty) {
                hasMore = false;
                break;
            }

            const batch = db.batch();
            let batchCount = 0;

            snapshot.forEach(doc => {
                const data = doc.data();
                // Si no tiene thumbnail pero tiene poster, necesita migración
                if (!data.thumbnail && data.poster) {
                    batch.update(doc.ref, { thumbnail: data.poster });
                    batchCount++;
                }
            });

            if (batchCount > 0) {
                await batch.commit();
                totalMigrated += batchCount;
                console.log(`%c⚡ Migrados ${batchCount} documentos (total: ${totalMigrated})...`, 'color: #ff9800;');
            }

            lastDoc = snapshot.docs[snapshot.docs.length - 1];

            if (snapshot.size < batchSize) {
                hasMore = false;
            }
        }

        if (totalMigrated > 0) {
            console.log(`%c✅ Migración completada: ${totalMigrated} documentos actualizados`, 'color: #46d369; font-weight: bold;');
            clearCache();
        } else {
            console.log('%c✅ No se necesita migración', 'color: #46d369;');
        }

        // Marcar migración como completada
        localStorage.setItem('atlascine_migration_done', 'true');

        return totalMigrated;
    } catch (error) {
        console.error('❌ Error en migración:', error);
        return 0;
    }
}

// ====================================
// VERIFICACIÓN DE AUTO-SYNC MENSUAL
// ====================================

async function checkIfNeedsMonthlySync() {
    const lastSyncDate = localStorage.getItem('atlascine_last_sync');
    const now = new Date();

    if (!lastSyncDate) {
        console.log('%c⚠️ Nunca se ha sincronizado automáticamente', 'color: #ff9800;');
        return true;
    }

    const lastSync = new Date(lastSyncDate);
    const daysSinceSync = (now - lastSync) / (1000 * 60 * 60 * 24);

    console.log(`📅 Última sincronización: hace ${Math.round(daysSinceSync)} días`);

    if (daysSinceSync >= 30) {
        console.log('%c⚠️ Han pasado más de 30 días. Auto-sync necesario.', 'color: #ff9800;');
        return true;
    }

    console.log('%c✅ Contenido actualizado recientemente (< 30 días)', 'color: #46d369;');
    return false;
}

// ====================================
// INICIALIZACIÓN CON AUTO-SYNC
// ====================================

async function initFirebaseDatabase() {
    console.log('%c🔥 Firebase Database Manager', 'font-size: 14px; font-weight: bold; color: #FFA000;');

    // PASO 1: Migrar datos viejos automáticamente
    await autoMigrateOldData();

    // PASO 2: Verificar si necesita auto-sync mensual
    const needsMonthlySync = await checkIfNeedsMonthlySync();

    // PASO 3: Intentar cargar contenido existente desde fuentes específicas
    let content = await loadAllContent(FIREBASE_SOURCES);

    // Si no hay contenido de fuentes específicas, intentar cargar TODO
    if (content.length === 0) {
        console.log('%c⚠️ No se encontraron fuentes específicas. Cargando TODO el contenido...', 'color: #ff9800;');
        try {
            const db = firebase.firestore();
            const snapshot = await db.collection(COLLECTION_NAME)
                .limit(500)
                .get();

            content = [];
            snapshot.forEach(doc => {
                content.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            console.log(`📥 Contenido total cargado: ${content.length} items`);
        } catch (error) {
            console.error('❌ Error cargando contenido total:', error);
        }
    }

    // PASO 4: Auto-sincronizar si Firebase está vacío O han pasado 30 días
    if (content.length === 0 || needsMonthlySync) {
        if (content.length === 0) {
            console.log('%c⚠️ Firebase está vacío. Iniciando auto-sync desde TMDB...', 'color: #ff9800;');
        } else {
            console.log('%c🔄 Auto-sync mensual activado. Actualizando contenido desde TMDB...', 'color: #01b4e4;');
        }
        console.log('%c📦 Esto puede tardar 1-2 minutos. Por favor espera...', 'color: #999;');

        const synced = await autoSyncFromTMDB();

        if (synced) {
            // Recargar TODO el contenido después del sync
            try {
                const db = firebase.firestore();
                const snapshot = await db.collection(COLLECTION_NAME)
                    .limit(500)
                    .get();

                content = [];
                snapshot.forEach(doc => {
                    content.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                console.log(`✅ Database auto-sincronizado: ${content.length} items disponibles`);

                // Actualizar timestamp del último sync
                localStorage.setItem('atlascine_last_sync', new Date().toISOString());
                console.log('%c✅ Timestamp de auto-sync actualizado', 'color: #46d369;');
            } catch (error) {
                console.error('❌ Error recargando contenido:', error);
            }
        }
    }

    // Hacer disponible globalmente para app.js
    window.database = content;

    // Disparar evento con el contenido cargado
    const event = new CustomEvent('firebaseContentLoaded', {
        detail: {
            content: content,
            sources: FIREBASE_SOURCES,
            database: content
        }
    });
    window.dispatchEvent(event);

    console.log(`✅ Database final: ${content.length} items disponibles`);

    return content;
}

// Export functions
window.loadFromFirebase = loadFromFirebase;
window.loadAllContent = loadAllContent;
window.addContentToFirebase = addContentToFirebase;
window.clearFirebaseCache = clearCache;
window.initFirebaseDatabase = initFirebaseDatabase;
window.FIREBASE_SOURCES = FIREBASE_SOURCES;
