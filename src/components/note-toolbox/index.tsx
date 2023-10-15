import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Archive, Sparkles, Wand2 } from "@tamagui/lucide-icons";
import { useFormikContext } from "formik";
import React, { Fragment, useRef } from "react";
import { Button, Spacer, Spinner } from "tamagui";

import BottomSheet from "components/bottom-sheet";
import { useFixGrammarMutation, useRephraseSentenceMutation } from "hooks";
import { NoteFormValues } from "hooks/use-note-form";

interface Props {
  onOpen?: () => void;
}
export default function NoteToolbox({ onOpen }: Props) {
  const ref = useRef<BottomSheetModal>(null);
  const fixGrammarMutation = useFixGrammarMutation();
  const rephraseSentenceMutation = useRephraseSentenceMutation();
  const { setFieldValue, values } = useFormikContext<NoteFormValues>();

  const handleFixGrammar = async () => {
    const data = await fixGrammarMutation.mutateAsync(values.note);

    setFieldValue("note", data);
  };

  const handleRephraseSentence = async () => {
    const data = await rephraseSentenceMutation.mutateAsync(values.note);

    setFieldValue("note", data);
  };

  const handleOpenSheet = () => {
    onOpen?.();
    requestAnimationFrame(() => {
      ref.current?.present();
    });
  };

  return (
    <Fragment>
      <Button
        position="absolute"
        bottom={60}
        right={20}
        borderRadius="$radius.12"
        bg="$accent"
        scaleIcon={2}
        icon={({ size }) => <Wand2 color="$background" size={size} />}
        aspectRatio={1}
        width={60}
        height={60}
        onPress={handleOpenSheet}
        elevate
      />
      <BottomSheet ref={ref}>
        <Button size="$6" onPress={handleFixGrammar} bg="$accent" elevate>
          <Button.Icon scaleIcon={1.5}>
            {fixGrammarMutation.isLoading ? (
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
        <Button size="$6" onPress={handleRephraseSentence} bg="$accent" elevate>
          <Button.Icon scaleIcon={1.5}>
            {rephraseSentenceMutation.isLoading ? (
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
    </Fragment>
  );
}
