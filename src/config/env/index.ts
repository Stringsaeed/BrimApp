import z from "zod";

const envSchema = z.object({
  flagsmithEnvironmentId: z.string(),
  clerkPublishableKey: z.string(),
  vexoAnalyticsApiKey: z.string(),
  webFirebaseApiKey: z.string(),
  huggingFaceApiKey: z.string(),
  sentryAuthToken: z.string(),
  supabaseAnonKey: z.string(),
  sentryProject: z.string(),
  postHugApiKey: z.string(),
  supabaseUrl: z.string(),
  postHugHost: z.string(),
  authToken: z.string(),
  sentryOrg: z.string(),
  sentryDsn: z.string(),
});

const unsafeConfig = {
  flagsmithEnvironmentId: process.env.EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
  vexoAnalyticsApiKey: process.env.EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY,
  clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  huggingFaceApiKey: process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY,
  webFirebaseApiKey: process.env.EXPO_PUBLIC_WEB_FIREBASE_API_KEY,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  postHugApiKey: process.env.EXPO_PUBLIC_POST_HUG_API_KEY,
  postHugHost: process.env.EXPO_PUBLIC_POST_HUG_HOST,
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  sentryAuthToken: process.env.SENTRY_AUTH_TOKEN,
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  sentryProject: process.env.SENTRY_PROJECT,
  sentryOrg: process.env.SENTRY_ORG,
  authToken: process.env.AUTH_TOKEN,
};

export const config = envSchema.parse(unsafeConfig);
