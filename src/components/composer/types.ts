import { ForwardedRef } from "react";
import {
  EnrichedTextInputInstance,
  EnrichedTextInputProps,
} from "react-native-enriched";

export type ComposerComponentProps = EnrichedTextInputProps & {
  ref?: ForwardedRef<EnrichedTextInputInstance>;
};
