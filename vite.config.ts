import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@http": path.resolve(__dirname, "src/utils/http"),
      "@store": path.resolve(__dirname, "src/store"),
      "@lib/http-client": path.resolve(__dirname, "src/@lib"),
    }
  },
  plugins: [react()],
})
