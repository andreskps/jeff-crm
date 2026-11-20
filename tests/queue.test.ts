import { afterAll, describe, expect, it } from "vitest";
import type { PgBoss } from "pg-boss";
import { QUEUES, createBoss, ensureQueues } from "@/lib/queue";

describe("QUEUES", () => {
  it("no repite nombres de cola", () => {
    const names = Object.values(QUEUES);
    expect(new Set(names).size).toBe(names.length);
  });
});

// Integración: necesita Supabase local (npm run db:start) y DATABASE_URL en .env.
const url = process.env.DATABASE_URL;

describe.skipIf(!url)("pg-boss contra Postgres local", () => {
  let boss: PgBoss;

  afterAll(async () => {
    await boss?.stop({ graceful: false });
  });

  it("encola un trabajo y un worker lo recibe", async () => {
    boss = createBoss(url!);
    await boss.start();
    await ensureQueues(boss);

    const received = new Promise<unknown>((resolve) => {
      void boss.work<{ n: number }>(QUEUES.ping, { pollingIntervalSeconds: 0.5 }, async ([job]) => {
        resolve(job?.data);
      });
    });

    await boss.send(QUEUES.ping, { n: 42 });
    await expect(received).resolves.toEqual({ n: 42 });
  });
});
