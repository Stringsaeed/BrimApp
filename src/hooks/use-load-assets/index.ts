import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";

void preventAutoHideAsync();

export default function useLoadAssets() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      void hideAsync();
    }
  }, [error, loaded]);

  return loaded;
}
