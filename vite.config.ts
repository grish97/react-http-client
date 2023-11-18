/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    name: "react-http-client",
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@http": path.resolve(__dirname, "src/utils/http"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/store"),
      "@mock": path.resolve(__dirname, "src/mock"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@testing": path.resolve(__dirname, "src/@testing"),
      "@lib/http-client": path.resolve(__dirname, "src/@lib"),
    },
  },
  plugins: [react()],
});
