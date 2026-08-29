import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { randomUUID } from "node:crypto";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // CI runners can be heavily loaded (a file that takes 0.2s locally has
    // taken 35s on Actions) — the default 5s per-test cap flakes there.
    testTimeout: 30_000,
    env: {
      // Random per-run stub — tests never see the real Web3Forms key (that lives
      // only in the EMAIL_API_KEY GitHub secret, used at deploy build time).
      // Contact.tsx reads import.meta.env, and contact.test.tsx asserts against
      // the same env value, so any random string keeps the suite green.
      VITE_WEB3FORMS_ACCESS_KEY: `test-${randomUUID()}`,
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
