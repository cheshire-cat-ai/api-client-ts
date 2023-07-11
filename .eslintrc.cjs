/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "error",
        "@typescript-eslint/no-explicit-any": "warn"
    },
    root: true,
};