const tamagui = [
  "@tamagui/babel-plugin",
  {
    disableExtraction: process.env.NODE_ENV === "development",
    config: "./src/config/tamagui.config.ts",
    components: ["tamagui"],
    logTimings: true,
  },
];

const inlineEnv = [
  "transform-inline-environment-variables",
  {
    include: ["TAMAGUI_TARGET", "EXPO_ROUTER_APP_ROOT"],
  },
];

const reanimated = "react-native-reanimated/plugin";

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [tamagui, inlineEnv, reanimated],
    presets: ["babel-preset-expo"],
  };
};
