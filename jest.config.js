const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.spec.[jt]s?(x)'],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
}
