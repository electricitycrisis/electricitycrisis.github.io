import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const isProd = !isDev;

  return {
    server: {
      host: "::",
      port: 8080,
      open: true,
      hmr: { overlay: false },
    },

    resolve: {
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    plugins: [
      react(),
      isProd &&
        viteCompression({
          algorithm: "brotliCompress",
          ext: ".br",
          deleteOriginFile: false,
          threshold: 4096,
          compressionOptions: { level: 11 },
        }),
      isProd &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz",
          deleteOriginFile: false,
          threshold: 4096,
        }),
    ].filter(Boolean),

    build: {
      target: "esnext",
      outDir: "dist",
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      minify: "esbuild",
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1024,
      sourcemap: isDev,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "react-vendor";
              if (id.includes("three")) return "three-vendor";
              return "vendor";
            }
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },

    optimizeDeps: {
      include: ["react", "react-dom"],
    },

    preview: {
      port: 4173,
      strictPort: true,
      compression: true,
    },
  };
});
