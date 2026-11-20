import { PgBoss } from "pg-boss";

/**
 * Nombres de las colas de pg-boss. Se agregan aquí a medida que llegan
 * las fases (procesar_conversacion, enviar_seguimiento, sync_catalogo...).
 */
export const QUEUES = {
  /** Cola de humo: comprueba que web → cola → worker funciona. */
  ping: "ping",
} as const;

export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];

export function createBoss(connectionString: string): PgBoss {
  const boss = new PgBoss(connectionString);
  // Sin este listener, un error interno de pg-boss tumba el proceso.
  boss.on("error", (err) => console.error("[pg-boss]", err));
  return boss;
}

export async function ensureQueues(boss: PgBoss): Promise<void> {
  for (const name of Object.values(QUEUES)) {
    await boss.createQueue(name);
  }
}
