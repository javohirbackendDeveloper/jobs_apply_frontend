import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          vendor: ["lodash", "axios"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
