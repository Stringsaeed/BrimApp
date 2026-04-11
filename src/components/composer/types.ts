import { ForwardedRef } from "react";
import { EnrichedTextInputInstance } from "react-native-enriched";

export type ComposerComponentProps = {
  ref?: ForwardedRef<EnrichedTextInputInstance>;
  onFocus?: () => void;
  onBlur?: () => void;
};
