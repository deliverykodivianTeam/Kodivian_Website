import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.JPG"],
  server: {
    watch: {
      ignored: [
        "**/backend.py",
        "**/visitors.json",
        "**/venv/**"
      ]
    },
    port: 5173 // dev server port — correct
  }
});
