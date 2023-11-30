module.exports = {
    collectCoverage: false,
    automock: false,
    testEnvironment: 'node',
    testMatch: [
        '**/?(*.)+(test).[jt]s?(x)',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/src/template',
        '<rootDir>/src/util',
        '<rootDir>/src/2022/12.test.js'
    ]
}