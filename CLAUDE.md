# CLAUDE.md — CRM JEFF

> Memoria del proyecto: lo primero que Claude lee en cada sesión. Mantenerlo corto y actualizado.

## Qué es
CRM propio para un negocio de productos físicos (Colombia) que centraliza WhatsApp, Instagram y Messenger; un agente de IA vende de punta a punta, hace seguimientos y pasa a humano cuando hace falta. Ver [docs/project.md](docs/project.md).

## Stack
Aprobado: TypeScript, Next.js (PWA), Supabase, worker con pg-boss, Railway; IA multi-proveedor (Anthropic por defecto con Claude Haiku 5.5, OpenAI, OpenRouter); Shopify Admin API; WhatsApp Cloud API (directo de Meta, sin BSP), IG/Messenger Graph API. Ver [docs/architecture.md](docs/architecture.md).

## Comandos
| Acción | Comando |
|---|---|
| Instalar | `npm install` y copiar `.env.example` a `.env` |
| Base local | `npm run db:start` (Supabase en Docker) |
| Desarrollo | `npm run dev` (web en :3000 + worker) |
| Tests | `npm test` (las de integración necesitan `db:start`) |
| Lint / typecheck / formato | `npm run lint`, `npm run typecheck`, `npm run format:check` |

## Mapa del repo
- `docs/` — contexto: qué se construye, por qué y cómo (leer antes de cambios grandes).
- `.claude/` — reglas, skills y agentes del proyecto.
- `src/` — código: `app/` (Next.js), `worker/` (pg-boss), `lib/` (compartido).
- `supabase/` — config y migraciones de Supabase local.
- `railway/` — config de despliegue de los servicios web y worker.
- `AGENTS.md` — lo genera Next.js: esta versión de Next cambia APIs; leer `node_modules/next/dist/docs/` antes de usar una API nueva.
- `tests/` — pruebas.

## Cómo trabajamos
- Idioma: español para docs, commits y conversación.
- Se trabaja por fases según [docs/roadmap.md](docs/roadmap.md); registro de cada fase en `docs/fases/fase-N.md`.
- Reglas detalladas en `.claude/rules/`.
