// add env types to typescript

declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace NodeJS {
    interface ProcessEnv {
      APP_VARIANT?: "development" | "production" | "preview";
    }
  }
}

export {};
