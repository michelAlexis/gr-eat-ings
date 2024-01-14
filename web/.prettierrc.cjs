/** @type {import("prettier").Config} */
module.exports = {
    useTabs: false,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    bracketSameLine: true,
    printWidth: 100,
    plugins: ['prettier-plugin-svelte'],
    overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
