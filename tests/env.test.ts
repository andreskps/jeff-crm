import { describe, expect, it } from "vitest";
import { EnvError, requireEnv } from "@/lib/env";

describe("requireEnv", () => {
  it("devuelve las variables pedidas sin espacios", () => {
    expect(requireEnv(["A", "B"], { A: " uno ", B: "dos" })).toEqual({ A: "uno", B: "dos" });
  });

  it("lista todas las que faltan o están vacías", () => {
    try {
      requireEnv(["A", "B", "C"], { A: "x", B: "  " });
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(EnvError);
      expect((err as EnvError).missing).toEqual(["B", "C"]);
    }
  });
});
