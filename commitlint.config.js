module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feature', 'fixbug', 'setup', 'release']],
        'type-case': [2, 'always', 'lower-case']
    },
}
