// client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "vendor-react": [
            "react",
            "react-dom",
            "react-router-dom",
            "react-redux",
          ],

          // Redux
          "vendor-redux": ["@reduxjs/toolkit"],

          // Markdown related (ye sabse bada hoga)
          "vendor-markdown": [
            "react-markdown",
            "remark-gfm",
            "react-syntax-highlighter",
          ],

          // Utils
          "vendor-utils": ["axios", "socket.io-client", "lucide-react"],

          // Lottie (animations)
          "vendor-lottie": ["@lottiefiles/dotlottie-react"],
        },
      },
    },
  },
});
