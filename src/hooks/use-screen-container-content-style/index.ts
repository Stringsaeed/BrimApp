import { useHeaderHeight } from "@react-navigation/elements";
import { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  handleHeaderHeight?: boolean;
  handleSafeArea?: false | "top" | "bottom" | ["top", "bottom"];
  centered?: boolean;
  withoutBeautifulPadding?: boolean;
  overrideStyle?: StyleProp<ViewStyle>;
};

function getIsDirection({
  handleSafeArea,
  compareAgainst,
}: {
  handleSafeArea: Props["handleSafeArea"];
  compareAgainst: "top" | "bottom";
}) {
  if (!handleSafeArea) return false;
  if (typeof handleSafeArea === "boolean") return false;
  if (Array.isArray(handleSafeArea)) {
    return handleSafeArea.includes(compareAgainst);
  }
  return handleSafeArea === compareAgainst;
}

function getPaddingTop({
  handleSafeArea,
  headerHeight,
  safeAreaTop,
}: {
  headerHeight: number;
  handleSafeArea: Props["handleSafeArea"];
  safeAreaTop: number;
}) {
  const isTop = getIsDirection({ compareAgainst: "top", handleSafeArea });
  const _safeAreaTop = isTop ? safeAreaTop : 0;

  return headerHeight + _safeAreaTop;
}

function getPaddingBottom({
  handleSafeArea,
  safeAreaBottom,
}: {
  handleSafeArea: Props["handleSafeArea"];
  safeAreaBottom: number;
}) {
  const isBottom = getIsDirection({ compareAgainst: "bottom", handleSafeArea });
  return isBottom ? safeAreaBottom || 24 : 0;
}

export default function useScreenContainerContentStyle({
  withoutBeautifulPadding,
  handleHeaderHeight,
  handleSafeArea,
  overrideStyle,
  centered,
}: Props) {
  const { bottom, top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const _headerHeight = handleHeaderHeight ? headerHeight : 0;

  const paddingBottom = getPaddingBottom({
    safeAreaBottom: bottom,
    handleSafeArea,
  });
  const paddingTop = getPaddingTop({
    headerHeight: _headerHeight,
    safeAreaTop: top,
    handleSafeArea,
  });

  const style = useMemo(
    () =>
      StyleSheet.flatten<ViewStyle>([
        { paddingBottom, paddingTop },
        !withoutBeautifulPadding && styles.beautifulPadding,
        centered && styles.centered,
        centered && styles.grow,
        overrideStyle,
      ]),
    [
      centered,
      overrideStyle,
      paddingBottom,
      paddingTop,
      withoutBeautifulPadding,
    ]
  );

  return style;
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  beautifulPadding: {
    paddingHorizontal: 16,
  },
  grow: {
    flexGrow: 1,
  },
});
