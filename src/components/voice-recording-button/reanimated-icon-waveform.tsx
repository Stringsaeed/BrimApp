import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

const WAVEFORM_ITEMS = Array.from({ length: 5 }, (_, index) => index);

const WaveformItem = ({
  volumeProgress,
  index,
}: {
  index: number;
  volumeProgress: SharedValue<number>;
}) => {
  // Calculate the base height using sine wave
  const _height = Math.round(
    Math.sin((index / (WAVEFORM_ITEMS.length - 1)) * Math.PI) * 22 + 2
  );

  // Interpolate height based on volume progress
  const calculatedHeight = useDerivedValue(() =>
    interpolate(volumeProgress.value, [0, 100], [2, _height])
  );

  // Create animated style for the bar
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: (24 - calculatedHeight.value) / 2,
      height: calculatedHeight.value,
    };
  });

  return <Animated.View style={[styles.item, animatedStyle]} />;
};

export default function ReanimatedIconWaveform({
  volumeProgress,
}: {
  volumeProgress: SharedValue<number>;
}) {
  return (
    <View style={styles.container}>
      {WAVEFORM_ITEMS.map((index) => (
        <WaveformItem
          key={index}
          index={index}
          volumeProgress={volumeProgress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 24,
    gap: 3.5,
  },
  item: {
    backgroundColor: "white",
    width: 2,
  },
});
