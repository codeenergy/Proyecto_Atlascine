# Guía de Solución de Problemas - AtlasCine

## Problema: El reproductor no muestra el video

Si al dar clic en "Play" el video no se muestra o el reproductor "se quita", sigue estos pasos:

### 1. Verificar la Consola del Navegador

1. Abre las herramientas de desarrollador (F12 en Windows/Linux, Cmd+Opt+I en Mac)
2. Ve a la pestaña "Console"
3. Busca mensajes que comiencen con:
   - `🎬 Cargando video:` - Confirma que se está intentando cargar
   - `✅ Iframe cargado` - El video cargó correctamente
   - `❌ Error al cargar el iframe` - Error de carga
   - `❌ El contenido no tiene tmdbId` - Falta ID del contenido

### 2. Causas Comunes del Problema

#### A. Servidores Externos Bloqueados

Los servidores de video (vidsrc.xyz, vidsrc.to, etc.) pueden:
- Estar caídos temporalmente
- Bloquear tu IP/país
- Tener políticas CORS que impiden el embedding

**Solución:** Prueba los 4 servidores disponibles haciendo clic en los botones del reproductor.

#### B. Bloqueadores de Contenido

Extensiones del navegador pueden bloquear iframes:
- Bloqueadores de anuncios (uBlock, AdBlock)
- Privacy Badger
- NoScript

**Solución:**
- Desactiva temporalmente estas extensiones
- Agrega una excepción para tu dominio

#### C. Content Security Policy (CSP)

Tu servidor puede tener una CSP que bloquea iframes externos.

**Solución:** Verifica y ajusta las cabeceras CSP en tu servidor:

```
Content-Security-Policy: frame-src 'self' https://vidsrc.xyz https://vidsrc.to https://www.2embed.cc https://multiembed.mov;
```

#### D. Protocolo HTTPS

Si tu sitio está en HTTPS, los iframes HTTP pueden ser bloqueados.

**Solución:** Todos los servidores ya usan HTTPS, pero verifica en la consola.

### 3. Depuración Avanzada

Abre la consola y ejecuta:

```javascript
// Ver contenido seleccionado
console.log('Contenido:', selectedContent);

// Ver estado del reproductor
console.log('Estado:', window.playerState);

// Verificar iframe
const iframe = document.getElementById('mainVideo');
console.log('Iframe:', iframe);
console.log('URL del iframe:', iframe?.src);
```

### 4. Verificar Base de Datos

Confirma que la base de datos cargó correctamente:

```javascript
console.log('Total de títulos:', database.length);
console.log('Primer título:', database[0]);
```

Si sale `database is not defined` o `length = 0`, hay un problema con los archivos de base de datos.

### 5. Soluciones Alternativas

#### Opción 1: Usar Embedders Alternativos

Modifica el archivo `js/app.js` para usar diferentes servidores:

```javascript
const sources = [
    `https://www.2embed.to/embed/${videoType}/${selectedContent.tmdbId}`,
    `https://vidsrc.me/embed/${videoType}/${selectedContent.tmdbId}`,
    `https://autoembed.co/movie/tmdb/${selectedContent.tmdbId}`,
    `https://moviesapi.club/movie/${selectedContent.tmdbId}`
];
```

#### Opción 2: Implementar un Backend Proxy

Crea un proxy en tu servidor para evitar problemas CORS:

```javascript
// En lugar de cargar directamente:
const url = `https://vidsrc.xyz/embed/movie/${tmdbId}`;

// Usa tu proxy:
const url = `/api/proxy?url=${encodeURIComponent('https://vidsrc.xyz/embed/movie/' + tmdbId)}`;
```

### 6. Logs Implementados

El código ahora incluye logs automáticos para ayudar en la depuración:

- **Inicio de carga:** "🎬 Cargando video:"
- **Iframe cargado:** "✅ Iframe cargado"
- **Error de carga:** "❌ Error al cargar el iframe"
- **Sin tmdbId:** "❌ El contenido no tiene tmdbId"
- **Timeout:** "⚠️ El iframe está tardando mucho en cargar"

### 7. Contacto y Soporte

Si ninguna solución funciona:

1. Captura de pantalla de la consola (F12)
2. Indica qué navegador y versión usas
3. Prueba en modo incógnito/privado
4. Prueba con otro navegador

## Mejoras Implementadas

✅ Validación de `tmdbId` antes de cargar
✅ Logs detallados en consola
✅ Detección de errores del iframe
✅ Timeout de 30 segundos con mensaje al usuario
✅ Instrucciones visuales en el reproductor
✅ Manejo de múltiples servidores

## Estado de los Servidores (Actualizado)

| Servidor | URL | Estado |
|----------|-----|--------|
| 1 | vidsrc.xyz | ⚠️ Variable |
| 2 | vidsrc.to | ⚠️ Variable |
| 3 | 2embed.cc | ⚠️ Variable |
| 4 | multiembed.mov | ⚠️ Variable |

**Nota:** La disponibilidad de estos servidores puede cambiar sin previo aviso.
