import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";

preventAutoHideAsync();

export default function useLoadAssets() {
  const [loaded, error] = useFonts({
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      hideAsync();
    }
  }, [error, loaded]);

  return loaded;
}
