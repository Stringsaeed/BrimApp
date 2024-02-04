// add env types to typescript

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_VARIANT?: "development" | "production" | "preview";
    }
  }
}

export {};
