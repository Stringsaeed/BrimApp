export type ComposerComponentProps = unknown;

export interface ComposerRef {
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean;
}
