export interface ComposerComponentProps {
  onLoadEnd?: () => void;
}

export interface ComposerRef {
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean;
}
