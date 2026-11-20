# Fase 4 — Diseño (Paso 04)

## Objetivo
Definir las piezas, los datos, las reglas y los permisos del CRM, y la interfaz.

## Cambios
- `docs/architecture.md` §7–11: componentes (web, worker, Supabase, capa LLM), organización de `src/`, flujos (mensaje entrante, venta, seguimiento, paso a humano), modelo de datos (12 tablas), estados de la conversación, reglas de escalamiento y asignación, ventanas de mensajes, herramientas del agente, robustez y permisos (RLS).
- `docs/architecture.md` §2 y §5: decisión de WhatsApp (Cloud API directo, sin BSP) y costos actualizados (≈ USD 22–65 al mes con 100 chats/día; ≈ 120–185 con 500).
- `docs/design.md`: principios, identidad visual con tokens, pantallas, versión para celular y componentes.
- `CLAUDE.md`: canal de WhatsApp actualizado.

## Validación
- Cada RF de `requirements.md` tiene su flujo, su tabla o su regla en `architecture.md`. Sin código: no aplica typecheck, lint ni tests.
- Precios: 360dialog ≈ €49/mes por número (sitio oficial); transcripción ≈ USD 0,003–0,006/min (OpenAI y agregadores, no coinciden del todo).

## Decisiones
- **WhatsApp por Cloud API directo de Meta**, sin BSP ni coexistencia. El equipo deja la app el día de la migración (decisión del usuario).
- **Marca del negocio** en la interfaz, con tokens CSS (el logo y los colores están pendientes).
- Transcripción con `gpt-4o-mini-transcribe` (OpenAI); imágenes con el modelo de visión del agente.
- Mensajes seguidos del cliente agrupados durante unos 4 s antes de responder.
- La regla de mayorista se aplica en código dentro de `crear_pedido`, no depende del criterio de la IA.

## Pendientes
- Logo y colores de la marca.
- Tarifas oficiales de plantillas de Meta para Colombia; API de EFFI (versión 2); quién mantiene el sistema.
- Plan de migración del número de WhatsApp (Paso 05).
