import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,     // 👈 Add Node.js globals like `process`
        // ...globals.browser // 👈 Optionally include browser globals too
      },
    },
  },
]);
