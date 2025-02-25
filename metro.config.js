// Learn more https://docs.expo.io/guides/customizing-metro
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { withTamagui } = require("@tamagui/metro-plugin");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getSentryExpoConfig(__dirname);

defaultConfig.resolver.sourceExts.push("cjs");

module.exports = withTamagui(defaultConfig, {
  components: ["tamagui"],
  config: "./src/themes/theme.ts",
});
