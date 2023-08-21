/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/catch-or-return */
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect, useState } from "react";

import { fonts } from "themes";

preventAutoHideAsync();

export default function useLoadAssets() {
  const [splashScreenHidden, setSplashScreenHidden] = useState(false);
  const [loaded] = useFonts({
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    [fonts.secondarySemiBold]: Inter_600SemiBold,
    [fonts.semiBoldItalic]: Inter_600SemiBold,
    [fonts.secondaryMedium]: Inter_500Medium,
    [fonts.regularItalic]: Inter_400Regular,
    [fonts.mediumItalic]: Inter_500Medium,
    [fonts.secondaryBold]: Inter_700Bold,
    [fonts.semiBold]: Inter_600SemiBold,
    [fonts.secondary]: Inter_400Regular,
    [fonts.lightItalic]: Inter_300Light,
    [fonts.regular]: Inter_400Regular,
    [fonts.boldItalic]: Inter_700Bold,
    [fonts.medium]: Inter_500Medium,
    [fonts.light]: Inter_300Light,
    [fonts.bold]: Inter_700Bold,
  });

  useEffect(() => {
    (async () => {
      if (!loaded) return;
      if (splashScreenHidden) return;
      await hideAsync();
      setSplashScreenHidden(true);
    })();
  }, [loaded, splashScreenHidden]);

  return loaded;
}
