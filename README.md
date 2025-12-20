# 🎬 AtlasCine

Portal de streaming de películas, series y anime con contenido real desde TMDB.

## ✨ Características

- 🎥 **Contenido Real**: ~360 películas, series, anime y k-dramas desde TMDB
- 🔄 **Auto-Sync**: Sincronización automática desde TMDB si Firebase está vacío
- 🎨 **Diseño Simple**: Estilo Netflix minimalista y profesional
- 📱 **Responsive**: Funciona en desktop, tablet y móvil
- 🔍 **Búsqueda**: Búsqueda en tiempo real de contenido
- 🌍 **Multilenguaje**: Español, Inglés, Árabe, Francés

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Importa el repositorio: `codeenergy/Proyecto_Atlascine`
4. Vercel detectará automáticamente la configuración
5. Haz clic en "Deploy"
6. ¡Listo! Tu sitio estará en: `https://atlascine.vercel.app`

### Opción 2: Desde CLI

```bash
npm i -g vercel
cd atlascine
vercel
```

## 🎯 Cómo Funciona

1. **Primera carga**: El sistema detecta que Firebase está vacío
2. **Auto-sync**: Sincroniza automáticamente ~360 contenidos desde TMDB
3. **Guardado**: Los datos se guardan en Firebase Firestore
4. **Carga rápida**: Próximas cargas usan Firebase directamente

## 📦 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Base de Datos**: Firebase Firestore
- **API**: TMDB (The Movie Database)
- **Hosting**: Vercel
- **Anuncios**: PropellerAds (4 zonas)

## 📧 Contacto

- GitHub: [@codeenergy](https://github.com/codeenergy)
- Proyecto: [Proyecto_Atlascine](https://github.com/codeenergy/Proyecto_Atlascine)

---

🎬 **AtlasCine** - Tu portal al cine mundial
