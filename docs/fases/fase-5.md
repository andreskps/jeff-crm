# Fase 5 — Planificación (Paso 05)

## Objetivo
Convertir el diseño en fases de ejecución, cada una con su "Hecho cuando", y definir las pruebas, los requisitos del usuario y la migración del número.

## Cambios
- `docs/roadmap.md`: fases de ejecución 6–16 (E1: 6–14, E2: 15, E3: 16) con tareas, "Hecho cuando" y requisitos; estrategia de pruebas (unitarias, integración, evaluación del agente, punta a punta); requisitos del usuario con sus tiempos de espera; plan de migración del número de WhatsApp; riesgos del plan.

## Validación
- Cada etapa de `requirements.md` queda cubierta por al menos una fase con un "Hecho cuando" que se puede comprobar.
- Sin código: no aplica typecheck, lint ni tests.

## Decisiones
- 11 fases de ejecución, una por commit.
- Desarrollo con el número de prueba de Meta; el número real solo se migra en la fase 14.
- Umbral para pasar la fase 11: ≥ 90 % de la evaluación y 0 precios inventados.
- Plan B si E1 se atrasa: salir sin seguimientos automáticos y agregarlos una semana después.

## Pendientes (del usuario, conviene empezarlos ya)
- Cuentas de Supabase y Railway; llaves de Anthropic, OpenAI y OpenRouter.
- App personalizada de Shopify; app de Meta, WABA y token.
- Pedir la App Review de IG y Messenger durante E1.
- Preguntas frecuentes, políticas, logo y colores.
