import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Sparkles, Wand2 } from "@tamagui/lucide-icons";
// import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import React, { ComponentProps, Fragment, useRef } from "react";
import { Button, Spacer, Spinner } from "tamagui";

import BottomSheet from "components/bottom-sheet";
import {
  useFixGrammarMutation,
  useRephraseSentenceMutation,
  useUserAccent,
} from "hooks";
import { NoteFormValues } from "hooks/use-note-form";
import { useFeatureFlag } from "services";

interface Props {
  onOpen?: () => void;
}
export default function NoteToolbox({ onOpen }: Props) {
  const { accent } = useUserAccent();
  // const router = useRouter();
  const ref = useRef<BottomSheetModal>(null);
  const rephraseWithAIFlag = useFeatureFlag("rephrase_with_ai");
  const fixGrammarMutation = useFixGrammarMutation();
  const rephraseSentenceMutation = useRephraseSentenceMutation();
  const { setFieldValue, values } = useFormikContext<NoteFormValues>();

  const handleFixGrammar = async () => {
    const data = await fixGrammarMutation.mutateAsync(values.note);

    void setFieldValue("note", data);
  };

  const handleRephraseSentence = async () => {
    const data = await rephraseSentenceMutation.mutateAsync(values.note);

    void setFieldValue("note", data);
  };

  const handleOpenSheet = () => {
    // const isAuthenticated = !!(await supabaseClient.auth.getSession()).data
    //   .session;
    // if (!isAuthenticated) {
    //   return router.push("/auth/login");
    // }
    if (rephraseWithAIFlag.enabled) {
      onOpen?.();
      requestAnimationFrame(() => {
        ref.current?.present();
      });
    } else {
      void handleFixGrammar();
    }
  };

  return (
    <Fragment>
      <Button
        position="absolute"
        bottom={60}
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
      {!!rephraseWithAIFlag.enabled && (
        <BottomSheet ref={ref}>
          <Button
            size="$6"
            onPress={handleFixGrammar}
            bg={`$${accent}`}
            elevate
          >
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
        </BottomSheet>
      )}
    </Fragment>
  );
}
