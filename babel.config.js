const rootImport = [
  "module-resolver",
  {
    alias: {
      components: "./components",
      contexts: "./contexts",
      stores: "./stores",
      config: "./config",
      utils: "./utils",
      hooks: "./hooks",
      types: "./types",
      test: "./test",
    },
    extensions: [".ios.js", ".android.js", ".js", ".json", ".ts", ".tsx"],
    root: ["."],
  },
];

const router = require.resolve("expo-router/babel");

const reanimated = "react-native-reanimated/plugin";

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [rootImport, router, reanimated],
    presets: ["babel-preset-expo"],
  };
};
