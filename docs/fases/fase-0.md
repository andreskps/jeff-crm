# Fase 0 — Estructura base

## Objetivo
Dejar lista la estructura de carpetas y documentación base del proyecto antes de definir el producto.

## Cambios
- `CLAUDE.md` y `README.md` con secciones plantilla.
- `docs/`: `project.md`, `requirements.md`, `architecture.md`, `design.md`, `roadmap.md` (plantillas).
- `.claude/rules/convenciones.md`; carpetas `.claude/skills/` y `.claude/agents/`.
- Carpetas `src/` y `tests/` (con `.gitkeep`).
- `.gitignore` (dependencias, builds, `.env`, `.claude/settings.local.json`).

## Validación
- `find . -type f` → todos los archivos de la estructura presentes.
- No hay código aún: no aplica typecheck, lint ni tests.

## Decisiones
- Docs en español.
- Registro de fases en `docs/fases/fase-N.md`.

## Pendientes
- Definir qué es el CRM, usuarios y alcance (`docs/project.md`).
- Elegir stack (`docs/architecture.md`).
