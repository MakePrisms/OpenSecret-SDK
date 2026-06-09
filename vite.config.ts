import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import dts from 'vite-plugin-dts'

// Custom plugin for .der file handling
function derPlugin() {
  return {
    name: "vite-der-plugin",
    transform(_src: string, id: string) {
      if (id.endsWith(".der")) {
        // Read the .der file as a buffer
        const buffer = fs.readFileSync(id);

        // Convert the buffer to a Uint8Array
        const uint8Array = new Uint8Array(buffer);

        // Generate code to create and export a Uint8Array
        return {
          code: `export default new Uint8Array([${uint8Array.toString()}]);`,
          map: null
        };
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    derPlugin(),
    dts({
      rollupTypes: true,
      tsconfigPath: "tsconfig.app.json"
    }),
  ],
  // Add .der to assetsInclude to ensure it's processed
  assetsInclude: ['**/*.der'],
  resolve: {
    alias: {
      // Ensure absolute imports work correctly
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      // Two entries: the default core barrel (react-free) and the opt-in react barrel.
      // Multi-entry lib mode cannot emit UMD, so we emit ES + CJS only.
      entry: {
        index: path.resolve(__dirname, "src/lib/index.ts"),
        react: path.resolve(__dirname, "src/lib/react.ts")
      },
      formats: ["es", "cjs"],
      // index -> opensecret-core.{es,cjs}.js ; react -> opensecret-react.{es,cjs}.js
      fileName: (format, entryName) => {
        const base = entryName === "index" ? "opensecret-core" : "opensecret-react";
        return `${base}.${format}.js`;
      }
    },
    rollupOptions: {
      // Externalize React and React DOM along with their internals
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^react\/.*/,
        /^react-dom\/.*/
      ]
    }
  }
});
