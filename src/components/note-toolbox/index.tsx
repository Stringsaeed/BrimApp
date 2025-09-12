import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Sparkles, Wand2 } from "@tamagui/lucide-icons";
import { useFormikContext } from "formik";
import React, { ComponentProps, useRef } from "react";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Button, Spacer, Spinner } from "tamagui";

import BottomSheet from "@/components/bottom-sheet";
import {
  useFixGrammarMutation,
  useRephraseSentenceMutation,
  useUserAccent,
} from "@/hooks";
import { NoteFormValues } from "@/hooks/use-note-form";

import VoiceRecordingButton from "../voice-recording-button";

interface Props {
  onOpen?: () => void;
}

export default function NoteToolbox({ onOpen }: Props) {
  const { accent } = useUserAccent();
  const ref = useRef<BottomSheetModal>(null);
  const fixGrammarMutation = useFixGrammarMutation();
  const rephraseSentenceMutation = useRephraseSentenceMutation();
  const { setFieldValue, values } = useFormikContext<NoteFormValues>();
  const { height } = useReanimatedKeyboardAnimation();

  const handleFixGrammar = async () => {
    const data = await fixGrammarMutation.mutateAsync(values.note);

    void setFieldValue("note", data);
  };

  const handleRephraseSentence = async () => {
    const data = await rephraseSentenceMutation.mutateAsync(values.note);

    void setFieldValue("note", data);
  };

  const handleOpenSheet = () => {
    onOpen?.();
    requestAnimationFrame(() => {
      ref.current?.present();
    });
  };

  const handleRecordVoiceNote = (value: string) => {
    void setFieldValue("note", value);
  };

  return (
    <Animated.View
      style={useAnimatedStyle(() => ({
        transform: [{ translateY: height.value }],
        flexDirection: "row",
      }))}
    >
      <VoiceRecordingButton onTranscribe={handleRecordVoiceNote} />
      <Button
        position="absolute"
        bottom={40}
        right={20}
        borderRadius="$12"
        bg={`$${accent}`}
        scaleIcon={2}
        icon={
          (({ color, size }: { color: string; size: number }) =>
            fixGrammarMutation.isPending ? (
              <Spinner color={color} />
            ) : (
              <Wand2 color="$background" size={size} />
            )) as ComponentProps<typeof Button>["icon"]
        }
        aspectRatio={1}
        width={60}
        height={60}
        onPress={handleOpenSheet}
        elevate
      />
      <BottomSheet ref={ref}>
        <Button size="$6" onPress={handleFixGrammar} bg={`$${accent}`} elevate>
          <Button.Icon scaleIcon={1.5}>
            {fixGrammarMutation.isPending ? (
              <Spinner color="$background" />
            ) : (
              <Sparkles size="$2" color="$background" />
            )}
          </Button.Icon>
          <Button.Text size="$6" color="$background">
            Fix Grammar With AI
          </Button.Text>
        </Button>
        <Spacer />
        <Button
          size="$6"
          onPress={handleRephraseSentence}
          bg={`$${accent}`}
          elevate
        >
          <Button.Icon scaleIcon={1.5}>
            {rephraseSentenceMutation.isPending ? (
              <Spinner color="$background" />
            ) : (
              <Sparkles size="$2" color="$background" />
            )}
          </Button.Icon>
          <Button.Text size="$6" color="$background">
            Rephrase With AI
          </Button.Text>
        </Button>
        <Spacer />
      </BottomSheet>
    </Animated.View>
  );
}
