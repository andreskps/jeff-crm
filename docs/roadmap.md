# Roadmap

Método de seis pasos. Se trabaja **una fase a la vez**; cada una cierra con validación, **un commit** y su registro en `docs/fases/fase-N.md`.

## Pasos de planeación

| Fase | Paso | Objetivo | Estado |
|---|---|---|---|
| 0 | — | Estructura base | ✅ |
| 1 | 01 Descubrimiento | El problema y para quién → [project.md](project.md) | ✅ |
| 2 | 02 Evaluación | Agente, automatización o código; stack y costos → [architecture.md](architecture.md) §1–6 | ✅ |
| 3 | 03 Definición | MVP por etapas y metas → [requirements.md](requirements.md) | ✅ |
| 4 | 04 Diseño | Piezas, datos, reglas y permisos → [architecture.md](architecture.md) §7–11, [design.md](design.md) | ✅ |
| 5 | 05 Planificación | Fases de ejecución, pruebas, requisitos y migración (este archivo) | ✅ |

## Paso 06 — Ejecución

Las semanas son estimadas; la meta es tener **E1 en producción en la semana 3** ([requirements.md §1](requirements.md)). Cada fase depende de las anteriores, salvo donde se indica.

### Etapa E1 — WhatsApp completo (semanas 1–3)

| Fase | Objetivo | Tareas principales | Hecho cuando | Requisitos del usuario |
|---|---|---|---|---|
| **6** 🟡 | Andamiaje | Next.js + TypeScript estricto, ESLint, Prettier, Vitest; entrada del worker; Supabase local; pg-boss; `.env.example`; despliegue de prueba en Railway | `npm run dev` levanta la web y el worker; `npm run typecheck`, `lint` y `test` pasan; la URL de Railway responde | Cuentas de Supabase y Railway |
| **7** | Datos y autenticación | Migraciones de las 12 tablas (§9), RLS (§11), datos de prueba, login, gestión de usuarios y roles | Pruebas de RLS: un vendedor **no** puede leer conversaciones ajenas; un admin sí; login funcionando | — |
| **8** | Capa de IA | Interfaz `LLMProvider` + adaptadores para Anthropic, OpenAI y OpenRouter; herramientas definidas una vez; registro en `llm_calls` con costo; fallback | Pruebas unitarias con proveedor simulado; una prueba real por proveedor devuelve una llamada a herramienta válida y registra su costo | Llaves de Anthropic, OpenAI y OpenRouter |
| **9** | Shopify | Sincronización del catálogo y caché de `products`; `ver_variante` en vivo; `draftOrderCreate` → `invoiceUrl`; webhook `orders/create` con HMAC | El catálogo completo está en `products`; un pedido borrador de prueba devuelve su link; al pagarlo (o marcarlo como pagado) se registra `pedido_pagado` | App personalizada de Shopify con permisos (ver Requisitos) |
| **10** | Canal WhatsApp | Webhook con firma, idempotencia, envío de texto, plantilla e imagen; descarga de medios y transcripción; estados de entrega | Con el **número de prueba de Meta**: se recibe y se responde texto, se transcribe un audio, se guarda una imagen y se envía una plantilla aprobada | App de Meta, WABA, token de usuario del sistema |
| **11** | Agente y reglas | System prompt configurable, 7 herramientas, agrupación de mensajes, reglas de escalamiento, asignación, horario y ventanas (`lib/rules`) | Las pruebas unitarias de `rules` pasan; el **set de evaluación** (ver Pruebas) pasa ≥ 90 % y con 0 precios inventados | Preguntas frecuentes y políticas (borrador) |
| **12** | Bandeja, Inicio y Configuración (UI) | Shell con sidebar y tokens monocromos (design.md), Inicio con KPI y pipeline, Bandeja en tiempo real, Pedidos y Clientes, versión celular, PWA y push, acciones Tomar / Devolver / Cerrar; pantalla de Configuración completa | Un vendedor en el celular recibe el push, toma la conversación, responde y la devuelve a la IA; el admin cambia el horario y los umbrales sin desplegar | Logo y colores (se puede avanzar con provisionales) |
| **13** | Seguimientos | `agendar_seguimiento`, trabajo programado cada 5 min, plantilla si la ventana está cerrada, cancelación cuando el cliente vuelve, pantalla de Seguimientos | Un seguimiento a 2 minutos se envía solo; con la ventana cerrada sale la plantilla; si el cliente escribe antes, se cancela | Plantilla(s) de seguimiento **aprobadas por Meta** |
| **14** | Piloto y salida a producción de E1 | Pruebas de punta a punta en staging, capacitación del equipo, **migración del número** (ver Plan de migración), una semana de monitoreo | Se cumple el "Hecho cuando" de E1: conversación real → pedido pagado atribuido a la IA; un escalamiento llega a la persona correcta; un seguimiento real se envía | Día de migración acordado con el equipo |

### Etapa E2 — Instagram + Messenger (semanas 4–5)

| Fase | Objetivo | Hecho cuando | Requisitos del usuario |
|---|---|---|---|
| **15** | Canales IG y Messenger | Mensajes de IG y Messenger en la misma bandeja, atendidos por la IA; detección de `origen_anuncio`; seguimientos fuera de la ventana → `tarea_humana` | **Permisos aprobados en la App Review de Meta** (`instagram_manage_messages`, `pages_messaging`, en acceso avanzado) |

### Etapa E3 — Métricas (semana 6)

| Fase | Objetivo | Hecho cuando | Requisitos del usuario |
|---|---|---|---|
| **16** | Tablero y alerta de costo | Tablero con las 5 métricas y el costo, con datos reales desde E1; alerta al 80 % del presupuesto (correo o push al admin) | — |

## Pruebas

| Tipo | Qué cubre | Herramienta | Cuándo corre |
|---|---|---|---|
| **Unitarias** | `lib/rules` (escalamiento, asignación, horario, ventanas, umbral de mayorista), adaptadores de canal y de IA con datos fijos | Vitest | En cada cambio y en cada cierre de fase |
| **Integración** | Webhooks con payloads reales guardados (Meta y Shopify) + firmas; RLS con Supabase local; cola de trabajos | Vitest + Supabase local | Al cerrar las fases 7, 9, 10 y 13 |
| **Evaluación del agente** | Unas **30 conversaciones guionadas** (compra simple, mayorista por unidades, por monto y declarado, reclamo, cliente frustrado, pide humano, "te escribo el viernes", pregunta fuera de catálogo, audio, foto de producto, intento de manipular el prompt, "¿eres un robot?"). Verifica **las herramientas llamadas** y las reglas, no la redacción | Script propio + modelo real (con presupuesto acotado) | Al cerrar la fase 11 y al cambiar el prompt o el modelo |
| **Punta a punta** | Lista manual en staging: número de prueba de Meta + tienda Shopify + usuarios de cada rol | Checklist en `tests/e2e-checklist.md` | Antes de cada salida a producción (fases 14, 15 y 16) |

**Umbral para avanzar de la fase 11:** ≥ 90 % de los casos de evaluación correctos y **0** precios o stock que no salgan de una herramienta.

## Requisitos que tiene que entregar el usuario

Algunos tardan días en aprobarse, así que **conviene empezarlos ya**, en paralelo con la fase 6.

| Requisito | Para la fase | Tiempo de espera | Nota |
|---|---|---|---|
| Cuentas de **Supabase** y **Railway** | 6 | Inmediato | |
| Llaves de **Anthropic**, **OpenAI** y **OpenRouter** (con saldo) | 8 | Inmediato | Ponerles límite de gasto en cada consola |
| **App personalizada de Shopify** con permisos `read_products`, `read_inventory`, `write_draft_orders`, `read_orders`, `read_customers` | 9 | Inmediato | Los pedidos borrador no cobran nada al crearlos |
| **App de Meta** (tipo Business) vinculada al Business verificado, **WABA**, usuario del sistema con token permanente | 10 | 1–3 días | Meta da un número de prueba para desarrollar sin tocar el número real |
| **Plantillas de seguimiento** enviadas a revisión de Meta | 13 | Horas o días | Las redacto en la fase 10 para que se aprueben a tiempo |
| **App Review** de Meta para IG y Messenger | 15 | **1–4 semanas** | **El riesgo de plazo más alto de E2.** Hay que pedirla durante E1 |
| Preguntas frecuentes y políticas (envíos, cambios, garantías, pagos) | 11 | Del negocio | Un borrador sirve; luego se editan desde el panel |
| Logo y colores | 12 | Del negocio | |
| Fecha de migración del número y capacitación del equipo | 14 | Del negocio | |

## Plan de migración del número de WhatsApp (fase 14)

Al pasar a la Cloud API **sin coexistencia**, el número deja de funcionar en la app WhatsApp Business del celular.

1. **Antes:** todo el desarrollo y las pruebas se hacen con el **número de prueba de Meta**; el número real sigue en la app.
2. **Preparación:**
   - capacitar al equipo en la PWA;
   - crear los usuarios y roles;
   - instalar la PWA en los celulares;
   - **exportar los chats importantes** de la app (después de migrar no quedan en el teléfono).
3. **Día de la migración**, en un horario de poco tráfico:
   - eliminar la cuenta de WhatsApp Business en la app;
   - registrar el número en la Cloud API (verificación por SMS o llamada);
   - configurar el perfil (nombre, foto, descripción).
4. **Verificación inmediata:** recibir y enviar mensajes reales, comprobar que llega el push al vendedor y que se crea un pedido de prueba.
5. **Primera semana:** la IA atiende con un umbral de escalamiento más sensible y se revisan a diario las conversaciones, los costos y los errores.
6. **Reversa:** volver a la app exige eliminar el número de la API y registrarlo de nuevo en la app. Es posible pero lento, así que solo se migra cuando la fase 14 pasa en staging.

## Riesgos del plan

| Riesgo | Mitigación |
|---|---|
| La App Review de IG y Messenger se demora | Pedirla durante E1; E2 puede correrse sin afectar a E1 |
| Plantillas rechazadas | Redactarlas en la fase 10, en categoría utility cuando aplique, con variantes de respaldo |
| 9 fases para E1 en 3 semanas es ajustado | Si se atrasa, se sale primero sin seguimientos automáticos (fase 13) y se agregan una semana después |
| El costo real de la IA es mayor que el estimado | Medir en la fase 11 con la evaluación; ajustar el prompt, la caché o el modelo por rol desde el panel |
| El equipo se resiste a dejar la app | Capacitación, un ensayo en staging (con el número de prueba) con 1–2 vendedores antes de migrar y una PWA rápida en el celular |
