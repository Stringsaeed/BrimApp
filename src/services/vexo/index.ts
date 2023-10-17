import { vexo } from "vexo-analytics";

const apiKey = process.env.EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY;

export const Vexo = {
  init: () => {
    if (!__DEV__) {
      if (typeof apiKey === "string") {
        vexo(apiKey);
      }
    }
  },
};
