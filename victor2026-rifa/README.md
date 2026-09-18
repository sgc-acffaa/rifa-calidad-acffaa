# Rifa Política de Calidad — ACFFAA 

Página pública: rompecabezas de la política de calidad.
Panel admin: `/admin.html`, protegido por una clave secreta que tú defines.

## Pasos para publicarlo (una sola vez, ~5 minutos)

### 1. Crear el repositorio en GitHub
1. Entra a github.com → "New repository" → nómbralo por ejemplo `rifa-calidad-acffaa`.
2. Déjalo vacío (sin README, sin .gitignore).

### 2. Subir estos archivos
Desde la carpeta donde descomprimiste este zip, abre una terminal y ejecuta:

```
git init
git add .
git commit -m "Rifa política de calidad"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/rifa-calidad-acffaa.git
git push -u origin main
```

(Reemplaza `TU_USUARIO` por tu usuario de GitHub)

### 3. Importar el proyecto en Vercel
1. Entra a vercel.com → "Add New..." → "Project".
2. Elige el repositorio `rifa-calidad-acffaa` que acabas de subir.
3. Framework Preset: déjalo en "Other". No cambies nada más.
4. Click en "Deploy". En menos de un minuto tendrás una URL como
   `https://rifa-calidad-acffaa.vercel.app` (o puedes renombrar el proyecto
   a `victor2026` en Settings → General para que la URL sea `victor2026.vercel.app`).

### 4. Conectar la base de datos (Vercel KV)
1. Dentro del proyecto en Vercel, ve a la pestaña **Storage**.
2. Click en "Create Database" → elige **KV** → plan gratis "Hobby".
3. Conéctala a tu proyecto (Vercel lo hace automático: agrega las variables
   `KV_REST_API_URL` y `KV_REST_API_TOKEN` sin que tengas que copiarlas a mano).

### 5. Definir tu clave secreta de administrador
1. Ve a **Settings → Environment Variables**.
2. Agrega una nueva variable:
   - Name: `ADMIN_SECRET`
   - Value: la palabra secreta que quieras (ej. `choco2026victor`)
3. Guarda, y ve a la pestaña **Deployments** → en el último deployment,
   click en los tres puntos → **Redeploy** (para que tome la nueva variable).

### 6. Listo
- Página para compartir por correo: `https://TU-PROYECTO.vercel.app`
- Tu panel de administrador (solo para ti): `https://TU-PROYECTO.vercel.app/admin.html`
  Ahí pegas la clave que pusiste en `ADMIN_SECRET` y puedes ver la lista
  completa de participantes y sortear un ganador con un clic.

## Notas
- Nadie sin la clave `ADMIN_SECRET` puede leer la lista de participantes
  ni sortear, aunque conozca la URL de `/admin.html`.
- Cualquier persona con el link principal puede jugar y registrarse,
  sin necesitar cuenta de nada (ni Vercel, ni Claude, ni Google).
- Si más adelante quieres cambiar preguntas, colores o textos, edita
  `index.html` y vuelve a hacer `git push` — Vercel redespliega solo.
