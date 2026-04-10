import React, { useEffect, useImperativeHandle, useState } from "react";
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

function Composer({ ref }: ComposerComponentProps) {
  const theme = useTheme();
  const styles = useStyles();
  const { accent } = useUserAccent();
  const { onChangeText, value } = useNoteComposer();
  const innerRef = React.useRef<EnrichedTextInputInstance>(null);
  const [, setStylesState] = useState<OnChangeStateEvent | null>();

  useImperativeHandle(ref, () => innerRef.current!);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to set the initial value on mount, and not update it when the value changes
  useEffect(() => {
    innerRef.current?.setValue(value);
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
