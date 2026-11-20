# Fase 2 — Evaluación (Paso 02)

## Objetivo
Decidir para cada pieza si la resuelve un agente, una automatización o código; elegir el stack y estimar el costo frente al presupuesto.

## Cambios
- `docs/architecture.md`: tabla agente/automatización/código, restricciones de los canales (ventanas de 24 h, plantillas, coexistencia), comparación de modelos de IA, stack propuesto, costo mensual estimado, riesgos y fuentes.
- `CLAUDE.md`: stack propuesto.

## Validación
- Precios de Claude tomados del skill oficial de la API de Anthropic.
- Tarifas de WhatsApp, coexistencia y ventanas de IG/Messenger: búsqueda web (Meta y proveedores). Las fuentes no coinciden en las tarifas de Colombia; queda pendiente confirmarlas.
- Shopify `draftOrderCreate` → `invoiceUrl`: verificado en la documentación oficial (Context7, Admin GraphQL 2026-01).
- Costos de IA: **estimados con supuestos**, no medidos.

## Decisiones (propuestas, a confirmar por el usuario)
- TypeScript + Next.js (PWA) + Supabase + worker con pg-boss, en Railway.
- Agente con Claude Haiku 5.5 y prompt caching.
- Cobro con pedido borrador de Shopify + `invoiceUrl`, para no integrar cada pasarela.
- WhatsApp por coexistencia a través de un BSP.

## Pendientes
- Confirmación del usuario: modelo de IA, BSP y hosting.
- API de EFFI; tarifas oficiales de Meta para Colombia; si `HUMAN_AGENT` aplica en IG.
