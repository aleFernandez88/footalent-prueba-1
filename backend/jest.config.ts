// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ["ts", "js", "json"],
};

export default config;
