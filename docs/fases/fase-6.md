# Fase 6 — Andamiaje

**Estado:** hecha en local. **Pendiente:** el despliegue de prueba en Railway, que necesita las cuentas del usuario (ver Pendientes).

## Objetivo
Dejar el proyecto listo para construir: web y worker en un solo paquete TypeScript, base de datos local, cola de trabajos, pruebas y estilo de código.

## Cambios
- **Next.js 16.4.6** (App Router, Turbopack, Tailwind 4) creado con `create-next-app` y movido a la raíz. TypeScript estricto, con `noUncheckedIndexedAccess` y `noImplicitOverride`.
- **Página temporal** (`src/app/page.tsx`) con los tokens monocromos de design.md §3 en `globals.css` y la fuente Inter. La UI real llega en la fase 12.
- **`/api/health`**: responde `{ ok: true }`. Railway lo usa como chequeo de vida.
- **Worker** (`src/worker/index.ts`) con **pg-boss 12**:
  - crea las colas al arrancar;
  - procesa la cola de humo `ping`;
  - cierra ordenado con SIGTERM, que es lo que manda Railway al desplegar.
- **`src/lib/queue.ts`** (nombres de cola y creación de pg-boss) y **`src/lib/env.ts`** (valida las variables de entorno y avisa cuáles faltan).
- **Supabase local** (`supabase/config.toml`, Postgres 17 en Docker).
- **`.env.example`** documentado, con las variables de todas las fases. El `.env` local se generó con las llaves de Supabase local y no se sube al repo.
- **Vitest 5** (`vitest.config.mts`), **Prettier** (ancho 100; no formatea los `.md`) y **ESLint 9** con `eslint-config-next`.
- **`railway/web.json` y `railway/worker.json`**: un servicio por archivo, con build, comando de arranque y política de reinicio.
- **Scripts:**
  - desarrollo: `dev` (web + worker con `concurrently`), `dev:web`, `dev:worker`;
  - producción: `build`, `start`, `worker`, `worker:ping`;
  - calidad: `typecheck` (corre `next typegen` antes de `tsc`), `lint`, `format`, `format:check`, `test`;
  - base local: `db:start`, `db:stop`, `db:status`.
- **CLAUDE.md**: comandos y mapa del repo actualizados.

## Validación
| Comando | Resultado |
|---|---|
| `npm run typecheck` | ✅ sin errores |
| `npm run lint` | ✅ sin errores |
| `npm run format:check` | ✅ |
| `npm test` | ✅ 4 de 4, incluida la de integración: pg-boss encola y recibe un trabajo en Postgres local |
| `npm run build` | ✅ `/` estática y `/api/health` dinámica |
| `npm run dev` | ✅ la web queda lista en :3000 y el worker escucha la cola `ping` |
| `curl localhost:3000/api/health` | ✅ `{"ok":true,...}` |
| `npm run worker:ping` | ✅ el worker recibió el trabajo en unos 1,1 s |

## Decisiones
- **Un solo paquete, sin monorepo.** La web y el worker comparten `src/lib`; los separa el comando de arranque, no la estructura.
- **El worker corre con `tsx` en producción**, sin paso de compilación. Por eso `tsx` está en `dependencies`.
- **pg-boss usa la conexión directa (o session pooler) a Postgres**, no el pooler de transacciones (puerto 6543). pg-boss necesita sesiones.
- **`AGENTS.md`** lo genera y lo vuelve a escribir Next.js. Se sube al repo porque avisa que esta versión de Next cambió APIs.
- **El script de instalación de esbuild se aprobó** (`allowScripts` en `package.json`). Lo necesitan `tsx` y `vitest`.

## Pendientes
- **Despliegue de prueba en Railway** (criterio "la URL de Railway responde"). Necesita:
  1. un proyecto de **Supabase** en la nube, para la `DATABASE_URL` de la conexión directa o session pooler;
  2. un proyecto de **Railway** con dos servicios conectados a este repositorio:
     - `web`, con *Config file* `railway/web.json`;
     - `worker`, con *Config file* `railway/worker.json`;
  3. las variables `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` en ambos servicios.

  Railway despliega desde GitHub, así que antes hay que crear el repositorio remoto. Hoy el repo solo existe en local.
