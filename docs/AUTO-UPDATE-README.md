# Sistema de Actualización Automática para Hosting Estático

## Para Hosting SIN Node.js (Hostilia, GitHub Pages, Netlify, etc.)

Tu hosting **NO soporta Node.js**, así que creé una solución que funciona **100% en el navegador** usando JavaScript puro.

---

## ¿Cómo Funciona?

El sistema carga contenido **directamente desde TMDB API** cuando el usuario visita tu sitio:

```
Usuario visita tu sitio
    ↓
JavaScript carga TMDB API
    ↓
Obtiene películas/series actualizadas
    ↓
Guarda en cache (24 horas)
    ↓
Muestra contenido actualizado
```

---

## Activar Actualización Automática (3 pasos)

### Paso 1: Editar index.html

Abre [index.html](index.html) y busca la línea **805** aprox.

**DESCOMENTA estas 3 líneas:**

```html
<!-- Antes (comentado): -->
<!-- <script>window.USE_TMDB_AUTO_LOADER = true;</script> -->
<!-- <script src="js/databases/tmdb-auto-loader.js" data-allowed></script> -->
<!-- <script>initAutoLoader();</script> -->

<!-- Después (descomentado): -->
<script>window.USE_TMDB_AUTO_LOADER = true;</script>
<script src="js/databases/tmdb-auto-loader.js" data-allowed></script>
<script>initAutoLoader();</script>
```

### Paso 2: Comentar archivos estáticos (Opcional)

Para ahorrar ancho de banda, comenta los archivos de base de datos estáticos:

```html
<!-- Comentar estos archivos: -->
<!--
<script src="js/databases/hdtoday.js" data-allowed></script>
<script src="js/databases/lodynet.js" data-allowed></script>
<script src="js/databases/aradramatv.js" data-allowed></script>
<script src="js/databases/pelisflix.js" data-allowed></script>
<script src="js/databases/vidsrc.js" data-allowed></script>
<script src="js/databases/embedsu.js" data-allowed></script>
<script src="js/databases/dramacool.js" data-allowed></script>
<script src="js/databases/asiancrush.js" data-allowed></script>
<script src="js/databases/cinecalidad.js" data-allowed></script>
<script src="js/databases/cuevana.js" data-allowed></script>
-->
```

### Paso 3: Subir a tu hosting

Sube SOLO estos archivos nuevos/modificados:

```
index.html (modificado)
js/databases/tmdb-auto-loader.js (nuevo)
js/databases/index.js (modificado)
```

**¡Listo!** Tu sitio ahora carga contenido actualizado automáticamente.

---

## Ventajas del Sistema

| Característica | Detalle |
|----------------|---------|
| ✅ **Sin Backend** | Funciona en hosting estático (HTML/JS) |
| ✅ **Actualización Automática** | Cada vez que alguien visita el sitio |
| ✅ **Cache Inteligente** | Guarda datos por 24 horas en el navegador |
| ✅ **Gratis** | Usa API gratuita de TMDB |
| ✅ **Rápido** | Primera carga desde API, luego desde cache |
| ✅ **10 Fuentes** | Mantiene las 10 fuentes de contenido |
| ✅ **Sin Mantenimiento** | No necesitas actualizar manualmente |

---

## Cómo Funciona el Cache

```
Primera visita:
- Descarga desde TMDB API (~2-3 segundos)
- Guarda en localStorage del navegador
- Cache válido por 24 horas

Siguientes visitas (dentro de 24h):
- Carga instantánea desde cache
- Sin llamadas a API

Después de 24h:
- Actualiza automáticamente desde TMDB
- Renueva el cache
```

---

## Configuración Avanzada

### Cambiar duración del cache

Edita `js/databases/tmdb-auto-loader.js` línea 4:

```javascript
// Cache por 24 horas (por defecto)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Cache por 12 horas
const CACHE_DURATION = 12 * 60 * 60 * 1000;

// Cache por 1 semana
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;
```

### Personalizar fuentes

Edita el objeto `autoLoaderConfig` en `js/databases/tmdb-auto-loader.js` línea 10:

```javascript
hdtoday: {
    name: 'HDToday',
    genres: [28, 12, 878],  // Acción, Aventura, Sci-Fi
    region: 'Hollywood',
    language: 'Inglés',
    limit: 30  // Cambia el número de títulos
}
```

### IDs de Géneros TMDB

- 28: Acción
- 12: Aventura
- 16: Animación
- 35: Comedia
- 80: Crimen
- 18: Drama
- 14: Fantasía
- 27: Terror
- 10749: Romance
- 878: Ciencia Ficción
- 53: Thriller

---

## Solución de Problemas

### "No se carga contenido"

1. Abre la consola del navegador (F12)
2. Busca mensajes con emoji 🔄 o ❌
3. Verifica que la API key de TMDB sea válida en `js/databases/tmdb-auto-loader.js`

### "Muy lento en primera carga"

Es normal, la primera carga tarda 2-3 segundos porque descarga desde TMDB. Las siguientes cargas serán instantáneas gracias al cache.

### "Quiero actualizar el contenido ahora"

Abre la consola del navegador (F12) y ejecuta:

```javascript
localStorage.clear();
location.reload();
```

### "Quiero volver al sistema estático"

Simplemente comenta las 3 líneas en index.html:

```html
<!-- <script>window.USE_TMDB_AUTO_LOADER = true;</script> -->
<!-- <script src="js/databases/tmdb-auto-loader.js" data-allowed></script> -->
<!-- <script>initAutoLoader();</script> -->
```

Y descomenta los archivos de base de datos estáticos.

---

## Comparación de Sistemas

### Sistema Estático (Actual)
- ❌ Contenido fijo
- ❌ Debes actualizar manualmente
- ✅ Carga instantánea
- ✅ No depende de APIs externas

### Sistema Automático (Nuevo)
- ✅ Contenido siempre actualizado
- ✅ Sin mantenimiento
- ⚠️ Primera carga: 2-3 segundos
- ⚠️ Depende de TMDB API
- ✅ Cache para cargas rápidas

---

## Recomendación

### Usa Sistema Automático si:
- Quieres contenido siempre actualizado
- No quieres mantener archivos manualmente
- Tu sitio tiene tráfico moderado
- Prefieres comodidad sobre control total

### Usa Sistema Estático si:
- Quieres control total del contenido
- Prefieres carga instantánea siempre
- Tu sitio tiene mucho tráfico
- No te importa actualizar manualmente

---

## Monitoreo

Para ver el estado del sistema, abre la consola (F12):

```
🔄 Using TMDB Auto-Loader (dynamic content)...
📥 Loading HDToday from TMDB...
✅ HDToday loaded: 30 titles
📥 Loading VidSrc from TMDB...
✅ VidSrc loaded: 25 titles
...
📊 Total loaded: 255 titles from 10 sources
```

---

## Hosting Compatibles

✅ **Funciona en:**
- Hostilia
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Cloudflare Pages
- Surge.sh
- Render (Static)
- Cualquier hosting HTML/CSS/JS

❌ **NO necesitas:**
- Node.js
- PHP
- Python
- Backend
- Base de datos
- Servidor

---

## Preguntas Frecuentes

**¿Cuesta dinero?**
No, la API de TMDB es gratuita.

**¿Tiene límite de requests?**
Sí, pero con el cache de 24 horas rara vez lo alcanzarás.

**¿Puedo usar ambos sistemas?**
Sí, el sistema automático tiene fallback a archivos estáticos si falla.

**¿Funciona offline?**
Sí, si el cache está cargado. Si no hay cache y no hay internet, usa archivos estáticos.

**¿Necesito HTTPS?**
Recomendado pero no obligatorio.

---

## Soporte

Si tienes problemas:

1. Revisa la consola del navegador (F12)
2. Verifica que las 3 líneas estén descomentadas
3. Confirma que el archivo `tmdb-auto-loader.js` exista
4. Prueba limpiar el cache: `localStorage.clear()`

---

## Actualizar a Futuro

Para actualizar el sistema en el futuro, solo necesitas actualizar 1 archivo:

```
js/databases/tmdb-auto-loader.js
```

El resto del sitio NO necesita cambios.

---

**¡Tu sitio ahora se actualiza automáticamente sin necesitar Node.js! 🎉**
