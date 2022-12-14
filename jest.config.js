/* eslint-disable */
module.exports = {
  rootDir: 'src',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverageFrom: ['**/*.{js,ts}', '!**/__api-mocks__/**'],
  coverageDirectory: '<rootDir>/../coverage',
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.ts'],
  testEnvironment: 'jsdom',
  testTimeout: 15000,
};
