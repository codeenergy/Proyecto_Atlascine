# 🎬 AtlasCine

Plataforma de streaming de películas y series con actualización automática de contenido.

## ✨ Características

- 🔄 **Actualización Automática** - Contenido actualizado desde TMDB API
- 🎯 **10 Fuentes de Contenido** - Diversidad de películas y series
- 📱 **Responsive Design** - Funciona en todos los dispositivos
- ⚡ **Cache Inteligente** - Carga rápida con sistema de cache de 24 horas
- 🌐 **Multilenguaje** - Soporte para español e inglés
- 📊 **10 Servidores de Video** - Múltiples opciones de reproducción
- 💰 **Sistema de Anuncios** - Monetización con PropellerAds

## 📁 Estructura del Proyecto

```
atlascine/
├── assets/
│   └── icons/
│       └── favicon.svg          # Favicon del sitio
├── css/
│   └── styles.css               # Estilos principales
├── js/
│   ├── databases/
│   │   ├── tmdb-auto-loader.js  # Sistema de carga automática ✅
│   │   ├── index.js             # Combina todas las fuentes
│   │   ├── hdtoday.js           # Base de datos estática (fallback)
│   │   ├── lodynet.js
│   │   ├── aradramatv.js
│   │   ├── pelisflix.js
│   │   ├── vidsrc.js
│   │   ├── embedsu.js
│   │   ├── dramacool.js
│   │   ├── asiancrush.js
│   │   ├── cinecalidad.js
│   │   └── cuevana.js
│   ├── app.js                   # Aplicación principal
│   ├── ads.js                   # Sistema de anuncios ✅
│   ├── config.js                # Configuración
│   ├── tmdb-cache.js            # Cache de TMDB
│   └── security-core.js         # Sistema de seguridad
├── docs/                        # Documentación
│   ├── INICIO-RAPIDO.md         # Guía de inicio rápido
│   ├── AUTO-UPDATE-README.md    # Sistema de actualización
│   ├── CONFIGURACION-ADS.md     # Configuración de anuncios
│   └── TROUBLESHOOTING.md       # Solución de problemas
├── index.html                   # Página principal
├── robots.txt                   # SEO
├── sitemap.xml                  # SEO
└── sw.js                        # Service Worker

```

## 🚀 Inicio Rápido

### Requisitos
- Hosting estático (HTML/CSS/JS)
- No requiere Node.js ni backend
- Funciona en Hostilia, GitHub Pages, Netlify, etc.

### Instalación

1. **Descargar el proyecto**
   ```bash
   git clone https://github.com/tu-usuario/atlascine.git
   ```

2. **Subir a tu hosting**
   - Sube todos los archivos a la raíz de tu hosting
   - No necesitas configurar nada más

3. **¡Listo!**
   - El sitio funciona automáticamente
   - El contenido se actualiza desde TMDB API
   - Los anuncios rotan cada 2 minutos

## ⚙️ Configuración

### Sistema de Actualización Automática

El sitio usa **TMDB Auto-Loader** (Opción 1) activado por defecto.

**Características:**
- ✅ Actualización automática desde TMDB API
- ✅ Cache de 24 horas en el navegador
- ✅ Sin necesidad de Node.js
- ✅ Funciona en hosting estático

**Configuración:**
Ver [docs/AUTO-UPDATE-README.md](docs/AUTO-UPDATE-README.md)

### Sistema de Anuncios

El sitio incluye sistema de anuncios con PropellerAds.

**Configuración actual:**
- Rotación cada 2 minutos
- Máximo 10 anuncios por sesión
- Anuncios al cambiar de contenido

**Personalizar:**
Ver [docs/CONFIGURACION-ADS.md](docs/CONFIGURACION-ADS.md)

Edita `js/ads.js` líneas 58 y 78 con tus zonas:
```javascript
s.dataset.zone = 'TU_ZONA_AQUI';
```

## 📊 Fuentes de Contenido

El sitio obtiene contenido de 10 fuentes diferentes:

1. **HDToday** - Acción, Aventura, Sci-Fi (30 títulos)
2. **Lodynet** - Hindi, Turco (20 títulos)
3. **ArabDramaTV** - K-Drama, C-Drama (30 títulos)
4. **Pelisflix** - Drama, Comedia (25 títulos)
5. **VidSrc** - Blockbusters (25 títulos)
6. **EmbedSu** - Cine Europeo (25 títulos)
7. **DramaCool** - K-Drama, Anime (25 títulos)
8. **AsianCrush** - Bollywood, Asiático (25 títulos)
9. **Cinecalidad** - Latinoamericano (25 títulos)
10. **Cuevana** - Internacional (25 títulos)

**Total:** ~255 títulos actualizados automáticamente

## 🎮 Servidores de Video

10 servidores de reproducción disponibles:

1. 🌐 vidsrc.xyz
2. 🚀 vidsrc.to
3. ⚡ 2embed.cc
4. 🔥 multiembed.mov
5. 💎 vidsrc.me
6. 🎯 2embed.to
7. ⭐ vidsrc.cc
8. 🎬 embed.su
9. 🌟 vidsrc.pm
10. 🎪 vidsrc.icu

## 📚 Documentación

- **[Inicio Rápido](docs/INICIO-RAPIDO.md)** - Empezar en 5 minutos
- **[Actualización Automática](docs/AUTO-UPDATE-README.md)** - Sistema de actualización
- **[Configuración de Anuncios](docs/CONFIGURACION-ADS.md)** - Monetización
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Solución de problemas

## 🔧 Personalización

### Cambiar colores del tema

Edita `css/styles.css`:
```css
:root {
    --primary-color: #e50914;  /* Rojo Netflix */
    --background: #141414;     /* Fondo oscuro */
}
```

### Añadir más contenido

El sistema se actualiza automáticamente desde TMDB.
Para personalizar fuentes, edita `js/databases/tmdb-auto-loader.js`.

### Cambiar frecuencia de anuncios

Edita `js/ads.js` línea 13:
```javascript
rotationInterval: 120000, // 2 minutos (120000ms)
```

## 🐛 Solución de Problemas

### El contenido no se carga

1. Abre la consola (F12)
2. Busca mensajes de error
3. Verifica que TMDB API esté funcionando
4. Consulta [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

### Los anuncios no aparecen

1. Verifica tus zonas de PropellerAds en `js/ads.js`
2. Limpia cache: `localStorage.clear(); sessionStorage.clear();`
3. Consulta [docs/CONFIGURACION-ADS.md](docs/CONFIGURACION-ADS.md)

## 🌐 Hosting Recomendado

El sitio funciona en cualquier hosting estático:

- ✅ Hostilia
- ✅ GitHub Pages
- ✅ Netlify
- ✅ Vercel
- ✅ Firebase Hosting
- ✅ Cloudflare Pages

**No requiere:**
- ❌ Node.js
- ❌ PHP
- ❌ Base de datos
- ❌ Backend

## 📈 Rendimiento

- Primera carga: 2-3 segundos (carga desde TMDB API)
- Siguientes cargas: Instantáneo (cache)
- Cache válido: 24 horas
- Actualización: Automática

## 🔐 Seguridad

- Sistema de seguridad incluido
- Protección contra XSS
- CSP headers configurados
- Scripts validados

## 📄 Licencia

Este proyecto es de código abierto.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

¿Necesitas ayuda? Consulta la documentación en la carpeta `docs/`.

---

**Desarrollado con ❤️ para la comunidad de streaming**

**Versión:** 2.0 (Sistema Auto-Update Activado)
