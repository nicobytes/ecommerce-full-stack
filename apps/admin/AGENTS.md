# Admin — Panel de administración

SPA Angular 21 (browser-only, sin SSR) con Angular Material y Tailwind CSS 4.

## Arquitectura

Módulos lazy-loaded organizados bajo `src/app/modules/`:

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| `auth` | `/auth/login` | Login con JWT |
| `admin` | `/admin` | Layout principal (sidebar + toolbar) |
| `dashboard` | `/admin/dashboard` | Panel principal |
| `categories` | `/admin/categories` | CRUD de categorías |
| `products` | `/admin/products` | CRUD de productos |
| `users` | `/admin/users` | Gestión de usuarios |

La ruta raíz (`/`) redirige a `/auth/login`. Todas las rutas bajo `/admin` están protegidas por `authGuardFn`.

## Autenticación

- **Guard**: `src/app/guards/auth-fn.guard.ts` — `CanActivateFn` que valida el token con `TokenService`; redirige a `/auth/login` si no hay token.
- **Interceptor**: `src/app/interceptors/token.interceptor.ts` — agrega `Authorization: Bearer <token>` a cada request HTTP. Registrado con `HTTP_INTERCEPTORS` + `withInterceptorsFromDi()`.
- **Servicios**: `AuthService` (login/logout), `TokenService` (almacenamiento del JWT), `UserService` (datos del usuario).

## UI y estilos

- **Angular Material** con tema prebuilt `indigo-pink.css` (incluido en `project.json` styles).
- **Tailwind CSS 4** importado en `src/styles.css` con `@import 'tailwindcss'`.
- **Animaciones** habilitadas con `provideAnimationsAsync()`.

## Dependencias del workspace

- `@store/data-access` — provee `API_URL` (InjectionToken) configurado desde `environment.API_URL`.
- `@store/types` — interfaces `Product`, `Category`, `User`, `LoginRta`.

## Path alias

`@store/admin/*` mapea a `apps/admin/src/*` (definido en `tsconfig.base.json`).

## Archivos clave

| Archivo | Propósito |
|---------|-----------|
| `src/app/app.config.ts` | Providers: router, HTTP, Material animations, API_URL |
| `src/app/app.routes.ts` | Rutas raíz: auth, admin (lazy) |
| `src/app/guards/auth-fn.guard.ts` | Guard funcional de autenticación |
| `src/app/interceptors/token.interceptor.ts` | Interceptor JWT |
| `src/app/services/auth.service.ts` | Login/logout contra la API |
| `src/app/services/token.service.ts` | Gestión del token en storage |
| `src/app/services/ui.service.ts` | Estado de UI (sidebar, loading) |
| `src/app/modules/admin/admin.routes.ts` | Sub-rutas del área admin |
| `src/environments/environment.ts` | Config de producción (API_URL) |

## Convenciones

- Cada módulo tiene su propio archivo de rutas (`*.routes.ts`) y lazy-load vía `loadChildren`.
- Las páginas van en `modules/<modulo>/pages/` y los componentes reutilizables en `modules/<modulo>/components/`.
- Los servicios globales de la app van en `src/app/services/`.
- Se usa class-based `HttpInterceptor` (no functional interceptor) con `withInterceptorsFromDi()`.

## Comandos

```bash
pnpm nx serve admin          # Dev server en http://localhost:4200
pnpm nx build admin          # Build de producción
pnpm nx test admin           # Tests unitarios
pnpm nx lint admin           # Linting
```
