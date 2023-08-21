const router = require.resolve("expo-router/babel");

const tamagui = [
  "@tamagui/babel-plugin",
  {
    config: "./src/config/tamagui.config.ts",
    components: ["tamagui"],
    logTimings: true,
  },
];

const reanimated = "react-native-reanimated/plugin";

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [router, tamagui, reanimated],
    presets: ["babel-preset-expo"],
  };
};
