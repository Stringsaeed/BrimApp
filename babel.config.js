const isProd = process.env.NODE_ENV === "production";
const plugins = [];

if (isProd) {
  plugins.push([
    "@tamagui/babel-plugin",
    {
      disableExtraction: process.env.NODE_ENV === "development",
      config: "./src/themes/theme.ts",
      components: ["tamagui"],
      logTimings: true,
    },
  ]);
}

plugins.push([
  "transform-inline-environment-variables",
  {
    include: ["TAMAGUI_TARGET", "EXPO_ROUTER_APP_ROOT"],
  },
]);

plugins.push(["@babel/plugin-proposal-decorators", { legacy: true }]);

plugins.push("react-native-reanimated/plugin");

/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};
