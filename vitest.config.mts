import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Carga .env si existe (las pruebas de integración usan DATABASE_URL).
try {
  process.loadEnvFile();
} catch {
  /* sin .env: las pruebas de integración se saltan */
}

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    testTimeout: 30_000,
  },
});
