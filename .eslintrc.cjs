/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "error"
    },
    root: true,
};