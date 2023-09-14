import { Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default StyleSheet.create({
  style: {
    paddingHorizontal: 16,
    flexGrow: 1,
    flex: 1,
  },
  containerStyle: {
    minHeight: SCREEN_HEIGHT,
    flex: 1,
  },
});
