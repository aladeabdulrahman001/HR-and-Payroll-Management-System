import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier, // Overrides stylistic rules to prevent conflicts
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { 
      globals: globals.node 
    },
    rules: {
      // You can add custom rules here if needed
    }
  }
];
