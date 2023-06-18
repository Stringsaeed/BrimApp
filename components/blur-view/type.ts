import { BlurViewProps as AndroidBlurViewProps } from "@react-native-community/blur/src";
import { BlurViewProps as IOSBlurViewProps } from "expo-blur";

export type BlurViewProps = IOSBlurViewProps & AndroidBlurViewProps;
