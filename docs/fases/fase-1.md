# Fase 1 — Descubrimiento (Paso 01)

## Objetivo
Entender el problema, para quién es el CRM y cómo debería funcionar, antes de evaluar herramientas.

## Cambios
- `docs/project.md`: resultado completo de la entrevista (negocio, dolores, roles, visión del agente de IA, paso a humano, seguimiento, postventa, métricas, restricciones, riesgos y preguntas abiertas).
- `docs/roadmap.md`: organizado según el método de seis pasos.

## Validación
- Entrevista de 6 rondas con el usuario; todas las respuestas quedaron en `docs/project.md`.
- No hay código: no aplica typecheck, lint ni tests.

## Decisiones
- CRM a la medida para un solo negocio (productos físicos, Colombia).
- Canales: WhatsApp (pasa a la API oficial), Instagram DM y Messenger.
- La IA vende de punta a punta. Nombre de marca; si le preguntan de verdad, no niega ser IA.
- Mayoristas → dueño; clientes normales → vendedores.
- Web responsive, sin app nativa.

## Pendientes
- Responder las preguntas abiertas de `docs/project.md` (API de EFFI, regla de mayorista, horarios, transportadora, etc.).
- Paso 02: evaluar costos frente al presupuesto de menos de USD 100 al mes y elegir el stack.
