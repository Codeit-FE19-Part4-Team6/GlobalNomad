import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  eslintConfigPrettier,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      import: importPlugin,
      "@typescript-eslint": tsPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { alwaysTryTypes: true, project: "./tsconfig.app.json" },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.app.json",
      },
      globals: globals.browser,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-pascal-case": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" },
      ],

      curly: ["error"],
      "no-var": "error",
      "no-console": "warn",
      "no-debugger": "warn",
    },
  },
]);
