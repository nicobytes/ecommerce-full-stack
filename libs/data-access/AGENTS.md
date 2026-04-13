# Data Access — Capa HTTP compartida

Librería Angular con servicios HTTP para consumir la API REST del backend. Usada por ambas apps (`admin` y `website`).

## Exports públicos

Definidos en `src/index.ts`:

| Export | Tipo | Descripción |
|--------|------|-------------|
| `API_URL` | `InjectionToken<string>` | Token de inyección para la URL base de la API |
| `ProductService` | `Injectable` | Operaciones HTTP sobre productos |
| `CategoryService` | `Injectable` | Operaciones HTTP sobre categorías |

## API_URL Token

Definido en `src/lib/api-url.token.ts`. Cada app provee su valor en `app.config.ts`:

```typescript
{ provide: API_URL, useValue: environment.apiUrl }
```

## Servicios

Cada servicio usa `inject(HttpClient)` e `inject(API_URL)` para construir las URLs de la API.

### ProductService (`src/lib/product.service.ts`)

Consume endpoints bajo `/api/v1/products`. Retorna tipos de `@store/types` (`Product`).

### CategoryService (`src/lib/category.service.ts`)

Consume endpoints bajo `/api/v1/categories`. Retorna tipos de `@store/types` (`Category`).

## Dependencias del workspace

- `@store/types` — interfaces `Product`, `Category` para tipar las respuestas HTTP.

## Estructura

```
libs/data-access/
├── src/
│   ├── index.ts                    # Barrel de exports públicos
│   └── lib/
│       ├── api-url.token.ts        # InjectionToken<string>
│       ├── category.service.ts     # CategoryService
│       └── product.service.ts      # ProductService
├── vite.config.mts                 # Config de Vitest
├── test-setup.ts                   # Setup de tests
└── project.json                    # Targets: test, lint
```

## Convenciones

- Todos los servicios son `@Injectable({ providedIn: 'root' })`.
- Se usa `inject()` function en lugar de constructor injection.
- La URL base se obtiene del token `API_URL`, nunca hardcodeada.
- Los tipos de respuesta siempre se importan desde `@store/types`.
- No hay target `build` — esta librería se consume directamente vía path alias de TypeScript.

## Testing

Usa Vitest con `@nx/vitest:test`. Config en `vite.config.mts` y setup en `test-setup.ts`.

## Comandos

```bash
pnpm nx test data-access     # Tests unitarios
pnpm nx lint data-access     # Linting
```
