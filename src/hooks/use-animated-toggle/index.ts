import { useSharedValue, withTiming } from "react-native-reanimated";

export default function useAnimatedToggle(initialCondition: boolean = false) {
  const sharedValue = useSharedValue<0 | 1>(initialCondition ? 0 : 1);

  const toggle = () => {
    sharedValue.value = withTiming(1 - sharedValue.value) as 0 | 1;
  };

  return [sharedValue, toggle] as const;
}
