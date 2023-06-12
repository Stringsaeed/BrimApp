import { BlurViewProps as IOSBlurViewProps } from "expo-blur";
import { BlurViewProps as AndroidBlurViewProps } from "@react-native-community/blur/src";

export type BlurViewProps = IOSBlurViewProps & AndroidBlurViewProps;
