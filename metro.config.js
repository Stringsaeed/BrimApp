// Learn more https://docs.expo.io/guides/customizing-metro
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getSentryExpoConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

defaultConfig.resolver.assetExts.push("cjs");
defaultConfig.resolver.sourceExts.push("cjs", "mjs");

module.exports = defaultConfig;
