# Diseño de interfaz (Paso 04)

> Diseño del 2026-11-20. La lógica, los datos y los permisos están en [architecture.md](architecture.md) §7–11.

## Principios
1. **Velocidad ante todo.** El vendedor responde en segundos: atajos de teclado, respuestas rápidas y nada de pantallas de carga entre conversaciones.
2. **Siempre claro quién atiende.** Cada conversación y cada mensaje muestran si los maneja la **IA** o un **humano**, y quién.
3. **Lo urgente primero.** La bandeja ordena: escalados sin atender → mayoristas → vencidos → el resto.
4. **Celular de primera clase.** Los vendedores atienden desde el celular igual que desde el computador (PWA con notificaciones push).
5. **Configurar sin programar.** Todo lo de [requirements.md §5](requirements.md) se cambia desde la pantalla de Configuración.

## Identidad visual
- **Se usa la marca del negocio.** El usuario va a entregar el logo y los colores. Hasta entonces se usan valores provisionales.
- Todo color sale de **tokens CSS** (`--color-primario`, `--color-fondo`, etc.); cambiar la marca es editar un solo archivo.
- Modo claro y oscuro.
- Colores de estado fijos, que no dependen de la marca:

| Estado | Uso |
|---|---|
| IA | Conversación o mensaje atendido por la IA |
| Humano | Atendido por una persona |
| En cola | Escalado, todavía sin atender |
| Mayorista | Etiqueta destacada |
| Error o fallido | Envío que no llegó, plantilla rechazada |

- Tipografía: sans-serif del sistema o la de la marca. Tamaño base de 16 px en el celular.

## Pantallas

| Pantalla | Roles | Contenido | Etapa |
|---|---|---|---|
| **Inicio de sesión** | Todos | Correo y contraseña o enlace mágico (Supabase Auth) | E1 |
| **Bandeja** | Todos (cada uno ve lo suyo) | 3 columnas en el computador: **lista** (filtros por canal, estado y responsable; ícono del canal; etiqueta IA o humano; mayorista), **chat** (burbujas diferenciadas para cliente, IA, humano y sistema; audio con su transcripción; imagen; resumen del escalamiento fijo arriba) y **ficha** (cliente, pedidos de Shopify, seguimientos, notas). Acciones: **Tomar conversación**, **Devolver a la IA**, **Agendar seguimiento**, **Cerrar** | E1 |
| **Seguimientos** | Todos | Pendientes, vencidos y cumplidos, con fecha, motivo y responsable. Tareas humanas de IG y Messenger | E1 |
| **Configuración** | Admin | Agente (nombre, tono, instrucciones) · Horario · Umbrales de mayorista · Modelos de IA por rol · Conocimiento (preguntas frecuentes y políticas) · Plantillas de WhatsApp · Usuarios y roles · Presupuesto y alerta | E1 |
| **Tablero** | Admin (todo); vendedor y logística (lo suyo) | Las 5 métricas de [requirements.md §4](requirements.md), costo del mes frente al presupuesto y filtros por fecha, canal y vendedor | E3 |

### Celular
- La bandeja se convierte en 3 vistas apiladas: **lista → chat → ficha**, con gesto de volver.
- La barra inferior lleva a Bandeja, Seguimientos y (para el admin) Configuración.
- Una notificación push al asignar una conversación abre directamente ese chat.

## Componentes clave
- **Burbuja de mensaje:** autor (cliente, IA, humano y su nombre, sistema), hora, estado de envío (enviado, entregado, leído, fallido) y la transcripción debajo de los audios.
- **Barra de escalamiento:** motivo, resumen de la IA y botón **Tomar**.
- **Indicador de ventana:** cuánto tiempo queda de la ventana de 24 h o 7 días; si se cerró, el campo de texto ofrece solo plantillas.
- **Tarjeta de pedido:** productos, monto, estado (borrador, link enviado, pagado) y botón para copiar el link.

## Pendiente
- [ ] Recibir el logo y los colores de la marca.
- [ ] Wireframes y prototipo (opcional, antes de construir la Bandeja en E1).
