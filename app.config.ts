import { ExpoConfig, ConfigContext } from "expo/config";

const nameMap = {
  preview: "BrimApp (Preview)",
  development: "BrimApp (Dev)",
  production: "BrimApp",
};

const schemeMap = {
  preview: "brim-preview",
  development: "brim-dev",
  production: "brim",
};

const bundleIdentifierMap = {
  preview: "com.stringsaeed.brim.preview",
  development: "com.stringsaeed.brim.dev",
  production: "com.stringsaeed.brim",
};

const name = nameMap[process.env.APP_VARIANT || "production"];
const scheme = schemeMap[process.env.APP_VARIANT || "production"];
const bundleIdentifier =
  bundleIdentifierMap[process.env.APP_VARIANT || "production"];

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
      "expo-notifications",
      "expo-font",
      [
        "@sentry/react-native/expo",
        {
          authToken: process.env.SENTRY_AUTH_TOKEN,
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
        },
      ],
      "expo-apple-authentication",
      ["expo-router", { origin: "http://localhost:8081/" }],
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#F7F6E4",
      },
      userInterfaceStyle: "automatic",
      package: bundleIdentifier,
      versionCode: 45,
    },
    ios: {
      config: { usesNonExemptEncryption: false },
      userInterfaceStyle: "automatic",
      usesAppleSignIn: true,
      supportsTablet: true,
      buildNumber: "45",
      bundleIdentifier,
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
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true,
    },
    web: {
      bundler: "metro",
      output: "server",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    userInterfaceStyle: "automatic",
    assetBundlePatterns: ["**/*"],
    icon: "./assets/icon.png",
    orientation: "portrait",
    owner: "stringsaeed",
    jsEngine: "hermes",
    version: "1.0.0",
    slug: "BrimApp",
    scheme,
    name,
  };
};
