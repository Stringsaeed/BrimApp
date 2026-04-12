import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";

void preventAutoHideAsync();

export default function useLoadAssets() {
  const [loaded, error] = useFonts({
    // biome-ignore lint/style/noCommonJs: We don't need to use import for these, and using require allows us to load them from the node_modules folder without needing to copy them to the assets folder
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    // biome-ignore lint/style/noCommonJs: We don't need to use import for these, and using require allows us to load them from the node_modules folder without needing to copy them to the assets folder
    Inter: require("@tamagui/font-inter/otf/Inter-Regular.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      void hideAsync();
    }
  }, [error, loaded]);

  return loaded;
}
