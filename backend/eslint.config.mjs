import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
    // 対象ファイルの指定
    { files: ["**/*.{js,mjs,cjs,ts}"] },

    // 無視するファイルの指定
    { ignores: ["prisma/seed.ts"] },

    // グローバル変数の設定
    { languageOptions: { globals: globals.browser } },

    // 推奨設定の読み込み
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    security.configs.recommended,
    sonarjs.configs.recommended,

    // Prettier のルールを ESLint に適用
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "warn",
        },
    },

    // インポート順序を統一
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            "import/order": [
                "warn",
                {
                    groups: ["builtin", "external", "internal"],
                    "newlines-between": "always",
                },
            ],
        },
    },

    {
        // カスタムルールの設定
        rules: {
            // 未使用変数の警告を TypeScript 用に変更
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],

            // console.log を禁止し、console.error のみ許可
            "no-console": ["error", { allow: ["error"] }],

            // 厳密な等価演算子を強制
            eqeqeq: "error",

            // 空のオブジェクト型に関するルールを無効化
            "@typescript-eslint/no-empty-object-type": "off",

            // 関数の戻り値の型を明示することを推奨
            "@typescript-eslint/explicit-function-return-type": "warn",

            // any 型の使用を警告
            "@typescript-eslint/no-explicit-any": "warn",

            // マジックナンバーの使用を制限
            "no-magic-numbers": ["warn", { ignore: [0, 1] }],
        },
    },

    // 未使用の ESLint ディレクティブを報告
    { linterOptions: { reportUnusedDisableDirectives: true } },
];
