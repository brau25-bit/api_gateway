# webAPI — API Gateway

Punto de entrada único para el frontend. Recibe todas las peticiones y las redirige mediante proxy HTTP al microservicio correspondiente.

## Responsabilidades

- Enrutar peticiones al servicio de scraping o al servicio de descarga.
- Aplicar rate limiting por ruta.
- Centralizar CORS.

## Tecnología

- Node.js + Express 5
- TypeScript
- `http-proxy`
- `express-rate-limit`

## Instalación

```bash
pnpm install
```

## Uso

```bash
pnpm dev
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8002
MANGA_SERVER=http://localhost:8001/
SCRAPING_SERVER=http://localhost:8000/
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que escucha el gateway |
| `MANGA_SERVER` | URL del servicio `webDownloads` |
| `SCRAPING_SERVER` | URL del servicio `webScrapping` |

## Rutas

| Ruta | Proxy destino | Descripción |
|---|---|---|
| `/api/v1/scraping/*` | `SCRAPING_SERVER` | Búsqueda y scraping de mangas |
| `/api/v1/manga-library/*` | `MANGA_SERVER` | Biblioteca, descargas y estado |

## Rate limiting

| Middleware | Ventana | Límite |
|---|---|---|
| `search` (scraping) | 5 min | 10 req en `/manga/search`, 15 en `/manga`, 5 en `/manga/chapter` |
| `api` (manga-library) | 15 min | 50 req globales |

## Estructura

```
src/
├── config/
│   └── services.config.ts   # URLs de los microservicios
├── middleware/
│   └── scraping.limiter.ts  # Rate limiters
├── proxy/
│   └── proxy.ts             # Clase ProxyClient (http-proxy)
├── routes/
│   ├── scraping.routes.ts   # Rutas /api/v1/scraping
│   └── manga.routes.ts      # Rutas /api/v1/manga-library
└── server.ts                # Entry point
```
