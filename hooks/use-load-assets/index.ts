/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/catch-or-return */
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
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
    (async () => {
      await preventAutoHideAsync();
      if (!loaded) return;
      if (splashScreenHidden) return;
      await hideAsync();
      setSplashScreenHidden(true);
    })();
  }, [loaded, splashScreenHidden]);

  return loaded;
}
