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

## Revisión de diseño visual (2026-11-20)
- `docs/design.md` reescrito con dirección **monocroma** (blanco y negro), basada en dos referencias de CRM del usuario y en la marca de jeffshoes.net: Inter, `#1C1C1C` sobre `#FFFEFC`, botón primario en píldora, etiquetas en mayúsculas espaciadas, logo circular.
- Se definieron tokens (claro y oscuro), tipografía, radios, sombras, shell con sidebar, pantallas (Inicio con KPI y pipeline kanban, Bandeja de 3 paneles con tarjeta de pedido embebida, Seguimientos, Pedidos, Clientes, Configuración, Reportes), componentes (shadcn/ui), celular y accesibilidad.
- Alcance: Inicio con KPI y pipeline entra en E1 (fase 12) porque solo lee datos existentes; pantallas de Pedidos y Clientes de solo lectura.
- Validación: marca revisada en vivo (estilos calculados: Inter, `rgb(28,28,28)` y `rgb(255,254,252)`; tema Prestige).
