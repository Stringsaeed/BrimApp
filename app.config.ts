import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    plugins: [
      [
        "expo-build-properties",
        {
          ios: {
            extraPods: [
              {
                path: "../node_modules/@nozbe/simdjson",
                configurations: ["Debug", "Release"],
                modular_headers: true,
                name: "simdjson",
              },
            ],
            deploymentTarget: "14.0",
          },
        },
      ],
      [
        "expo-local-authentication",
        {
          faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID.",
        },
      ],
      "expo-localization",
      "sentry-expo",
      "expo-notifications",
    ],
    hooks: {
      postPublish: [
        {
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
          },
          file: "sentry-expo/upload-sourcemaps",
        },
      ],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#F7F6E4",
      },
      userInterfaceStyle: "automatic",
      package: "com.stringsaeed.brim",
      versionCode: 42,
    },
    ios: {
      config: { usesNonExemptEncryption: false },
      bundleIdentifier: "com.stringsaeed.brim",
      userInterfaceStyle: "automatic",
      supportsTablet: true,
      buildNumber: "42",
    },
    splash: {
      image: "./assets/splash.png",
      backgroundColor: "#F7F6E4",
      resizeMode: "contain",
    },
    extra: {
      eas: {
        projectId: "e630d577-becd-41a6-ad64-226cac9be574",
      },
    },
    androidStatusBar: {
      backgroundColor: "#F7F6E400",
      translucent: true,
    },
    updates: {
      url: "https://u.expo.dev/e630d577-becd-41a6-ad64-226cac9be574",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    experiments: {
      tsconfigPaths: true,
    },
    web: {
      bundler: "metro",
    },
    userInterfaceStyle: "automatic",
    assetBundlePatterns: ["**/*"],
    icon: "./assets/icon.png",
    orientation: "portrait",
    owner: "stringsaeed",
    jsEngine: "hermes",
    version: "1.0.0",
    slug: "BrimApp",
    name: "BrimApp",
    scheme: "brim",
  };
};
