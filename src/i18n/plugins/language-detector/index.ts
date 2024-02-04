import * as Localization from "expo-localization";

const languageDetector = {
  detect: () => {
    const locales = Localization.getLocales();
    return locales.at(0)?.languageCode ?? undefined;
  },
  type: "languageDetector" as const,
  async: false,
};

export default languageDetector;
