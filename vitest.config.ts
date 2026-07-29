import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Mirrors the "@/*" path alias in tsconfig.json so tests can import modules the same way
// the application does. Without this, only type-only "@/" imports work (they are erased),
// and a value import fails to resolve at test time.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
