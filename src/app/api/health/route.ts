import { connection } from "next/server";

/** Chequeo de vida para Railway y monitoreo. */
export async function GET() {
  await connection(); // siempre dinámico: nunca servir una respuesta cacheada
  return Response.json({ ok: true, service: "jeff-crm-web", time: new Date().toISOString() });
}
