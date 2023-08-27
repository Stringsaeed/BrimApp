import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/dynamic-links",
      "@react-native-firebase/auth",
      [
        "expo-build-properties",
        {
          ios: {
            deploymentTarget: "13.0",
            useFrameworks: "static",
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
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#F7F6E4",
      },
      googleServicesFile: "./assets/google-services.json",
      userInterfaceStyle: "automatic",
      package: "com.stringsaeed.brim",
      versionCode: 24,
    },
    ios: {
      googleServicesFile: "./assets/GoogleService-Info.plist",
      bundleIdentifier: "com.stringsaeed.brim",
      userInterfaceStyle: "automatic",
      supportsTablet: true,
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
    jsEngine: "hermes",
    version: "1.0.0",
    slug: "BrimApp",
    name: "BrimApp",
    scheme: "brim",
  };
};
