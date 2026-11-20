# Requerimientos — Definición (Paso 03)

> Definición del 2026-11-20: alcance del MVP y criterios de éxito. Se basa en [project.md](project.md) (descubrimiento) y [architecture.md](architecture.md) (evaluación).

## 1. Alcance del MVP: entregas por etapas

El MVP incluye los **3 canales** y las **4 piezas clave**. Se entrega **por etapas** para que el negocio use el CRM desde la primera entrega.

| Etapa | Semanas (estimado) | Qué entra | Hecho cuando |
|---|---|---|---|
| **E1 — WhatsApp completo** | 1–3 | Bandeja, IA que vende con link de Shopify, paso a humano con asignación, seguimientos automáticos, notas de voz e imágenes, roles, panel de configuración, registro de eventos y costos | Una conversación real de WhatsApp termina en un pedido pagado de Shopify atribuido a la IA, un caso pasa a humano y lo atiende la persona correcta, y un seguimiento agendado se envía solo en su fecha |
| **E2 — Instagram + Messenger** | 4–5 | Los mismos flujos de E1 en IG DM y Messenger, respetando sus ventanas de mensajes | Conversaciones de IG y de Messenger aparecen en la misma bandeja y la IA las atiende; los seguimientos de más de 7 días quedan como tarea para un humano |
| **E3 — Métricas** | 6 | Tablero de métricas y de costo, con alerta de presupuesto | El tablero muestra las 5 métricas de la sección 4 con datos reales desde E1 |

**Desde E1 se registran todos los eventos** (mensajes, escalamientos, seguimientos, pedidos, costos). Así el tablero de E3 sale con historia y no arranca en blanco.

## 2. Requerimientos funcionales

### Canales y bandeja
| ID | Requerimiento | Etapa |
|---|---|---|
| RF-01 | Recibir y enviar mensajes de WhatsApp (Cloud API, número en coexistencia vía BSP) | E1 |
| RF-02 | Recibir y enviar mensajes de Instagram DM y Facebook Messenger | E2 |
| RF-03 | Bandeja unificada en tiempo real: lista de conversaciones con canal, estado (IA, humano, en cola, cerrada) y responsable | E1 |
| RF-04 | Ficha del cliente: datos, historial de todos los canales, pedidos de Shopify y seguimientos | E1 |
| RF-05 | App web responsive, instalable en el celular (PWA) y con notificaciones push al asignar una conversación | E1 |

### Agente de IA
| ID | Requerimiento | Etapa |
|---|---|---|
| RF-10 | La IA responde, recomienda y cotiza **solo con datos de las herramientas** (catálogo, precio y stock de Shopify). Nunca inventa precios ni disponibilidad | E1 |
| RF-11 | La IA crea un pedido borrador en Shopify y envía su link de pago (`invoiceUrl`). El cliente paga con cualquier pasarela que tenga la tienda, o contraentrega | E1 |
| RF-12 | La IA entiende **notas de voz** (transcripción) e **imágenes** (foto de un producto o comprobante de pago) | E1 |
| RF-13 | Base de conocimiento editable desde el panel: preguntas frecuentes y políticas (envíos, cambios, garantías, medios de pago). El catálogo se sincroniza desde Shopify | E1 |
| RF-14 | **Nombre, tono y personalidad del agente configurables** desde el panel. Si un cliente pregunta de verdad si habla con una IA, el agente no lo niega | E1 |
| RF-15 | Modelo de IA configurable por rol (principal, escalamiento, utilitario, respaldo) entre Anthropic, OpenAI y OpenRouter | E1 |

### Paso a humano y asignación
| ID | Requerimiento | Etapa |
|---|---|---|
| RF-20 | Pasar a humano cuando el cliente lo pide o se frustra, cuando la IA no sabe o tiene baja confianza, en un reclamo o devolución, o con un pedido mayorista | E1 |
| RF-21 | **Mayorista** cuando se cumple al menos una: cantidad de unidades ≥ *umbral configurable*, monto del pedido ≥ *umbral configurable*, o el cliente pide precio por mayor, distribución o reventa | E1 |
| RF-22 | Asignación: mayorista → **dueño**; reclamo, devolución o envío → **logística/soporte**; resto → **vendedores en rotación** | E1 |
| RF-23 | Al pasar a humano, la IA deja un **resumen** de la conversación para quien la recibe | E1 |
| RF-24 | **Horario de atención configurable.** Fuera de horario, la IA le dice al cliente cuándo lo atienden, sigue resolviendo lo que pueda y deja la conversación en cola, asignada | E1 |
| RF-25 | El humano puede devolverle la conversación a la IA | E1 |

### Seguimientos
| ID | Requerimiento | Etapa |
|---|---|---|
| RF-30 | La IA detecta los compromisos de tiempo ("la próxima semana", "el viernes", "cuando me paguen") y agenda un seguimiento con fecha y motivo | E1 |
| RF-31 | El día agendado, la IA escribe sola con el contexto. Si pasaron más de 24 h en WhatsApp, usa una **plantilla aprobada** | E1 |
| RF-32 | En IG y Messenger, si el seguimiento cae fuera de la ventana permitida, se crea una **tarea para un humano** o se invita al cliente a seguir por WhatsApp | E2 |
| RF-33 | Lista de seguimientos pendientes, vencidos y cumplidos, por responsable | E1 |

### Roles
| ID | Requerimiento | Etapa |
|---|---|---|
| RF-40 | **Admin/dueño**: ve todo, configura la IA, los umbrales y el horario, y atiende a los mayoristas | E1 |
| RF-41 | **Vendedor**: ve solo sus conversaciones y clientes asignados | E1 |
| RF-42 | **Logística/soporte**: ve los reclamos, devoluciones y consultas de envío asignados | E1 |

### Métricas y costos
| ID | Requerimiento | Etapa |
|---|---|---|
| RF-50 | Registrar los eventos: mensaje, primera respuesta, escalamiento, seguimiento agendado o enviado, pedido creado o pagado (con atribución IA o vendedor) | E1 |
| RF-51 | Registrar el costo de cada llamada a la IA y de cada plantilla de WhatsApp | E1 |
| RF-52 | Tablero con las métricas de la sección 4, filtrable por fecha, canal y vendedor | E3 |
| RF-53 | Tablero de costo mensual y **alerta al 80 % del presupuesto** (USD 100). Nada se apaga solo; decide el dueño | E3 |

## 3. Requerimientos no funcionales

| ID | Requerimiento |
|---|---|
| RNF-01 | Primera respuesta de la IA **< 30 s en el 95 % de los mensajes**, 24/7 |
| RNF-02 | Los webhooks de Meta y Shopify responden en < 2 s y procesan en cola. No se pierden mensajes si falla la IA (reintentos y proveedor de respaldo) |
| RNF-03 | Costo de operación objetivo **≤ USD 100 al mes**, con visibilidad diaria |
| RNF-04 | Seguridad: las llaves van en variables de entorno, los permisos se aplican por fila en la base de datos, todo va por HTTPS y se validan las firmas de los webhooks |
| RNF-05 | Datos personales: tratamiento conforme a la Ley 1581 de 2012 (habeas data, Colombia). Política de datos visible y opción de borrado a pedido del cliente |
| RNF-06 | Plantillas de marketing de WhatsApp solo para clientes que dieron su consentimiento o que tuvieron una conversación previa, según las políticas de Meta |
| RNF-07 | Sin migración de datos: se arranca de cero y solo se importan los clientes de Shopify |

## 4. Criterios de éxito

| Métrica | Meta | Cómo se mide |
|---|---|---|
| Tiempo de primera respuesta (IA) | p95 < 30 s | Eventos `mensaje_recibido` → `primera_respuesta` |
| Tasa de conversión | **Línea base el primer mes**; la meta se fija después con ese dato | Conversaciones con pedido pagado / conversaciones nuevas |
| Seguimientos recuperados | 100 % de los compromisos detectados quedan agendados; se mide el % que termina en venta | Seguimientos enviados → pedidos pagados dentro de 7 días |
| Ventas IA frente a vendedor | 100 % de los pedidos creados desde el CRM llevan atribución | Campo de atribución en el pedido |
| Costo mensual | ≤ USD 100, con alerta al 80 % | Suma de los costos registrados (RF-51) |
| Calidad | 0 precios o stock que no salgan de Shopify | Revisión de los registros de herramientas en las pruebas de E1 |

Propuestas a validar en la operación (no fueron preguntadas):
- Respuesta humana tras un escalamiento, en horario: < 5 min.
- Menos del 30 % de las conversaciones pasan a humano.

## 5. Parámetros configurables desde el panel de admin
- Nombre, tono y personalidad del agente.
- Horario de atención humana.
- Umbral mayorista por **unidades** y por **monto (COP)**.
- Modelo de IA por rol y proveedor de respaldo.
- Preguntas frecuentes y políticas.
- Plantillas de seguimiento.
- Presupuesto mensual y porcentaje de alerta.

## 6. Fuera del MVP (versión 2 o posterior)
- Integración con **EFFI** (depende de que tenga API).
- Avisos de estado de envío (depende de la transportadora o de EFFI).
- Campañas de recompra y fidelización.
- Importar chats o contactos antiguos.
- App nativa.

## 7. Decisiones pendientes para el Paso 04
- [ ] Elegir el **BSP de WhatsApp** con coexistencia (comparar tarifas; preferir sin cuota mensual).
- [ ] Servicio de **transcripción de voz** (por ejemplo, el modelo de transcripción de OpenAI, ya que OpenAI es uno de los proveedores) y su costo por minuto.
- [ ] Confirmar las tarifas oficiales de plantillas de Meta para Colombia.
- [ ] Preguntar al proveedor de EFFI si tiene API (para la versión 2).
