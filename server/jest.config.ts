import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
};
export default config;
