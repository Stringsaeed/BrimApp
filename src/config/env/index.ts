import z from "zod";

const envSchema = z.object({
  flagsmithEnvironmentId: z.string(),
  vexoAnalyticsApiKey: z.string(),
  supabaseAnonKey: z.string(),
  geminiAPIKey: z.string(),
  environment: z.string(),
  supabaseUrl: z.string(),
  sentryDsn: z.string(),
});

const unsafeConfig = {
  flagsmithEnvironmentId: process.env.EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
  vexoAnalyticsApiKey: process.env.EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  geminiAPIKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  environment: process.env.NODE_ENV ?? "development",
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
};

export const config = envSchema.parse(unsafeConfig);
