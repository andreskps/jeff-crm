# Diseño de interfaz — CRM Jeff

> Actualizado el 2026-11-20. La lógica, los datos y los permisos están en [architecture.md](architecture.md) §7–11.
> **Inspiración:** dos referencias de CRM que dio el usuario (un dashboard tipo "Tasklify" y un inbox tipo "Kirridesk") + la marca de [jeffshoes.net](https://jeffshoes.net/).

## 1. Dirección

**Monocromo, limpio y rápido.** Blanco y negro como base, la marca de Jeff en los detalles y color solo cuando comunica un estado. Se ve como una herramienta de trabajo premium, no como un tablero lleno de colores.

| Tomado de | Qué se toma |
|---|---|
| Referencia 1 (dashboard) | Sidebar claro con secciones agrupadas, buscador con atajo, tarjeta de usuario abajo; saludo + tarjetas de KPI con ícono en cuadro negro; tablero tipo **kanban** con columnas en pastilla y conteo; botón primario negro arriba a la derecha |
| Referencia 2 (inbox) | Conversación con avatar, nombre, hora y **"vía WhatsApp"** por mensaje; **tarjeta de pedido embebida** en el chat con una línea de etapas; panel derecho con el detalle del pedido; compositor con selector de canal, respuestas rápidas y botón **Enviar** negro; acción principal **"Cerrar"** arriba a la derecha |
| jeffshoes.net | Tipografía **Inter**, negro `#1C1C1C` sobre blanco cálido `#FFFEFC`, botones negros en **píldora**, etiquetas cortas en MAYÚSCULAS con letras espaciadas, logo circular "Jeff" |

## 2. Marca Jeff
- **Logo:** el circular "Jeff Shoes" del sitio (`https://jeffshoes.net/cdn/shop/files/IMG_0020.png`). En el sidebar va en un círculo de 32 px y al lado dice **"Jeff CRM"**. En modo oscuro se usa la versión invertida (pendiente: pedir el logo en SVG o PNG blanco).
- **Voz de la interfaz:** español, frases cortas, tuteo, como en el sitio ("Arma tu combo").
- **Moneda:** COP con punto de miles: `$199.000`.

## 3. Tokens

Todo color sale de variables CSS en un solo archivo (`src/app/tokens.css`). Las clases de Tailwind se mapean a estos tokens.

### Colores — modo claro
| Token | Valor | Uso |
|---|---|---|
| `--bg-canvas` | `#F3F2EF` | Fondo general detrás del contenido (el gris cálido de las referencias) |
| `--bg-surface` | `#FFFEFC` | Tarjetas, paneles, sidebar (el blanco de la marca) |
| `--bg-subtle` | `#F7F6F3` | Hover, filas seleccionadas, inputs |
| `--border` | `#E6E4DF` | Bordes de tarjetas y separadores |
| `--border-strong` | `#D4D1CB` | Bordes de inputs y foco secundario |
| `--text` | `#1C1C1C` | Texto principal (el negro de la marca) |
| `--text-muted` | `#6B6A67` | Texto secundario, fechas, ayudas |
| `--text-faint` | `#9C9A96` | Placeholders |
| `--primary` | `#1C1C1C` | Botones primarios, ícono de KPI, burbuja del humano |
| `--primary-fg` | `#FFFEFC` | Texto sobre primario |

### Colores — modo oscuro
| Token | Valor |
|---|---|
| `--bg-canvas` | `#0E0E0E` |
| `--bg-surface` | `#171717` |
| `--bg-subtle` | `#202020` |
| `--border` | `#2A2A2A` |
| `--border-strong` | `#3A3A3A` |
| `--text` | `#F5F4F1` |
| `--text-muted` | `#A3A19D` |
| `--text-faint` | `#6E6C69` |
| `--primary` | `#FFFEFC` |
| `--primary-fg` | `#1C1C1C` |

### Colores de estado (lo único con color)
Se usan solo en **pastillas, puntos y bordes finos**, nunca como fondo grande. En el modo oscuro se usan las mismas tonalidades, un poco más claras.

| Token | Valor | Significa |
|---|---|---|
| `--success` | `#1F9D55` | Pedido pagado, mensaje entregado, seguimiento cumplido |
| `--warning` | `#C27A0E` | En cola, ventana por cerrarse, seguimiento vencido |
| `--danger` | `#D93636` | Fallido, reclamo, urgente, alerta de presupuesto |
| `--info` | `#3B6FD9` | Link de pago enviado, en proceso |

**IA y humano se distinguen sin color:**
- **IA**: pastilla con **borde** y el ícono ✦ (`sparkles`); burbuja blanca con borde.
- **Humano**: pastilla **negra rellena** con avatar; burbuja negra con texto blanco.
- **Mayorista**: pastilla negra con la palabra `MAYORISTA` en mayúsculas espaciadas (estilo de la marca).

### Tipografía
- **Inter** (la misma del sitio), desde Google Fonts o `next/font`. Números tabulares en las tablas y los KPI.

| Estilo | Tamaño / interlineado | Peso | Uso |
|---|---|---|---|
| `display` | 28 / 34 | 700 | Saludo "Hola, Jeff 👋" |
| `h1` | 22 / 28 | 600 | Título de página |
| `h2` | 17 / 24 | 600 | Título de tarjeta o panel |
| `body` | 14 / 20 | 400 | Texto general y mensajes |
| `small` | 13 / 18 | 400 | Metadatos y fechas |
| `label` | 11 / 16, MAYÚSCULAS, `letter-spacing: .08em` | 600 | Encabezados de sección del sidebar, etiquetas (estilo de la marca) |
| `kpi` | 28 / 32, tabular | 700 | Números de las tarjetas |

En el celular, el texto de los mensajes y de los inputs es de 16 px (para que iOS no haga zoom).

### Forma, espacio y profundidad
| Token | Valor |
|---|---|
| Espaciado | Escala de 4 px: 4, 8, 12, 16, 20, 24, 32, 48 |
| `--radius-sm` | 6 px (pastillas pequeñas, checkbox) |
| `--radius-md` | 10 px (inputs, botones secundarios, burbujas) |
| `--radius-lg` | 14 px (tarjetas y paneles) |
| `--radius-pill` | 999 px (**botón primario**, pastillas de estado, columnas del kanban) |
| `--shadow-sm` | `0 1px 2px rgb(0 0 0 / .05)` (tarjetas) |
| `--shadow-md` | `0 8px 24px rgb(0 0 0 / .08)` (menús, modales, tarjeta arrastrada) |

- **Íconos:** Lucide, trazo de 1,5 px, 18 px en la navegación y 16 px dentro del texto.
- **Movimiento:** 150 ms con `ease-out` en hover y paneles. La tarjeta del kanban se inclina 2° al arrastrarla, como en la referencia. Se respeta `prefers-reduced-motion`.

## 4. Estructura de la app (shell)

```
┌──────────────┬──────────────────────────────────────────────────────────┐
│ (●) Jeff CRM ⌄│  Inicio / Bandeja                    [avatares] ⚙ 🔔 [+ Nuevo]│
│ [🔍 Buscar  ⌘K]├──────────────────────────────────────────────────────────┤
│              │ ┌──────────────────────────────────────────────────────┐ │
│ PRINCIPAL    │ │                                                      │ │
│  ▸ Inicio    │ │            contenido en tarjeta (bg-surface)         │ │
│  ▸ Bandeja  12│ │            sobre fondo bg-canvas, radio 14 px        │ │
│  ▸ Seguimientos│ │                                                      │ │
│  ▸ Pedidos   │ │                                                      │ │
│  ▸ Clientes  │ │                                                      │ │
│ HERRAMIENTAS │ │                                                      │ │
│  ▸ Conocimiento│ └──────────────────────────────────────────────────────┘ │
│  ▸ Reportes  │                                                          │
│  ▸ Configuración│                                                       │
│ ──────────── │                                                          │
│ [foto] Ana R.│                                                          │
│ Vendedora   ⌄│                                                          │
└──────────────┴──────────────────────────────────────────────────────────┘
```

- **Sidebar** de 248 px; en la Bandeja se colapsa a 64 px (solo íconos) para dar espacio al chat.
- **Barra superior:** migas de pan a la izquierda; a la derecha, quién está en línea (avatares), configuración, notificaciones y el **botón primario negro en píldora**.
- Los elementos del menú cambian según el rol: Configuración y Reportes de costo son solo del admin ([architecture.md §11](architecture.md)).
- Contador de no leídos en la Bandeja: pastilla negra. Las alertas usan una pastilla roja, como en la referencia.

## 5. Pantallas

### 5.1 Inicio (admin: todo el negocio; vendedor: lo suyo)
Inspirada en la referencia 1.
- **Saludo:** "Hola, Jeff 👋" + "Esto es lo que pasa hoy en tus ventas."
- **Banner de la IA** (fila gris con ícono ✦): "Tu asistente atendió **84** conversaciones hoy · **6** esperan a un humano" + botón **Ver**.
- **4 tarjetas KPI** (ícono blanco en cuadro negro, número grande, "Ver detalle ›"):
  1. Conversaciones nuevas hoy
  2. Ventas de hoy (COP) — IA / humano
  3. Seguimientos para hoy
  4. Tiempo de primera respuesta (p95)
- **Pipeline de ventas (kanban)** con columnas en pastilla y conteo, derivadas de datos que ya existen (no hace falta otra tabla):

| Columna | Regla |
|---|---|
| Conversando | Conversación activa sin pedido |
| Link enviado | `orders.estado = link_enviado` |
| Seguimiento | `follow_ups.estado = pendiente` |
| Pagado | `orders.estado = pagado` (últimos 7 días) |

  Tarjeta: canal + nombre del cliente, etiqueta (`MAYORISTA`, `IA`, `Urgente`), producto o monto, fecha del seguimiento, avatar del responsable y hora del último mensaje. Clic → abre la conversación. Vistas alternativas en pestañas: **Kanban · Lista**.
- **Etapa:** las tarjetas KPI y el pipeline entran en **E1** porque solo leen datos; el tablero completo de métricas queda en E3 (pantalla Reportes).

### 5.2 Bandeja (el corazón del CRM)
Inspirada en la referencia 2.

```
┌────┬─────────────────┬─────────────────────────────────┬────────────────────┐
│ ◉  │ [Todas ▾][Mías] │ ← Laura Gómez   ●WhatsApp  [IA ✦]│ Cliente │ Pedido  │
│ ▣  │ 🔍 Buscar       │   Conversación · Seguimientos ·  │                    │
│ ✉  │─────────────────│   Notas · Actividad   [⋯][Cerrar]│ Laura Gómez        │
│ ⏰ │ ● Laura Gómez   │                                  │ +57 300 …          │
│ 📦 │   WA · IA ✦ 2m  │ (L) Laura · 11:12 · vía WhatsApp │ 3 pedidos · $357.000│
│ 👥 │   "¿tienen la…" │  ¿Tienen los Honey en 38?        │ ────────────────── │
│    │ ● Carlos P.     │ (✦) Asistente · 11:12            │ PEDIDO #D-1043     │
│    │   IG · MAYORISTA│  ¡Sí! Te quedan 3 pares…         │ ● Link enviado     │
│    │   ⚠ en cola 5m │ ┌ Pedido #D-1043  ● Link enviado┐│ ○──●──○──○         │
│    │ ...             │ │ ○ Borrador ● Link ○ Pagado ○ Env││ Borr Link Pag Env  │
│    │                 │ │ Honey 38 x1        $158.000  ││ [Copiar link]      │
│    │                 │ └──────────────────────────────┘│ ────────────────── │
│    │                 │ ┌──────────────────────────────┐│ SEGUIMIENTOS       │
│    │                 │ │ Vía [WhatsApp ▾]  Ventana 21h ││ vie 22 · "le pagan"│
│    │                 │ │ Escribe o usa "/" para atajos ││                    │
│    │                 │ │ T ☺ 📎 🎤  [Atajos▾] [Tomar][Enviar]│                │
│    │                 │ └──────────────────────────────┘│                    │
└────┴─────────────────┴─────────────────────────────────┴────────────────────┘
```

- **Lista (320 px):** filtros `Todas · Mías · En cola · Mayoristas`, búsqueda, y por conversación: avatar, nombre, ícono del canal, pastilla de estado, tiempo y vista previa del último mensaje. Las que esperan a un humano llevan un punto ámbar y van arriba.
- **Encabezado del chat:** cliente, canal, pastilla **IA ✦ / humano**, pestañas `Conversación · Seguimientos · Notas · Actividad` y la acción principal **[Cerrar]** negra en píldora (como "Submit as Closed").
- **Mensajes:** avatar + nombre + hora + "vía WhatsApp / Instagram / Messenger", igual que la referencia. Las burbujas siguen §3 (IA con borde, humano en negro, cliente en `bg-subtle`, sistema en texto centrado y gris). Los audios muestran reproductor + transcripción en `small`. Las imágenes van en miniatura y se amplían al hacer clic.
- **Barra de escalamiento** fija arriba cuando aplica: motivo + resumen de la IA + botón **Tomar conversación**.
- **Tarjeta de pedido embebida** en el chat, con una línea de etapas `Borrador → Link enviado → Pagado → Enviado` (Enviado queda en gris hasta integrar el envío en la versión 2).
- **Compositor:** selector **Vía [canal]** (solo los canales del cliente), **indicador de ventana** ("Ventana: 21 h"; si está cerrada, el campo cambia a "Elegir plantilla"), barra de formato, emoji, adjunto, nota de voz, **Atajos** (respuestas rápidas con `/`) y los botones **Tomar** (si la IA atiende) o **Devolver a la IA**, y **Enviar** (negro).
- **Panel derecho (360 px):** pestañas `Cliente · Pedido`: datos del cliente, historial de pedidos de Shopify, pedido activo con su línea de etapas y **Copiar link**, seguimientos y notas.

### 5.3 Seguimientos
Tabla y kanban (`Hoy · Vencidos · Próximos · Cumplidos`) con cliente, fecha, motivo, canal, responsable y estado. Las tareas humanas de IG y Messenger se marcan con el ícono de mano.

### 5.4 Pedidos y Clientes
Tablas con búsqueda y filtros: pedidos creados desde el CRM (estado, monto, atribución IA o humano) y clientes (canales, compras, mayorista). Solo lectura y enlace a la conversación.

### 5.5 Configuración (solo admin)
Navegación lateral interna: **Agente** (nombre, tono, instrucciones, vista previa de cómo responde) · **Horario** · **Mayoristas** (umbral de unidades y de monto) · **Modelos de IA** (proveedor y modelo por rol, respaldo) · **Conocimiento** · **Plantillas de WhatsApp** (con su estado en Meta) · **Usuarios y roles** · **Presupuesto** (monto y % de alerta).

### 5.6 Reportes (E3)
Las 5 métricas de [requirements.md §4](requirements.md) con filtros por fecha, canal y vendedor, más el costo del mes frente al presupuesto. Las gráficas son monocromas (negro y grises); el color de estado se usa solo para resaltar.

## 6. Componentes base
Se construyen con **shadcn/ui** (Radix + Tailwind), que da accesibilidad y teclado listos, y se ajustan a estos tokens.

| Componente | Variantes |
|---|---|
| Botón | `primario` (negro, píldora) · `secundario` (borde, radio md) · `fantasma` · `peligro` |
| Pastilla | `estado` (punto + texto) · `canal` (ícono de WhatsApp, IG o Messenger) · `ia` (borde ✦) · `humano` (negra) · `mayorista` (negra, mayúsculas) |
| Tarjeta | `kpi` · `kanban` · `pedido` (con línea de etapas) |
| Burbuja | `cliente` · `ia` · `humano` · `sistema` · `audio` · `imagen` · `plantilla` |
| Otros | Avatar con indicador de en línea · línea de etapas · indicador de ventana · paleta de comandos `⌘K` · toast · modal · menú |

## 7. Celular (PWA)
- Barra inferior: **Inicio · Bandeja · Seguimientos · Más**.
- La Bandeja se convierte en 3 vistas apiladas: **lista → chat → ficha** (deslizar para volver). El panel de cliente abre como hoja inferior.
- El compositor queda fijo abajo con un área táctil de al menos 44 px. Mantener presionado el botón de micrófono graba una nota de voz.
- La notificación push de una asignación abre directamente ese chat.

## 8. Accesibilidad
- Contraste mínimo AA (4,5:1 en texto). El negro sobre `#FFFEFC` y `--text-muted` sobre la superficie lo cumplen.
- El estado nunca se comunica solo con color: siempre hay texto o ícono.
- Todo se puede usar con teclado: `⌘K` para buscar, `J`/`K` para moverse entre conversaciones, `Enter` para enviar, `Esc` para cerrar paneles.
- Foco visible: anillo de 2 px `--text` con separación.

## 9. Pendientes
- [ ] Logo de Jeff en **SVG** (o PNG blanco) para el modo oscuro y el favicon.
- [x] Prototipo visual de Inicio, Bandeja y chat en el celular: [Jeff CRM — Prototipo](https://claude.ai/artifact/SiZfSyi6NYE83ud3GAonjp) (2026-11-20, datos de ejemplo). Falta que el usuario lo valide.
- [ ] Tokens de texto para estados, usados en el prototipo para cumplir el contraste AA: `--ok #156B3A`, `--warn #7E4C00`, `--bad #B42323`, `--info #2A55B0` sobre fondos tenues (`#E3F3EA`, `#FBF0DC`, `#FBE7E7`, `#E6EDFB`). Pasarlos a la tabla de §3 cuando se apruebe el prototipo.
