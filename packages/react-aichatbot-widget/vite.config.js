import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
  plugins: [react(), peerDepsExternal()],
  build: {
    lib: {
      entry: "src/index.jsx",
      name: "ChatBotNpm",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "uuid"],
    },
  },
});
