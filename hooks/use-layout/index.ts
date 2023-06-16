import { useState } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

export default function useLayout() {
  const [layout, setLayout] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    y: 0,
    x: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const newLayout = event.nativeEvent.layout;
    setLayout((prevLayout) => ({
      ...prevLayout,
      ...newLayout,
    }));
  };

  return { ...layout, onLayout };
}
