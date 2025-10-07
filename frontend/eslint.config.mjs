import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
    { languageOptions: { globals: globals.browser } },

    // 除外するファイル・ディレクトリを追加
    {
        ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "dist/**", ".git/**"],
    },
    
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,

    // すべてのプラグインを一箇所で定義
    {
        plugins: {
            prettier: prettierPlugin,
            react: reactPlugin,
            next: nextPlugin,
            security: security,
            sonarjs: sonarjs,
            import: importPlugin,
        },
        rules: {
            "prettier/prettier": "warn",

            // インポート順序
            "import/order": [
                "warn",
                {
                    groups: ["builtin", "external", "internal"],
                    "newlines-between": "always",
                },
            ],

            // 未使用変数
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],

            // console制限
            "no-console": ["error", { allow: ["error"] }],

            // その他のルール
            eqeqeq: "error",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "no-magic-numbers": ["warn", { ignore: [0, 1] }],
        },
    },

    { linterOptions: { reportUnusedDisableDirectives: true } },
];
