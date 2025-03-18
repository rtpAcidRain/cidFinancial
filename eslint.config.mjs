import { defineConfig } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierEslint from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
    {
        files: ['**/*.{js,ts,tsx}'],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    {
        plugins: {
            prettier: prettierEslint,
            'unused-imports': unusedImports,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'no-unused-vars': 'off',
            'no-shadow': 'off',
            'no-underscore-dangle': 'off',
            'no-param-reassign': 'off',
            'no-undef': 'off',
            'no-array-index-key': 'off',
            'import/extensions': 'off',
            'import/prefer-default-export': 'off',
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': 'off',
            'unused-imports/no-unused-imports': 'error',
            'react/require-default-props': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/function-component-definition': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/no-explicit-any': 'off',
            // "i18next/no-literal-string": [
            //   "warn",
            //   {
            //     markupOnly: true,
            //     ignoreAttribute: [
            //       "data-testid",
            //       "to",
            //       "href",
            //       "name",
            //       "target",
            //       "justify",
            //       "align",
            //       "direction",
            //       "gap",
            //       "role",
            //       "as",
            //       "border",
            //     ],
            //   },
            // ],
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',

            // "acid-plugin2/path-checker": ["error", { alias: "@" }],
            // "acid-plugin2/public-api-imports": [
            //   "error",
            //   {
            //     alias: "@",
            //     testFilesPatterns: [
            //       "**/*.test.*",
            //       "**/*.story.*",
            //       "**/StoreDecorator.tsx",
            //     ],
            //   },
            // ],
            // "acid-plugin2/layers-import": [
            //   "error",
            //   {
            //     alias: "@",
            //     ignoreImportPatterns: ["**/StoreProvider", "**/testing"],
            //   },
            // ],
        },
    },

    // overrides: [
    //   {
    //     files: ["**/src/**/*.test.{ts,tsx}"],
    //     rules: {
    //       "i18next/no-literal-string": "off",
    //     },
    //   },
    //   {
    //     files: ["**/src/**/*.stories.{ts,tsx}"],
    //     rules: {
    //       "max-len": "off",
    //       "i18next/no-literal-string": "off",
    //     },
    //   },
    //   {
    //     files: ["cypress/**/*"],
    //     rules: {
    //       "acid-plugin2/path-checker": "off",
    //       "acid-plugin2/public-api-imports": "off",
    //       "acid-plugin2/layers-import": "off",
    //     },
    //   },
    // ],
]);
