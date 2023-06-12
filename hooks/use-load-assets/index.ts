import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import { hideAsync } from "expo-splash-screen";
import { useEffect, useState } from "react";
import { fonts } from "themes";

export default function useLoadAssets() {
  const [splashScreenHidden, setSplashScreenHidden] = useState(false);
  const [loaded] = useFonts({
    [fonts.semiBoldItalic]: DMSans_500Medium_Italic,
    [fonts.regularItalic]: DMSans_400Regular_Italic,
    [fonts.boldItalic]: DMSans_700Bold_Italic,
    [fonts.semiBold]: DMSans_500Medium,
    [fonts.regular]: DMSans_400Regular,
    [fonts.bold]: DMSans_700Bold,
  });

  useEffect(() => {
    if (!loaded) return;
    if (splashScreenHidden) return;
    // eslint-disable-next-line promise/catch-or-return, promise/prefer-await-to-then
    hideAsync().finally(() => setSplashScreenHidden(true));
  }, [loaded, splashScreenHidden]);

  return loaded;
}
