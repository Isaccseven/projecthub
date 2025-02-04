import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      "consistent-return": "error",
      "curly": "error",
      "eqeqeq": ["error", "always"],
      "no-else-return": "error",
      "no-empty-function": "error",
      "no-multi-spaces": "error",
      "no-unused-expressions": "error",
      "no-use-before-define": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "require-await": "error",
      "no-throw-literal": "error",
      "handle-callback-err": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "valid-typeof": "error",
    },
  },
];

export default eslintConfig;
