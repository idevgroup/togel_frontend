module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        "es6": true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'plugin:vue/recommended',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'prettier',
        'prettier/standard',
        'prettier/vue'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
        'prettier'
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-unused-vars": ['error', { "args": "none" }],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'all',
            },
        ]
    }
}