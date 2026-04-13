# Types — Interfaces del dominio

Librería TypeScript pura con las interfaces compartidas del dominio. Usada por `data-access`, `admin` y `website`.

## Interfaces

Definidas en `src/lib/types.ts` y re-exportadas desde `src/index.ts`:

| Interface | Campos | Uso |
|-----------|--------|-----|
| `Category` | `id`, `name`, `image`, `slug?` | Categorías de productos |
| `Product` | `id`, `title`, `price`, `description`, `images`, `category`, `slug?`, `creationAt?` | Productos del catálogo |
| `User` | `id`, `name`, `email` | Usuarios del sistema |
| `LoginRta` | `access_token` | Respuesta del endpoint de login |

## Dependencias del workspace

Ninguna. Esta es la librería base del grafo de dependencias.

## Estructura

```
libs/types/
├── src/
│   ├── index.ts           # Barrel de exports
│   └── lib/
│       └── types.ts       # Todas las interfaces
├── package.json           # main/types apuntando al build
├── tsconfig.json          # Config base
├── tsconfig.lib.json      # Config de build
└── project.json           # Target: build (@nx/js:tsc)
```

## Build

Se compila con `@nx/js:tsc` a `dist/libs/types`. El `package.json` de la librería define `main` y `types` apuntando a los artefactos compilados.

## Convenciones

- Solo contiene interfaces y types de TypeScript. No incluir lógica de negocio, servicios ni utilidades.
- Todas las interfaces se definen en `src/lib/types.ts` y se re-exportan desde `src/index.ts`.
- Los campos opcionales se marcan con `?` (por ejemplo `slug?`, `creationAt?`).
- Al agregar una nueva entidad del dominio, definir la interface aquí y re-exportarla desde el barrel.
- Importar siempre desde `@store/types` (nunca con ruta relativa al lib).

## Comandos

```bash
pnpm nx build types          # Build con tsc
```
