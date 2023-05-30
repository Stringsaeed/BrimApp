const rootImport = [
  "babel-plugin-root-import",
  {
    paths: [
      {
        rootPathSuffix: "./contexts",
        rootPathPrefix: "contexts",
      },

      {
        rootPathSuffix: "./components",
        rootPathPrefix: "components",
      },
      {
        rootPathSuffix: "./utils",
        rootPathPrefix: "utils",
      },
      {
        rootPathSuffix: "./config",
        rootPathPrefix: "config",
      },
    ],
  },
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [rootImport, require.resolve("expo-router/babel")],
  };
};
