# 🚀 Guía para Subir AtlasCine a GitHub

## ✅ Commit Local Completado

Tu proyecto ya tiene un commit local con todos los cambios.

```
✅ Commit: 7dd99b7
✅ Mensaje: "🎬 AtlasCine v2.0 - Sistema de Actualización Automática"
✅ Archivos: 31 archivos
✅ Líneas: 8,319 líneas de código
```

---

## 📋 Próximos Pasos para Subir a GitHub

### Opción 1: Crear Repositorio Nuevo en GitHub (Recomendado)

#### 1. **Ir a GitHub**
Ve a: https://github.com/new

#### 2. **Crear el Repositorio**
- **Repository name:** `atlascine` (o el nombre que prefieras)
- **Description:** "🎬 Plataforma de streaming con actualización automática desde TMDB API"
- **Visibility:** Puedes elegir:
  - ✅ **Public** - Si quieres que sea código abierto
  - 🔒 **Private** - Si quieres mantenerlo privado
- **NO** marques:
  - ❌ Add a README file
  - ❌ Add .gitignore
  - ❌ Choose a license

  (Ya los tienes en tu proyecto)

#### 3. **Copiar la URL del Repositorio**
GitHub te mostrará una URL como:
```
https://github.com/TU-USUARIO/atlascine.git
```

#### 4. **Conectar y Subir**

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Ir a la carpeta del proyecto
cd "c:\Users\codee\Desktop\Proyectos_Web_Para_Subir\atlascine"

# Añadir el repositorio remoto (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/atlascine.git

# Subir el código
git push -u origin main
```

**Si te pide credenciales:**
- **Username:** Tu nombre de usuario de GitHub
- **Password:** Usa un **Personal Access Token** (no tu contraseña)

---

### Opción 2: Usar GitHub Desktop (Más Fácil)

#### 1. **Descargar GitHub Desktop**
https://desktop.github.com/

#### 2. **Instalar y Abrir**

#### 3. **Add Local Repository**
- File → Add Local Repository
- Selecciona: `c:\Users\codee\Desktop\Proyectos_Web_Para_Subir\atlascine`

#### 4. **Publish Repository**
- Click en "Publish repository"
- Elige nombre y visibilidad
- Click "Publish"

**¡Listo!** GitHub Desktop se encarga de todo.

---

### Opción 3: Usar GitHub CLI (Para Usuarios Avanzados)

```bash
# Instalar GitHub CLI
# https://cli.github.com/

# Autenticarse
gh auth login

# Crear repositorio y subir
cd "c:\Users\codee\Desktop\Proyectos_Web_Para_Subir\atlascine"
gh repo create atlascine --public --source=. --push
```

---

## 🔑 Crear Personal Access Token (Para git push)

Si usas la terminal (Opción 1), necesitas un token:

### 1. **Ir a GitHub Settings**
https://github.com/settings/tokens

### 2. **Generate New Token**
- Click: "Generate new token (classic)"
- **Note:** "AtlasCine Deploy"
- **Expiration:** 90 days (o lo que prefieras)
- **Scopes:** Marca ✅ `repo` (completo)

### 3. **Copiar el Token**
- GitHub te mostrará el token UNA SOLA VEZ
- Cópialo y guárdalo en un lugar seguro

### 4. **Usar el Token**
Cuando `git push` te pida password, pega el token (no tu contraseña).

---

## 📝 Comandos Útiles

### Ver estado del repositorio
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

### Ver repositorio remoto
```bash
git remote -v
```

### Hacer cambios futuros
```bash
# 1. Hacer cambios en archivos
# 2. Agregar cambios
git add .

# 3. Commit
git commit -m "Descripción de cambios"

# 4. Subir
git push
```

---

## 🌐 Después de Subir

### Tu proyecto estará en:
```
https://github.com/TU-USUARIO/atlascine
```

### Puedes:
- ✅ Ver el código online
- ✅ Compartir el link
- ✅ Clonar en otros equipos
- ✅ Colaborar con otros
- ✅ Hacer deploy directo desde GitHub (Netlify, Vercel, GitHub Pages)

---

## 🚀 Deploy Automático (Opcional)

### GitHub Pages (Gratis)

1. **En tu repositorio de GitHub:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save

2. **Tu sitio estará en:**
   ```
   https://TU-USUARIO.github.io/atlascine
   ```

### Netlify (Recomendado)

1. **Ir a:** https://app.netlify.com/
2. **New site from Git**
3. **Conectar GitHub**
4. **Seleccionar:** atlascine
5. **Deploy settings:**
   - Build command: (dejar vacío)
   - Publish directory: `/` (raíz)
6. **Deploy site**

**Tu sitio estará en:** `https://random-name.netlify.app`

### Vercel

1. **Ir a:** https://vercel.com/
2. **Import Project**
3. **Import Git Repository**
4. **Seleccionar:** atlascine
5. **Deploy**

---

## ⚠️ Antes de Hacer Público

Si vas a hacer el repositorio público, verifica:

### Datos Sensibles a Remover/Ocultar:

1. **API Keys** (si las tienes expuestas)
   - Actualmente las tienes en `js/config.js`
   - Considera usar variables de entorno para producción

2. **Zonas de PropellerAds**
   - Las tienes en `js/ads.js`
   - Está bien si son públicas (generalmente sí)

3. **Información Personal**
   - Emails, nombres, etc. en comentarios

### Si quieres ocultar algo:

```bash
# NO hagas commit de archivos sensibles
echo "config.local.js" >> .gitignore
git add .gitignore
git commit -m "Actualizar gitignore"
```

---

## 📊 README para GitHub

Tu proyecto ya tiene un excelente `README.md` que se mostrará en GitHub.

Incluye:
- ✅ Descripción del proyecto
- ✅ Características
- ✅ Instalación
- ✅ Configuración
- ✅ Documentación

**Se verá profesional en GitHub.** 🎉

---

## 🤝 Licencia (Opcional)

Si quieres añadir una licencia:

```bash
# Crear archivo LICENSE
# Puedes usar: MIT, Apache 2.0, GPL, etc.

# Ejemplo MIT License:
https://choosealicense.com/licenses/mit/
```

---

## ✅ Checklist Final

Antes de subir:

- [x] Commit local hecho
- [x] .gitignore creado
- [x] README.md creado
- [ ] Repositorio creado en GitHub
- [ ] git remote add origin
- [ ] git push
- [ ] Verificar que se vea bien en GitHub

---

## 💡 Consejos

1. **Nombre del repositorio:**
   - Usa minúsculas: `atlascine` ✅
   - Evita espacios: `atlas-cine` ✅
   - No uses caracteres especiales

2. **Descripción:**
   - Usa emojis para destacar: "🎬 Plataforma de streaming..."
   - Menciona tecnologías: "JavaScript, TMDB API, etc."

3. **Topics (etiquetas):**
   Añade en GitHub:
   - `streaming`
   - `tmdb-api`
   - `movies`
   - `javascript`
   - `netlify`

4. **README.md:**
   - Ya lo tienes perfecto
   - GitHub lo mostrará automáticamente

---

## 🆘 Solución de Problemas

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/atlascine.git
```

### "Permission denied"
- Usa Personal Access Token en vez de contraseña
- O configura SSH keys

### "Updates were rejected"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📞 Siguiente Paso

**Ejecuta estos comandos:**

```bash
# 1. Ir a la carpeta
cd "c:\Users\codee\Desktop\Proyectos_Web_Para_Subir\atlascine"

# 2. Crear repositorio en GitHub primero
# https://github.com/new

# 3. Conectar (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/atlascine.git

# 4. Subir
git push -u origin main

# 5. Ingresar credenciales cuando te pida
# Username: tu-usuario
# Password: tu-personal-access-token
```

**¡Tu proyecto estará en GitHub!** 🎉
