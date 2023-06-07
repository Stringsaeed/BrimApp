const rootImport = [
  "module-resolver",
  {
    root: ["."],
    extensions: [".ios.js", ".android.js", ".js", ".json", ".ts", ".tsx"],
    alias: {
      contexts: "./contexts",
      components: "./components",
      utils: "./utils",
      config: "./config",
      test: "./test",
      hooks: "./hooks",
      types: "./types",
    },
  },
];

const env = ["transform-inline-environment-variables"];

const router = require.resolve("expo-router/babel");

const reanimated = "react-native-reanimated/plugin";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [rootImport, env, router, reanimated],
  };
};
