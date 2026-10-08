import { defineConfig, globalIgnores } from "eslint/config";
import vitals from "eslint-config-next/core-web-vitals";
import ts from "eslint-config-next/typescript";

export default defineConfig([
  ...vitals,
  ...ts,
  { rules: { "@typescript-eslint/no-explicit-any": "error" } },
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts", "brag-output/**"]),
]);
