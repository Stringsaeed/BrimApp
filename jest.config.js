const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const packagesToTransform = [
  "react-native",
  "react-native-(.*)",
  "@react-native/(.*)",
  "@react-native-community",
  "@react-navigation",
  "expo",
  "expo-(.*)",
  "@expo(nent)?",
  "@expo-google-fonts",
  "react-navigation",
  "@react-navigation/.*",
  "@unimodules",
  "unimodules",
  "sentry-expo",
  "native-base",
  "react-native-svg",
  "tamagui",
  "@tamagui/(.*)",
  "moti",
];

/** @type {import("jest").Config} */
module.exports = {
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTransform.join("|")})/)`,
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "\\.test\\.[jt]sx?$",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  modulePaths: [compilerOptions.baseUrl],
  preset: "jest-expo",
  roots: ["."],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  // extensionsToTreatAsEsm: [".tsx", ".ts", ".jsx"],
};
