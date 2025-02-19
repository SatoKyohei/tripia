import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { ignores: ["prisma/seed.ts"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-console": ["error", { allow: ["error"] }],
            eqeqeq: "error",
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },
    { linterOptions: { reportUnusedDisableDirectives: true } },
];
