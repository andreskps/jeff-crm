# Proyecto — Descubrimiento (Paso 01)

> Resultado de la entrevista de descubrimiento del 2026-11-20. Define el problema y para quién; el alcance del MVP se cierra en el Paso 03 (Definición).

## En una frase
Un CRM propio, para un solo negocio de productos físicos en Colombia, que centraliza WhatsApp, Instagram y Messenger en una bandeja, donde un agente de IA atiende y vende de punta a punta, hace seguimiento a los clientes que dicen "luego" y pasa la conversación a un humano cuando hace falta.

## Objetivos
1. **Cerrar más ventas.**
2. **Centralizar la comunicación** de todos los canales en un solo lugar.
3. **Responder más rápido**: atención inmediata, 24/7.
4. **No perder seguimientos**: los "te escribo la otra semana" se convierten en ventas recuperadas.

## El negocio hoy
| Tema | Situación actual |
|---|---|
| Qué vende | Productos físicos |
| Equipo | 6 a 15 personas atendiendo/vendiendo |
| Volumen | 100 a 500 conversaciones o leads nuevos por día |
| Canales | WhatsApp (app WhatsApp Business), Instagram DM, Facebook Messenger |
| Origen de leads | Anuncios de Meta, orgánico en redes, referidos y recompra |
| Tienda / catálogo | Shopify |
| ERP | EFFI SYSTEM: inventario, facturación y contabilidad, pedidos y logística |
| Pasarelas de pago | Bold, Addi, Sistecrédito, Wompi |
| Cierre de la venta | Varía: link de tienda, link de pago, transferencia, contraentrega |
| Activos de Meta | Business verificado, página de Facebook e Instagram conectados, número disponible para la API de WhatsApp |

## Dolores (los cuatro confirmados)
- **Se responde tarde**: los clientes esperan y se van.
- **Se pierden seguimientos**: los clientes que dicen "luego" se olvidan.
- **Chats dispersos**: cada vendedor en su celular, sin historial ni visibilidad.
- **No hay métricas**: no se sabe qué entra, quién vende ni por qué se pierde.

## Usuarios y roles
| Rol | Qué hace |
|---|---|
| **Dueño / admin** | Ve todo, configura el agente de IA y **atiende a los mayoristas**. |
| **Vendedores** | Atienden a los clientes normales que la IA les pasa. |
| **Logística / soporte** | Reclamos, devoluciones y estado de envíos. |
| **Cliente final** | Escribe por WhatsApp, IG o Messenger. |

Acceso: web responsive para computador y celular, con notificaciones. No se hace app nativa.

## Cómo debe funcionar (visión)
### Agente de IA
- **Vende de punta a punta**: responde, recomienda productos, cotiza, toma los datos y envía el link de pago o crea el pedido.
- Se presenta con **nombre propio de marca**. Si el cliente pregunta de verdad si habla con una persona o con una IA, **no lo niega** y dice que es un asistente virtual. Es una decisión de ética y de cumplimiento de las políticas de Meta.

### Paso a humano
Se activa cuando:
- el cliente lo pide o muestra frustración;
- la IA no sabe la respuesta o tiene baja confianza;
- es una venta grande o especial (mayorista, descuento, negociación);
- es un reclamo o una devolución.

Asignación:
- **Mayoristas → dueño.**
- **Clientes normales → vendedores.**
- Reclamos y envíos → logística/soporte (se infiere del rol; hay que confirmarlo).

### Seguimiento
- La IA **detecta en la conversación** el compromiso ("la próxima semana", "el viernes"), **agenda** el seguimiento y **escribe sola** al cliente ese día.

### Postventa
- Registrar el pedido.
- Avisar el estado del envío.
- Recompra y fidelización.

## Criterios de éxito (métricas)
- Tasa de conversión (conversaciones → ventas).
- Tiempo de primera respuesta.
- Seguimientos recuperados (ventas de clientes que habían dicho "luego").
- Ventas por vendedor frente a ventas de la IA.

_Las metas numéricas (por ejemplo, "primera respuesta en menos de 1 minuto") se fijan en el Paso 03._

## Restricciones
| Restricción | Valor |
|---|---|
| Enfoque | A la medida, código propio sobre las APIs oficiales de Meta y un modelo de IA |
| Primera versión | **2 a 4 semanas** |
| Presupuesto de operación | **Menos de USD 100 al mes** (IA, servidores y API de WhatsApp) |
| País | Colombia (por las pasarelas que usan) |
| Inventario | Hoy no hay una fuente de verdad. En el futuro será **Shopify**. |

## Tensiones y riesgos detectados
1. **Presupuesto frente a volumen.** Con 100 a 500 chats al día y una IA que vende sola, USD 100 al mes queda muy justo. Hay que estimar el costo por conversación en el Paso 02, usar un modelo eficiente y caché, y definir qué pasa si se supera.
2. **Seguimientos fuera de las 24 horas.** WhatsApp solo permite escribir libremente durante 24 horas después del último mensaje del cliente. Los seguimientos de "la próxima semana" necesitan **plantillas aprobadas por Meta**, que tienen costo por mensaje. Esto afecta el presupuesto y el diseño.
3. **Migrar WhatsApp a la API.** Al conectar el número a la API, el equipo deja de atender desde la app de WhatsApp Business en los celulares y pasa a atender desde el CRM. Es un cambio de operación que hay que planear. Revisar si conviene la coexistencia de app y API.
4. **Alcance frente a plazo.** Todo lo que se pidió no cabe en 2 a 4 semanas. Hay que recortar el MVP en el Paso 03.
5. **IA que cierra ventas sola.** Un error en el precio, el stock o el pago tiene costo real. Con Shopify sin consolidar como fuente de verdad, la IA podría ofrecer productos sin stock.
6. **Integración con EFFI.** No se sabe si EFFI tiene API. Hay que confirmarlo antes de prometer que los pedidos se registren automáticamente allá.

## Preguntas abiertas
- [ ] ¿EFFI tiene API o algún modo de importación (webhooks, CSV)? ¿Quién es el contacto técnico?
- [x] ¿Cómo se identifica a un mayorista? → por unidades, por monto o porque el cliente lo dice; umbrales configurables (RF-21).
- [x] ¿Monto de venta grande? → configurable desde el panel (RF-21).
- [x] ¿Horarios y qué pasa sin humanos? → horario configurable; fuera de horario la IA avisa y deja en cola (RF-24).
- [x] ¿Nombre y tono del agente? → configurables (RF-14).
- [x] ¿Con qué datos aprende la IA? → catálogo de Shopify, preguntas frecuentes y políticas (RF-13).
- [ ] ¿Qué transportadora usan y cómo se obtiene el número de guía para avisar el estado del envío?
- [x] ¿Migración? → se arranca de cero; solo se importan los clientes de Shopify (RNF-07).
- [x] ¿Dónde se aloja? → Railway + Supabase (architecture.md). Pendiente: quién lo mantiene.
