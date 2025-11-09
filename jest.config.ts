/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  // Use ts-jest for TypeScript support
  preset: "ts-jest",
  testEnvironment: "node",

  // Run your test database setup/teardown before/after all tests
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  // Collect coverage while running tests
  collectCoverage: true,
  coverageProvider: "v8",
  coverageDirectory: "coverage",

  // Ignore irrelevant files from coverage to keep metrics clean
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/config/",
    "/src/server.ts",
    "/tests/",
  ],

  // Output multiple formats (text + html)
  coverageReporters: ["text", "lcov", "html"],

  // Detect test files automatically
  testMatch: [
    "**/tests/**/*.test.ts",
    "**/?(*.)+(spec|test).ts",
  ],

  // Optional: speed up tests
  clearMocks: true,
  restoreMocks: true,
  resetMocks: false,

  // Optional but good for CI/CD: enforce minimum coverage
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },

};

export default config;
