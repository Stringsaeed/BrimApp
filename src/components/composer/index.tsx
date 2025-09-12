import React, {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import {
  EnrichedTextInput,
  EnrichedTextInputInstance,
  OnChangeStateEvent,
} from "react-native-enriched";
import { Stack, useTheme } from "tamagui";

import { useUserAccent } from "@/hooks";

import { ComposerComponentProps } from "./types";
import useNoteComposer from "./use-note-composer";

function ComposerComponent(
  _: ComposerComponentProps,
  ref: ForwardedRef<EnrichedTextInputInstance>
) {
  const theme = useTheme();
  const styles = useStyles();
  const { accent } = useUserAccent();
  const { onChangeText, value } = useNoteComposer();
  const innerRef = React.useRef<EnrichedTextInputInstance>(null);
  const [, setStylesState] = useState<OnChangeStateEvent | null>();

  useImperativeHandle(ref, () => innerRef.current!);

  useEffect(() => {
    innerRef.current?.setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack flex={1} flexGrow={1}>
      <EnrichedTextInput
        ref={innerRef}
        // onBlur={() => onBlur()}
        onChangeText={(e) => {
          onChangeText(e.nativeEvent.value);
        }}
        onChangeState={(e) => setStylesState(e.nativeEvent)}
        cursorColor={theme[accent]?.val}
        selectionColor={theme[accent]?.val}
        style={styles.input}
      />
    </Stack>
  );
}

const Composer = React.forwardRef(ComposerComponent);
export default Composer;

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    input: {
      backgroundColor: theme.background.val,
      borderColor: "transparent",
      color: theme.color.val,
      borderStyle: "solid",
      borderBottomWidth: 0,
      borderRadius: 0,
      borderWidth: 0,
      padding: 16,
      flexGrow: 1,
      flex: 1,
    },
  });
};
