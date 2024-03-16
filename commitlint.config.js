module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feature', 'fixbug', 'setup', 'release', 'fix']],
        'type-case': [2, 'always', 'lower-case']
    },
}
