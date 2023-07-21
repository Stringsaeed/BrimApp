/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/catch-or-return */
import {
  useFonts,
  RedHatText_400Regular,
  RedHatText_400Regular_Italic,
  RedHatText_500Medium,
  RedHatText_500Medium_Italic,
  RedHatText_600SemiBold,
  RedHatText_600SemiBold_Italic,
  RedHatText_700Bold,
  RedHatText_700Bold_Italic,
  RedHatText_300Light,
  RedHatText_300Light_Italic,
} from "@expo-google-fonts/red-hat-text";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect, useState } from "react";

import { fonts } from "themes";

export default function useLoadAssets() {
  const [splashScreenHidden, setSplashScreenHidden] = useState(false);
  const [loaded] = useFonts({
    [fonts.semiBoldItalic]: RedHatText_600SemiBold_Italic,
    [fonts.regularItalic]: RedHatText_400Regular_Italic,
    [fonts.mediumItalic]: RedHatText_500Medium_Italic,
    [fonts.lightItalic]: RedHatText_300Light_Italic,
    [fonts.boldItalic]: RedHatText_700Bold_Italic,
    [fonts.semiBold]: RedHatText_600SemiBold,
    [fonts.regular]: RedHatText_400Regular,
    [fonts.medium]: RedHatText_500Medium,
    [fonts.light]: RedHatText_300Light,
    [fonts.bold]: RedHatText_700Bold,
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
