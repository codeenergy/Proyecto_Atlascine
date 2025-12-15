// Database Index - Combines all sources with error handling
// Supports both static files and dynamic TMDB loading
// If one source fails, others continue working

// Check if auto-loader is enabled
const USE_AUTO_LOADER = typeof window !== 'undefined' && window.USE_TMDB_AUTO_LOADER === true;

// Import all database sources
let database = [];
const sources = {
    hdtoday: { loaded: false, count: 0 },
    lodynet: { loaded: false, count: 0 },
    aradramatv: { loaded: false, count: 0 },
    pelisflix: { loaded: false, count: 0 },
    vidsrc: { loaded: false, count: 0 },
    embedsu: { loaded: false, count: 0 },
    dramacool: { loaded: false, count: 0 },
    asiancrush: { loaded: false, count: 0 },
    cinecalidad: { loaded: false, count: 0 },
    cuevana: { loaded: false, count: 0 },
    movidy: { loaded: false, count: 0 },
    soap2day: { loaded: false, count: 0 },
    fmovies: { loaded: false, count: 0 },
    primewire: { loaded: false, count: 0 },
    yesmovies: { loaded: false, count: 0 }
};

// If auto-loader is enabled, wait for it to load
if (USE_AUTO_LOADER) {
    console.log('🔄 Using TMDB Auto-Loader (dynamic content)...');

    window.addEventListener('databaseReady', (event) => {
        database = event.detail.database;
        console.log(`✅ Auto-loaded ${database.length} titles from TMDB`);

        // Update sources count
        Object.keys(sources).forEach(key => {
            const count = database.filter(item => item.source === key).length;
            if (count > 0) {
                sources[key].loaded = true;
                sources[key].count = count;
            }
        });

        logDatabaseStats();
    });

    // Don't load static files if auto-loader is enabled
} else {
    console.log('📁 Using static database files...');

// Try to load HDToday content (general content)
try {
    if (typeof hdtodayContent !== 'undefined') {
        database = database.concat(hdtodayContent);
        sources.hdtoday.loaded = true;
        sources.hdtoday.count = hdtodayContent.length;
        console.log(`✅ HDToday loaded: ${hdtodayContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ HDToday database failed to load:', error);
}

// Try to load Lodynet content (Hindi & Turkish for Arabic audience)
try {
    if (typeof lodynetContent !== 'undefined') {
        database = database.concat(lodynetContent);
        sources.lodynet.loaded = true;
        sources.lodynet.count = lodynetContent.length;
        console.log(`✅ Lodynet loaded: ${lodynetContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ Lodynet database failed to load:', error);
}

// Try to load ArabDramaTV content (Asian dramas)
try {
    if (typeof arabdramatvContent !== 'undefined') {
        database = database.concat(arabdramatvContent);
        sources.aradramatv.loaded = true;
        sources.aradramatv.count = arabdramatvContent.length;
        console.log(`✅ ArabDramaTV loaded: ${arabdramatvContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ ArabDramaTV database failed to load:', error);
}

// Try to load Pelisflix content (streaming originals)
try {
    if (typeof pelisflixContent !== 'undefined') {
        database = database.concat(pelisflixContent);
        sources.pelisflix.loaded = true;
        sources.pelisflix.count = pelisflixContent.length;
        console.log(`✅ Pelisflix loaded: ${pelisflixContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ Pelisflix database failed to load:', error);
}

// Try to load VidSrc content (premium streaming)
try {
    if (typeof vidsrcContent !== 'undefined') {
        database = database.concat(vidsrcContent);
        sources.vidsrc.loaded = true;
        sources.vidsrc.count = vidsrcContent.length;
        console.log(`✅ VidSrc loaded: ${vidsrcContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ VidSrc database failed to load:', error);
}

// Try to load EmbedSu content (European cinema)
try {
    if (typeof embedsuContent !== 'undefined') {
        database = database.concat(embedsuContent);
        sources.embedsu.loaded = true;
        sources.embedsu.count = embedsuContent.length;
        console.log(`✅ EmbedSu loaded: ${embedsuContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ EmbedSu database failed to load:', error);
}

// Try to load DramaCool content (Asian dramas)
try {
    if (typeof dramacoolContent !== 'undefined') {
        database = database.concat(dramacoolContent);
        sources.dramacool.loaded = true;
        sources.dramacool.count = dramacoolContent.length;
        console.log(`✅ DramaCool loaded: ${dramacoolContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ DramaCool database failed to load:', error);
}

// Try to load AsianCrush content (Asian independent cinema)
try {
    if (typeof asiancrushContent !== 'undefined') {
        database = database.concat(asiancrushContent);
        sources.asiancrush.loaded = true;
        sources.asiancrush.count = asiancrushContent.length;
        console.log(`✅ AsianCrush loaded: ${asiancrushContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ AsianCrush database failed to load:', error);
}

// Try to load Cinecalidad content (Latin American content)
try {
    if (typeof cinecalidadContent !== 'undefined') {
        database = database.concat(cinecalidadContent);
        sources.cinecalidad.loaded = true;
        sources.cinecalidad.count = cinecalidadContent.length;
        console.log(`✅ Cinecalidad loaded: ${cinecalidadContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ Cinecalidad database failed to load:', error);
}

// Try to load Cuevana content (Spanish international content)
try {
    if (typeof cuevanaContent !== 'undefined') {
        database = database.concat(cuevanaContent);
        sources.cuevana.loaded = true;
        sources.cuevana.count = cuevanaContent.length;
        console.log(`✅ Cuevana loaded: ${cuevanaContent.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ Cuevana database failed to load:', error);
}

// Try to load Movidy content (popular movies and trending series)
try {
    if (typeof movidy !== 'undefined') {
        database = database.concat(movidy);
        sources.movidy.loaded = true;
        sources.movidy.count = movidy.length;
        console.log(`✅ Movidy loaded: ${movidy.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ Movidy database failed to load:', error);
}

// Try to load Soap2Day content (classic movies and popular series)
try {
    if (typeof soap2day !== 'undefined') {
        database = database.concat(soap2day);
        sources.soap2day.loaded = true;
        sources.soap2day.count = soap2day.length;
        console.log(`✅ Soap2Day loaded: ${soap2day.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ Soap2Day database failed to load:', error);
}

// Try to load FMovies content (action and thrillers)
try {
    if (typeof fmovies !== 'undefined') {
        database = database.concat(fmovies);
        sources.fmovies.loaded = true;
        sources.fmovies.count = fmovies.length;
        console.log(`✅ FMovies loaded: ${fmovies.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ FMovies database failed to load:', error);
}

// Try to load Primewire content (TV series and dramas)
try {
    if (typeof primewire !== 'undefined') {
        database = database.concat(primewire);
        sources.primewire.loaded = true;
        sources.primewire.count = primewire.length;
        console.log(`✅ Primewire loaded: ${primewire.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ Primewire database failed to load:', error);
}

// Try to load YesMovies content (family and animation)
try {
    if (typeof yesmovies !== 'undefined') {
        database = database.concat(yesmovies);
        sources.yesmovies.loaded = true;
        sources.yesmovies.count = yesmovies.length;
        console.log(`✅ YesMovies loaded: ${yesmovies.length} titles`);
    }
} catch (error) {
    console.warn('⚠️ YesMovies database failed to load:', error);
}

    // Log stats for static mode
    logDatabaseStats();

} // End of else block (static loading)

// Function to log database statistics
function logDatabaseStats() {
    console.log(`\n📊 Database Status (15 Fuentes):`);
    console.log(`   Total titles: ${database.length}`);
    console.log(`   HDToday: ${sources.hdtoday.loaded ? '✅' : '❌'} (${sources.hdtoday.count} titles)`);
    console.log(`   Lodynet: ${sources.lodynet.loaded ? '✅' : '❌'} (${sources.lodynet.count} titles)`);
    console.log(`   ArabDramaTV: ${sources.aradramatv.loaded ? '✅' : '❌'} (${sources.aradramatv.count} titles)`);
    console.log(`   Pelisflix: ${sources.pelisflix.loaded ? '✅' : '❌'} (${sources.pelisflix.count} titles)`);
    console.log(`   VidSrc: ${sources.vidsrc.loaded ? '✅' : '❌'} (${sources.vidsrc.count} titles)`);
    console.log(`   EmbedSu: ${sources.embedsu.loaded ? '✅' : '❌'} (${sources.embedsu.count} titles)`);
    console.log(`   DramaCool: ${sources.dramacool.loaded ? '✅' : '❌'} (${sources.dramacool.count} titles)`);
    console.log(`   AsianCrush: ${sources.asiancrush.loaded ? '✅' : '❌'} (${sources.asiancrush.count} titles)`);
    console.log(`   Cinecalidad: ${sources.cinecalidad.loaded ? '✅' : '❌'} (${sources.cinecalidad.count} titles)`);
    console.log(`   Cuevana: ${sources.cuevana.loaded ? '✅' : '❌'} (${sources.cuevana.count} titles)`);
    console.log(`   Movidy: ${sources.movidy.loaded ? '✅' : '❌'} (${sources.movidy.count} titles)`);
    console.log(`   Soap2Day: ${sources.soap2day.loaded ? '✅' : '❌'} (${sources.soap2day.count} titles)`);
    console.log(`   FMovies: ${sources.fmovies.loaded ? '✅' : '❌'} (${sources.fmovies.count} titles)`);
    console.log(`   Primewire: ${sources.primewire.loaded ? '✅' : '❌'} (${sources.primewire.count} titles)`);
    console.log(`   YesMovies: ${sources.yesmovies.loaded ? '✅' : '❌'} (${sources.yesmovies.count} titles)\n`);

    // Warn if no content loaded
    if (database.length === 0) {
        console.error('❌ CRITICAL: No database content loaded! Check source files.');
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { database, sources };
}
