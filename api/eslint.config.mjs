import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts}"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "indent": ["error", 2], // Indentação com 2 espaços
      "quotes": ["error", "single"], // Aspas simples
      "semi": ["error", "always"], // Exigir ponto e vírgula
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  tseslint.configs.recommended, // Regras recomendadas do TypeScript
]);
