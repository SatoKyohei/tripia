import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [".next/*", "node_modules/*", "dist/*", "build/*"],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": pluginTypeScript,
            import: pluginImport,
            react: pluginReact,
        },
        rules: {
            "import/order": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            semi: ["error", "always"],
            "no-console": ["error", { allow: ["error"] }],
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            eqeqeq: "error",
            "@typescript-eslint/no-empty-object-type": "off",
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },
];

export default eslintConfig;
