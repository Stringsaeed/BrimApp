import { ConfigContext, ExpoConfig } from "expo/config";

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
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
        },
      ],
      "expo-apple-authentication",
      "expo-router",
      [
        "expo-audio",
        {
          microphonePermission: "Allow $(PRODUCT_NAME) to use the microphone.",
        },
      ],
      [
        "react-native-audio-api",
        {
          androidPermissions: [
            "android.permission.MODIFY_AUDIO_SETTINGS",
            "android.permission.FOREGROUND_SERVICE",
            "android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK",
          ],
          androidFSTypes: ["mediaPlayback"],
          androidForegroundService: true,
          iosBackgroundMode: true,
        },
      ],
    ],
    ios: {
      infoPlist: {
        // status bar config
        UIViewControllerBasedStatusBarAppearance: "NO",
      },
      config: { usesNonExemptEncryption: false },
      userInterfaceStyle: "automatic",
      usesAppleSignIn: false,
      supportsTablet: false,
      newArchEnabled: true,
      buildNumber: "45",
      bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#F7F6E4",
      },
      userInterfaceStyle: "automatic",
      package: bundleIdentifier,
      edgeToEdgeEnabled: true,
      newArchEnabled: true,
      versionCode: 45,
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
      output: "static",
    },
    userInterfaceStyle: "automatic",
    assetBundlePatterns: ["**/*"],
    icon: "./assets/icon.png",
    runtimeVersion: "1.0.0",
    orientation: "portrait",
    owner: "stringsaeed",
    newArchEnabled: true,
    jsEngine: "hermes",
    version: "1.0.0",
    slug: "BrimApp",
    scheme,
    name,
  };
};
