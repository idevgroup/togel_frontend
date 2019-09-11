module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'plugin:vue/recommended',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'prettier',
        'prettier/standard',
        'prettier/vue',
    ],
    // required to lint *.vue files
    plugins: ['vue', 'prettier'],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
<<<<<<< HEAD
        "no-unused-vars": ['error', { "args": "none" }],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'all',
            },
        ],
=======
        'no-unused-vars': ['error', { args: 'none' }],
>>>>>>> 14039b0efc8cdf941513e1a0c9e7d3c041be7034
        'prettier/prettier': 'off',
        'vue/require-default-prop': 'off',
        'vue/html-indent': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
<<<<<<< HEAD
        'vue/mustache-interpolation-spacing': 'off'
    }
=======
        'vue/mustache-interpolation-spacing': 'off',
    },
>>>>>>> 14039b0efc8cdf941513e1a0c9e7d3c041be7034
}