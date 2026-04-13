# Website — Tienda pública

Angular 21 con SSR, hidratación incremental, detección de cambios zoneless y plataforma neutral (Cloudflare Workers / Fetch API).

## Arquitectura

Organización domain-driven bajo `src/app/domains/`:

| Dominio | Contenido |
|---------|-----------|
| `products` | Lista de productos (home + por categoría), detalle de producto, componentes `product` y `related` |
| `info` | Páginas About, Locations, 404, componente `wave-audio` |
| `shared` | Layout, Header, Search, Counter, servicios (`CartService`, `MetaTagsService`), pipes, directives |

Todas las páginas usan `loadComponent` (standalone components con lazy-load individual).

## SSR y rendering

- **Entry point**: `src/server.ts` — usa `AngularAppEngine` + `createRequestHandler` con export default `{ fetch: reqHandler }` (plataforma neutral para Workers).
- **Server config**: `src/app/app.config.server.ts` — merge de config base con `provideServerRendering(withRoutes(serverRoutes))`.
- **Render modes** en `src/app/app.routes.server.ts`:
  - `**` → `RenderMode.Server` (SSR por defecto)
  - `locations` → `RenderMode.Client` (solo cliente)
  - `about` → `RenderMode.Prerender` (pre-renderizado estático)
- **Build**: `outputMode: "server"`, `experimentalPlatform: "neutral"` en `project.json`.

## Zoneless y hidratación

- `provideZonelessChangeDetection()` — sin Zone.js, detección de cambios basada en signals.
- `provideClientHydration(withEventReplay(), withIncrementalHydration())` — hidratación incremental con replay de eventos del usuario durante SSR.

## Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `ListComponent` | Home — lista de productos |
| `/category/:slug` | `ListComponent` | Productos filtrados por categoría |
| `/product/:slug` | `ProductDetailComponent` | Detalle de producto |
| `/about` | `AboutComponent` | Página informativa |
| `/locations` | `LocationsComponent` | Ubicaciones (client-only) |
| `**` | `NotFoundComponent` | Página 404 |

Todas las rutas hijas se renderizan dentro de `LayoutComponent` (header + router-outlet).

## Servicios compartidos

| Servicio | Ubicación | Propósito |
|----------|-----------|-----------|
| `CartService` | `domains/shared/services/cart.service.ts` | Gestión del carrito de compras |
| `MetaTagsService` | `domains/shared/services/meta-tags.service.ts` | Meta tags dinámicos para SEO |

## Pipes y directives

| Artefacto | Ubicación | Propósito |
|-----------|-----------|-----------|
| `ReversePipe` | `domains/shared/pipes/reverse.pipe.ts` | Invierte texto |
| `TimeAgoPipe` | `domains/shared/pipes/time-ago.pipe.ts` | Formato "hace X tiempo" |
| `HighlightDirective` | `domains/shared/directives/highlight.directive.ts` | Resaltado de texto |

## Dependencias del workspace

- `@store/data-access` — provee `API_URL` (InjectionToken) configurado desde `environment.apiUrl`.
- `@store/types` — interfaces `Product`, `Category`.

## Path alias

`@store/website/*` mapea a `apps/website/src/*` (definido en `tsconfig.base.json`).

## Archivos clave

| Archivo | Propósito |
|---------|-----------|
| `src/app/app.config.ts` | Providers: router, HTTP (fetch), zoneless, hydration, API_URL |
| `src/app/app.config.server.ts` | Config de servidor: merge con server rendering |
| `src/app/app.routes.ts` | Rutas del cliente con loadComponent |
| `src/app/app.routes.server.ts` | Render modes por ruta (Server/Client/Prerender) |
| `src/server.ts` | Entry SSR: AngularAppEngine + fetch handler |
| `src/main.ts` | Bootstrap del cliente |
| `src/main.server.ts` | Bootstrap del servidor |
| `src/environments/environment.ts` | Config de producción (apiUrl) |

## Convenciones

- Organización por dominios (`domains/`) en lugar de módulos.
- Cada componente es standalone y se carga con `loadComponent` en las rutas.
- No se usa Angular Material — solo Tailwind CSS 4.
- No hay guards ni interceptors HTTP en esta app.
- Los componentes de UI reutilizables van en `domains/shared/components/`.
- `provideHttpClient(withFetch())` — usa Fetch API en lugar de XMLHttpRequest (requerido para SSR neutral).

## Comandos

```bash
pnpm nx serve website        # Dev server con SSR
pnpm nx build website        # Build de producción
pnpm nx test website         # Tests unitarios
pnpm nx lint website         # Linting
```
