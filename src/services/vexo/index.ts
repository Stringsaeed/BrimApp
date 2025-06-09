import { vexo } from "vexo-analytics";

import { config } from "@/config";

const apiKey = config.vexoAnalyticsApiKey;

export const Vexo = {
  init: () => {
    if (!__DEV__) {
      if (typeof apiKey === "string") {
        vexo(apiKey);
      }
    }
  },
};
