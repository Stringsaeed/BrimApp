import { Canvas, Rect } from "@shopify/react-native-skia";
import {
  interpolate,
  SharedValue,
  useDerivedValue,
} from "react-native-reanimated";

const WAVEFORM_ITEMS = Array.from({ length: 5 }, (_, index) => index);

const WaveformItem = ({
  volumeProgress,
  index,
}: {
  index: number;
  volumeProgress: SharedValue<0 | 1>;
}) => {
  // we need to do like a wave
  // so we need to have a sine wave
  // the maximum height is the third item
  // then the 2nd and 4th item are half of the maximum height
  // the 1st and 5th item are 0

  const _height = useDerivedValue(() =>
    Math.round(
      Math.sin((index / (WAVEFORM_ITEMS.length - 1)) * Math.PI) * 22 + 2
    )
  );

  const calculatedHeight = useDerivedValue(() =>
    interpolate(volumeProgress.value, [0, 1], [2, _height.value])
  );

  const y = useDerivedValue(() => (24 - calculatedHeight.value) / 2);

  const x =
    (index * (24 - 2 * WAVEFORM_ITEMS.length)) / (WAVEFORM_ITEMS.length - 1) +
    index * 2;

  return <Rect x={x} y={y} width={2} height={calculatedHeight} color="white" />;
};

export default function SkiaIconWaveform({
  volumeProgress,
}: {
  volumeProgress: SharedValue<0 | 1>;
}) {
  return (
    <Canvas style={{ backgroundColor: "transparent", height: 24, width: 24 }}>
      {WAVEFORM_ITEMS.map((index) => (
        <WaveformItem
          key={index}
          index={index}
          volumeProgress={volumeProgress}
        />
      ))}
    </Canvas>
  );
}

// \ |  |  |  |  |  \
// \ --- 24px --- /
// single item width is 2
// total width is 24
// the space between items is 5
// so 24 / 5 = 4.8

// (2 + X) * 5 = 24
// 2 + X = 24 / 5
// X = 24 / 5 - 2
// X = 4.8 - 2
// X = 2.8
