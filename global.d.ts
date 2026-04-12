// add env types to typescript

declare global {
  // biome-ignore lint/style/noNamespace: We need to use declaration merging to add types to process.env
  namespace NodeJS {
    interface ProcessEnv {
      APP_VARIANT?: "development" | "production" | "preview";
    }
  }
}

export {};
