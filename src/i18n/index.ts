import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import enAuth from "./locales/en/auth";
import enCommon from "./locales/en/common";
import enSettings from "./locales/en/settings";
import LanguageDetectorPlugin from "./plugins/language-detector";

i18next
  .use(LanguageDetectorPlugin)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        settings: enSettings,
        common: enCommon,
        auth: enAuth,
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
      auth: typeof enAuth;
    };
    // other
  }
}

export default i18next;
