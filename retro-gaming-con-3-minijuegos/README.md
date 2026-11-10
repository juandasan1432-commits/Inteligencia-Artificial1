# RETRO GAMING · versión independiente

Sitio estático de un solo archivo (`index.html`). No necesita servidor, build ni dependencias.

## Probarlo en tu PC

Abre `index.html` con doble clic. Para el panel de administración, agrega `?admin=1` a la URL.

## Desplegarlo

- **Netlify:** entra a app.netlify.com/drop y arrastra esta carpeta.
- **Vercel:** `npm i -g vercel` y luego `vercel` dentro de esta carpeta.
- **GitHub Pages:** sube la carpeta a un repositorio, ve a Settings > Pages y elige la rama `main`.

## Diferencias con la versión de claude.ai

| | claude.ai | Esta versión |
|---|---|---|
| Datos | Base de datos compartida | `localStorage` de cada navegador |
| Comunidad | Todos ven las reseñas de todos | Cada visitante ve solo las suyas |
| Admin | Solo editores | Cualquiera con `?admin=1` (afecta solo a su navegador) |
| Recomendaciones IA | Sí | No (requiere el runtime de claude.ai) |
| Subir portadas | Sí | No (requiere almacenamiento de archivos) |

Para tener comunidad compartida, usuarios reales y admin protegido, el siguiente paso es conectar Supabase con `schema.sql`.


## Zona de minijuegos (3 juegos)

Abre `index.html` con Live Server y ve a **Minijuegos 🎮**. Elige Air Superiority 3D, Pixel Champions 2P u Operación Lince. Los HTML de los juegos deben permanecer junto a `index.html`. Cada juego se carga dentro de la página de forma independiente.
