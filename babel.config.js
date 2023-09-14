const tamagui = [
  "@tamagui/babel-plugin",
  {
    disableExtraction: process.env.NODE_ENV === "development",
    config: "./src/themes/theme.ts",
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

const productionPlugins =
  process.env.NODE_ENV === "production" ? [tamagui] : [];

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [inlineEnv, ...productionPlugins, reanimated],
    presets: ["babel-preset-expo"],
  };
};
