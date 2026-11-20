# Arquitectura — Evaluación (Paso 02)

> Evaluación del 2026-11-20. Para cada pieza del CRM se decide si la resuelve un **agente de IA**, una **automatización** o **código**, y se elige el stack con un costo estimado. El diseño detallado (modelo de datos, reglas y permisos) queda para el Paso 04.

## 1. ¿Agente, automatización o código?

Regla aplicada: **lo determinístico va en código**, **lo programado o disparado por eventos va en automatizaciones** y **solo lo que exige entender lenguaje lo hace el agente**. El agente nunca decide precios, stock ni permisos: los consulta por medio de herramientas.

| Pieza | Tipo | Cómo |
|---|---|---|
| Recibir y enviar mensajes de WhatsApp, IG y Messenger | Código | Webhooks de Meta → cola → base de datos; envío por la Graph API |
| Bandeja unificada, historial y ficha del cliente | Código | App web responsive con tiempo real |
| Roles y permisos (admin, vendedor, logística) | Código | Autenticación y reglas por fila en la base de datos |
| Atender, recomendar, cotizar y cerrar | **Agente** | Modelo de IA con herramientas: `buscar_producto`, `ver_stock_precio`, `crear_pedido_y_link`, `agendar_seguimiento`, `escalar_a_humano`, `marcar_mayorista` |
| Detectar "te escribo la próxima semana" | **Agente** | La herramienta `agendar_seguimiento(fecha, motivo)` se llama desde la conversación |
| Enviar el seguimiento el día acordado | Automatización | Tarea programada que reactiva al agente con el contexto (plantilla de WhatsApp si pasaron más de 24 h) |
| Decidir cuándo pasar a humano | Híbrido | **Reglas en código** (pide humano, reclamo, mayorista, monto mayor a X) **+ señal del agente** (`escalar_a_humano` cuando no sabe o el cliente está frustrado) |
| A quién se asigna | Código | Mayorista → dueño; normal → vendedores en rotación; reclamo → logística |
| Cobro (Bold, Addi, Sistecrédito, Wompi, contraentrega) | Código + Shopify | El agente crea un **pedido borrador en Shopify** (`draftOrderCreate`) y envía su `invoiceUrl`. El cliente paga en el checkout de Shopify con las pasarelas que la tienda ya tiene, **sin integrar cuatro pasarelas** |
| Confirmar el pago y la venta | Automatización | Webhook `orders/create` de Shopify → la venta queda atribuida a la IA o al vendedor |
| Catálogo, precio y stock | Automatización | Sincronización con Shopify por webhooks y caché local para búsquedas rápidas |
| Pedido en EFFI | Automatización (**bloqueada**) | Depende de que EFFI tenga API. Fuera del MVP hasta confirmarlo |
| Avisar el estado del envío | Automatización | Después del MVP (depende de la transportadora o de EFFI) |
| Métricas | Código | Consultas SQL y un tablero en la app |

## 2. Restricciones de los canales (definen el diseño)

| Canal | Ventana libre | Fuera de la ventana | Impacto |
|---|---|---|---|
| WhatsApp (Cloud API) | 24 h desde el último mensaje del cliente. Respuestas gratis | Solo **plantillas aprobadas**: marketing ≈ USD 0,0125 por mensaje en Colombia; utilidad ≈ USD 0,0008 (cifras de terceros, hay que confirmarlas en la tarifa de Meta) | Los seguimientos de "la próxima semana" son plantillas de marketing **pagas** |
| Instagram DM / Messenger | 24 h. Hasta **7 días** si el chat nació de un anuncio Click-to-Direct o Click-to-Messenger (desde el 28-sep-2026) | Etiqueta `HUMAN_AGENT` (7 días) **solo para humanos y solo para soporte**, no para ventas automáticas | **En IG y Messenger la IA no puede hacer seguimiento automático pasados 7 días.** Hay que pedir al cliente que pase a WhatsApp o dejar una tarea para el vendedor |

**Migración del número de WhatsApp.** Meta ofrece **coexistencia**: el mismo número sigue funcionando en la app WhatsApp Business y en la API al tiempo. Requisitos según los proveedores:
- app versión 2.24.17 o superior;
- conexión por *Embedded Signup* de un **Tech Provider o un BSP** (360dialog, por ejemplo);
- el número no puede haber estado antes en la API;
- desvincula los dispositivos acompañantes.

Recomendación: **usar coexistencia mediante un BSP de bajo costo**, para no cortar la operación del equipo el día uno. Hay que confirmar la tarifa del BSP elegido en el Paso 03.

## 3. Modelo de IA

| Modelo | Entrada / salida (USD por millón de tokens) | Costo/mes estimado a 500 chats/día |
|---|---|---|
| **Claude Haiku 5.5** | 0,10 / 0,50 | **≈ USD 40–90** |
| Claude Sonnet 5.5 | 2,00 / 10,00 (lectura de caché 0,10) | ≈ USD 500+ |
| Claude Opus 5.5 | 4,00 / 20,00 | ≈ USD 1.000+ |

Supuestos de la estimación:
- 15.000 conversaciones al mes, 8 turnos por conversación y 1,5 llamadas al modelo por turno por las herramientas;
- unos 5.000 tokens de entrada por llamada, de los cuales unos 4.000 son system prompt y catálogo en caché;
- 400 tokens de salida, contando el razonamiento.

**Hay que medirlo con conversaciones reales en el Paso 06.**

**Recomendación:** **Haiku 5.5 como agente principal**, con esfuerzo bajo y *prompt caching*. Es lo único que cabe en el presupuesto con este volumen. Opción a evaluar: escalar a Sonnet 5.5 solo en los turnos difíciles (negociaciones o casos que estén a punto de pasar a humano), con un tope de uso. **Decisión del usuario.**

Para que el agente no invente nada: precio, stock y link de pago **siempre salen de herramientas**. Nunca del texto del modelo.

## 4. Stack propuesto

| Capa | Tecnología | Por qué |
|---|---|---|
| Lenguaje | **TypeScript** de punta a punta | Un solo lenguaje para el front, el back y el agente. SDKs oficiales de Anthropic y Shopify |
| App web | **Next.js** (PWA responsive) | Funciona en computador y celular, y se instala con notificaciones push. Sin app nativa |
| Base de datos, auth, tiempo real y archivos | **Supabase** (Postgres) | Bandeja en tiempo real, reglas por fila para los roles, almacenamiento de imágenes y audios, y `pg_cron` para tareas programadas |
| Cola y worker | Worker Node con cola sobre Postgres (pg-boss) | Los webhooks responden de inmediato a Meta y el agente procesa en segundo plano. No hace falta otro servicio pago |
| IA | **API de Anthropic**: Claude Haiku 5.5 con *tool use* y *prompt caching* | Costo y latencia bajos |
| Canales | WhatsApp Cloud API (vía BSP con coexistencia) e Instagram/Messenger Graph API | APIs oficiales, sin riesgo de bloqueo |
| Comercio | **Shopify Admin GraphQL API** | Catálogo, stock, pedidos borrador e `invoiceUrl` |
| Hosting | **Railway** (app y worker) | Un proyecto, unos USD 5–20 al mes, admite procesos que se quedan corriendo (el worker) |

**Descartado:**
- Montarlo sobre Chatwoot: el usuario eligió desarrollo a la medida.
- Vercel: el plan gratuito no permite uso comercial y no corre workers permanentes.
- Una app nativa: no hace falta.

## 5. Costo mensual estimado

| Rubro | 100 chats/día | 500 chats/día |
|---|---|---|
| IA (Haiku 5.5) | USD 8–20 | USD 40–90 |
| WhatsApp: respuestas | 0 | 0 |
| WhatsApp: plantillas de seguimiento (≈ 1 de cada 5 conversaciones) | ≈ USD 8 | ≈ USD 40 |
| BSP de WhatsApp | USD 0–50 (depende del proveedor) | USD 0–50 |
| Supabase | USD 0–25 | USD 25 |
| Railway | USD 5–10 | USD 10–20 |
| **Total** | **≈ USD 20–110** | **≈ USD 115–225** |

**Conclusión:** los menos de USD 100 al mes **alcanzan con un volumen bajo o medio**. Con 500 chats al día se pasa del presupuesto. Opciones para controlarlo:
- limitar las plantillas de seguimiento;
- ajustar el prompt y la caché;
- elegir un BSP sin cuota mensual;
- revisar el presupuesto cuando el CRM demuestre ventas recuperadas.

Esto se decide en el Paso 03.

## 6. Riesgos que siguen abiertos

1. **EFFI**: no se encontró información pública de su API. Hay que preguntarle al proveedor.
2. **Tarifas de WhatsApp**: las fuentes de terceros no coinciden. Hay que confirmarlas en la tarifa oficial de Meta.
3. **Coexistencia**: hay que validar que el número cumpla los requisitos y elegir el BSP.
4. **Etiqueta `HUMAN_AGENT`**: la documentación de Meta se contradice sobre si aplica a Instagram. Hay que verificarlo antes de depender de ella.

## Fuentes
- Tarifas de WhatsApp: [Meta — Pricing](https://developers.facebook.com/docs/whatsapp/pricing), [Zernio](https://zernio.com/blog/whatsapp-business-api-pricing), [ManyChat](https://help.manychat.com/hc/en-us/articles/14281380243740), [Sent.dm](https://docs.sent.dm/docs/guides/whatsapp-pricing)
- Coexistencia: [Meta — Onboarding Business App users](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users), [360dialog](https://docs.360dialog.com/docs/resources/phone-numbers/coexistence), [Infobip](https://www.infobip.com/docs/whatsapp/manage-integration/coexistence), [Telnyx](https://developers.telnyx.com/docs/messaging/whatsapp/coexistence)
- Ventanas de IG y Messenger: [Meta — Messenger/IG policy](https://developers.facebook.com/documentation/business-messaging/messenger-platform/policy), [Meta — Send API](https://developers.facebook.com/docs/messenger-platform/reference/send-api), [Spur — ventana de 7 días](https://www.spurnow.com/es/blogs/instagram-messenger-ads-7-day-messaging-window)
- Shopify: [draftOrderCreate / invoiceUrl](https://shopify.dev/docs/api/admin-graphql/2026-01/queries/draftOrder)
- Precios de Claude: tabla del skill oficial de la API de Anthropic (consultada el 2026-11-20)
