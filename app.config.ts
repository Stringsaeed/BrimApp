import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    plugins: [
      // "./plugins/withFirebaseAppCheck.js",
      // "@react-native-firebase/app",
      // "@react-native-firebase/auth",
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
            // useFrameworks: "static",
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
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#F7F6E4",
      },
      // googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./assets/google-services.json",
      userInterfaceStyle: "automatic",
      package: "com.stringsaeed.brim",
      versionCode: 41,
    },
    ios: {
      // googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST ?? "./assets/GoogleService-Info.plist",
      config: { usesNonExemptEncryption: false },
      bundleIdentifier: "com.stringsaeed.brim",
      userInterfaceStyle: "automatic",
      supportsTablet: true,
      buildNumber: "41",
    },
    extra: {
      eas: {
        // androidFirebaseAppCheckDebugToken: process.env.FIREBASE_APP_CHECK_DEBUG_TOKEN_ANDROID,
        // iOSfirebaseAppCheckDebugToken: process.env.FIREBASE_APP_CHECK_DEBUG_TOKEN_IOS,
        // projectId: "e630d577-becd-41a6-ad64-226cac9be574",
      },
    },
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
    splash: {
      image: "./assets/splash.png",
      backgroundColor: "#F7F6E4",
      resizeMode: "contain",
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
