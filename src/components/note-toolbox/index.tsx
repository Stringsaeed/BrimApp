import { useMutation } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import { MagicWand, Sparkle } from "phosphor-react-native";
import React, { Fragment } from "react";
import { Button, Sheet, Spinner } from "tamagui";

import { NoteFormValues } from "hooks/use-note-form";
import huggingFaceAI from "services/ai";

interface Props {
  onOpen?: () => void;
}
export default function NoteToolbox({ onOpen }: Props) {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const fixGrammarMutation = useMutation(
    (text: string) => huggingFaceAI("fixGrammar", text),
    {
      onSuccess(data) {
        setFieldValue("note", data);
      },
    }
  );
  const { setFieldValue, values } = useFormikContext<NoteFormValues>();

  const handleFixGrammar = () => {
    fixGrammarMutation.mutate(values.note);
  };

  const handleOpenSheet = () => {
    onOpen?.();
    requestAnimationFrame(() => {
      setIsSheetOpen(true);
    });
  };

  return (
    <Fragment>
      <Button
        position="absolute"
        bottom={60}
        right={20}
        borderRadius="$radius.12"
        backgroundColor="$pink10"
        scaleIcon={2.2}
        icon={({ color, size }) => <MagicWand color={color} size={size} />}
        aspectRatio={1}
        width={60}
        height={60}
        onPress={handleOpenSheet}
        shadowColor="$pink10"
        shadowOffset={{ height: 10, width: 0 }}
        shadowOpacity={0.5}
        shadowRadius={20}
        elevationAndroid={2}
      />
      <Sheet
        dismissOnSnapToBottom
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        animation="bouncy"
        snapPoints={[25, 50]}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame flex={1} padding="$4">
          <Button
            size="$6"
            onPress={handleFixGrammar}
            bg="$blue10"
            shadowColor="$pink10"
            shadowOffset={{ height: 10, width: 0 }}
            shadowOpacity={0.5}
            shadowRadius={20}
            elevationAndroid={2}
            scaleIcon={1.5}
            icon={({ color, size }) =>
              fixGrammarMutation.isLoading ? (
                <Spinner color={color} />
              ) : (
                <Sparkle size={size} color={color} />
              )
            }
          >
            Fix Grammar With AI
          </Button>
        </Sheet.Frame>
      </Sheet>
    </Fragment>
  );
}
