# 🚀 Configuración de Variables de Entorno en Vercel

## 📋 Variables Requeridas

### 1. TMDB API Key
```
TMDB_API_KEY=febf4ee4ded854aadc4c03d51456f537
```
- **Dónde obtenerla:** https://www.themoviedb.org/settings/api
- **Usada en:** `js/config.js`, `js/tmdb-to-firebase.js`
- **Propósito:** Obtener metadata de películas y series

### 2. Google Gemini AI API Key
```
GEMINI_API_KEY=AIzaSyBMDm5GvL-A_MiYYWZeNWwQaIYR9kpxfKg
```
- **Dónde obtenerla:** https://aistudio.google.com/app/apikey
- **Usada en:** `js/config.js`, blog generativo
- **Propósito:** Generar contenido de blog/noticias

### 3. Firebase Configuration
```
FIREBASE_API_KEY=AIzaSyAjD1z09P98hHYkrf209crCEC9xIerLKdI
FIREBASE_AUTH_DOMAIN=atlascine-4f46c.firebaseapp.com
FIREBASE_PROJECT_ID=atlascine-4f46c
FIREBASE_STORAGE_BUCKET=atlascine-4f46c.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=674352261422
FIREBASE_APP_ID=1:674352261422:web:e9e223cadc42ab3702f2bf
FIREBASE_MEASUREMENT_ID=G-ZRSGSPZKGZ
```
- **Dónde obtenerlas:** https://console.firebase.google.com
- **Usada en:** `js/firebase-config.js`
- **Propósito:** Base de datos Firestore para contenido

### 4. Monetization Links
```
DIRECT_LINK_1=https://otieu.com/4/10266840
DIRECT_LINK_2=https://otieu.com/4/10362892
```
- **Usadas en:** `js/app.js`
- **Propósito:** Enlaces de monetización (Play/Servidores)

---

## 🔧 Cómo Agregar en Vercel

### Método 1: Dashboard Web
1. Ve a tu proyecto: https://vercel.com/code-energys-projects/atlascine
2. Click en **Settings** (arriba derecha)
3. Click en **Environment Variables** (menú izquierdo)
4. Agrega cada variable:
   - **Key:** Nombre de la variable (ej: `TMDB_API_KEY`)
   - **Value:** Valor de la variable
   - **Environments:** Selecciona `Production`, `Preview`, `Development`
5. Click **Save**
6. Redeploy el proyecto

### Método 2: Vercel CLI
```bash
vercel env add TMDB_API_KEY
# Ingresa el valor cuando te lo pida
# Selecciona: Production, Preview, Development

vercel env add GEMINI_API_KEY
# Repite para cada variable...
```

### Método 3: Comando Rápido
```bash
# Production
vercel env add TMDB_API_KEY production
vercel env add GEMINI_API_KEY production
vercel env add FIREBASE_API_KEY production
vercel env add FIREBASE_AUTH_DOMAIN production
vercel env add FIREBASE_PROJECT_ID production
vercel env add FIREBASE_STORAGE_BUCKET production
vercel env add FIREBASE_MESSAGING_SENDER_ID production
vercel env add FIREBASE_APP_ID production
vercel env add FIREBASE_MEASUREMENT_ID production
vercel env add DIRECT_LINK_1 production
vercel env add DIRECT_LINK_2 production
```

---

## 🔐 Seguridad

### ⚠️ NUNCA comitees archivos con API keys:
- ❌ `.env`
- ❌ `.env.local`
- ❌ `config.js` con keys reales

### ✅ Archivos seguros para Git:
- ✅ `.env.example` (sin valores reales)
- ✅ `SETUP_VERCEL.md` (instrucciones)

### Verificar .gitignore
```bash
cat .gitignore | grep -E "\.env|config\.js"
```

Debería contener:
```
.env
.env.local
.env*.local
```

---

## 🎯 Verificar Variables en Vercel

### Opción 1: Dashboard
1. Ve a Settings > Environment Variables
2. Verifica que todas estén listadas

### Opción 2: CLI
```bash
vercel env ls
```

### Opción 3: Durante Build
En los logs de build verás:
```
✓ Found 11 environment variables
```

---

## 🔄 Redeploy Después de Agregar Variables

```bash
vercel --prod
```

O desde el dashboard:
1. Deployments tab
2. Click "..." en el último deploy
3. Click "Redeploy"

---

## 📝 Notas Importantes

1. **Las variables de entorno NO se exponen al cliente** (navegador)
2. Para usar en cliente, deben tener prefijo `NEXT_PUBLIC_`
3. Después de cambiar variables, siempre redeploy
4. Las variables son diferentes entre Production/Preview/Development

---

## ✅ Checklist Final

- [ ] Todas las API keys agregadas en Vercel
- [ ] Variables configuradas para Production, Preview, Development
- [ ] Redeploy ejecutado después de agregar variables
- [ ] Archivo `.env.local` eliminado del repo (si existe)
- [ ] `.gitignore` configurado correctamente
- [ ] Build exitoso en Vercel
- [ ] Aplicación funcionando con las variables

---

## 🆘 Troubleshooting

**Error: "API key undefined"**
- Verifica que la variable existe en Vercel
- Redeploy el proyecto
- Revisa el nombre de la variable (case-sensitive)

**Error: "401 Unauthorized"**
- Verifica que la API key sea válida
- TMDB: https://www.themoviedb.org/settings/api
- Gemini: https://aistudio.google.com/app/apikey

**Variables no se cargan:**
- Redeploy obligatorio después de agregar variables
- Limpia caché de Vercel: Settings > General > Clear Cache
