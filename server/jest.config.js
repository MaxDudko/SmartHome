module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],
    verbose: true,
    setupFiles: [
        'dotenv/config'
    ]
}