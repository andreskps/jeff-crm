/**
 * Punto de entrada del worker: procesa trabajos en segundo plano
 * (IA, envíos, seguimientos). Corre como proceso aparte de la web.
 */
import { requireEnv } from "../lib/env";
import { QUEUES, createBoss, ensureQueues } from "../lib/queue";

type PingData = { sentAt: string };

async function main() {
  const { DATABASE_URL } = requireEnv(["DATABASE_URL"]);
  const boss = createBoss(DATABASE_URL);

  await boss.start();
  await ensureQueues(boss);

  await boss.work<PingData>(QUEUES.ping, async ([job]) => {
    if (!job) return;
    const ms = Date.now() - new Date(job.data.sentAt).getTime();
    console.log(`[worker] ping ${job.id} recibido en ${ms} ms`);
  });

  console.log("[worker] listo, escuchando colas:", Object.values(QUEUES).join(", "));

  // Railway manda SIGTERM al desplegar: terminar los trabajos activos antes de salir.
  const shutdown = async (signal: string) => {
    console.log(`[worker] ${signal}: cerrando…`);
    await boss.stop({ graceful: true, timeout: 20_000 });
    process.exit(0);
  };
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
  process.once("SIGINT", () => void shutdown("SIGINT"));

  if (process.argv.includes("--ping")) {
    const id = await boss.send(QUEUES.ping, {
      sentAt: new Date().toISOString(),
    } satisfies PingData);
    console.log(`[worker] ping enviado (${id})`);
  }
}

main().catch((err) => {
  console.error("[worker] error fatal:", err);
  process.exit(1);
});
