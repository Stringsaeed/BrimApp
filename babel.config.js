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
    },
  },
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [rootImport, require.resolve("expo-router/babel")],
  };
};
