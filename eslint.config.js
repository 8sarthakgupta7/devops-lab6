const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: { ...globals.node, fetch: "readonly" },
    },
    rules: {
      "no-unused-vars": "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
