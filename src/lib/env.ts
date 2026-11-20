/**
 * Lectura de variables de entorno con validación mínima.
 * Cada parte del sistema pide solo las que necesita, así el worker
 * no exige llaves de la web y viceversa.
 */

export class EnvError extends Error {
  constructor(public readonly missing: string[]) {
    super(`Faltan variables de entorno: ${missing.join(", ")}`);
    this.name = "EnvError";
  }
}

type Source = Record<string, string | undefined>;

export function requireEnv<K extends string>(
  keys: readonly K[],
  source: Source = process.env,
): Record<K, string> {
  const missing = keys.filter((k) => !source[k]?.trim());
  if (missing.length > 0) throw new EnvError(missing);
  return Object.fromEntries(keys.map((k) => [k, source[k]!.trim()])) as Record<K, string>;
}
