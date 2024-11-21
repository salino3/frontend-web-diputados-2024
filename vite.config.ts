import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sass from "sass";
import path from "path";

export default defineConfig({
  // base: "/frontend-web-diputados-2024/",
  base: "/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.gif"],
});
