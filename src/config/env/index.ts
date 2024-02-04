import Constants from "expo-constants";
import z from "zod";

const envSchema = z.object({
  firebaseAppCheckToken: z.object({
    android: z.string().optional(),
    ios: z.string().optional(),
  }),
  flagsmithEnvironmentId: z.string(),
  vexoAnalyticsApiKey: z.string(),
  huggingFaceApiKey: z.string(),
  webFirebaseApiKey: z.string(),
  geminiAPIKey: z.string(),
  environment: z.string(),
  sentryDsn: z.string(),
});

const unsafeConfig = {
  firebaseAppCheckToken: {
    android: Constants.expoConfig?.extra?.androidFirebaseAppCheckDebugToken,
    ios: Constants.expoConfig?.extra?.iOSfirebaseAppCheckDebugToken,
  },
  flagsmithEnvironmentId: process.env.EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
  vexoAnalyticsApiKey: process.env.EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY,
  clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  webFirebaseApiKey: process.env.EXPO_PUBLIC_WEB_FIREBASE_API_KEY,
  huggingFaceApiKey: process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  postHugApiKey: process.env.EXPO_PUBLIC_POST_HUG_API_KEY,
  geminiAPIKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  environment: process.env.NODE_ENV ?? "development",
  postHugHost: process.env.EXPO_PUBLIC_POST_HUG_HOST,
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
};

export const config = envSchema.parse(unsafeConfig);
