const router = require.resolve("expo-router/babel");

const reanimated = "react-native-reanimated/plugin";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [router, reanimated],
  };
};
