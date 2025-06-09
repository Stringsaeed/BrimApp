// Learn more https://docs.expo.io/guides/customizing-metro
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { withTamagui } = require("@tamagui/metro-plugin");
const {
  wrapWithAudioAPIMetroConfig,
} = require("react-native-audio-api/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getSentryExpoConfig(__dirname);

defaultConfig.resolver.sourceExts.push("cjs");
defaultConfig.resolver.assetExts.push("pte");
defaultConfig.resolver.assetExts.push("bin");

const withAudioAPI = wrapWithAudioAPIMetroConfig(defaultConfig);
const withTamaguiConfig = withTamagui(withAudioAPI, {
  components: ["tamagui"],
  config: "./src/themes/theme.ts",
});

module.exports = withTamaguiConfig;
