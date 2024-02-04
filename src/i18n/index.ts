import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import { enCommon, enSettings } from "./locales";
import { LanguageDetectorPlugin } from "./plugins";

void i18next
  .use(LanguageDetectorPlugin)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        settings: enSettings,
        common: enCommon,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: "v3",
    defaultNS: "common",
    fallbackLng: "en",
    ns: ["common"],
    debug: __DEV__,
  } satisfies InitOptions);

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "common";
    // custom resources type
    resources: {
      settings: typeof enSettings;
      common: typeof enCommon;
    };
    // other
  }
}

export default i18next;
