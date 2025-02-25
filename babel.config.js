const isDevelopment = process.env.NODE_ENV === "development";

/** @type {(import("@babel/core").PluginItem)[]} */
const plugins = [];

plugins.push([
  "@tamagui/babel-plugin",
  {
    disableExtraction: isDevelopment,
    config: "./src/themes/theme.ts",
    components: ["tamagui"],
    logTimings: true,
  },
]);

plugins.push(["@babel/plugin-proposal-decorators", { legacy: true }]);

plugins.push("react-native-reanimated/plugin");

/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  api.cache(true);
  return { presets: ["babel-preset-expo"], plugins };
};
