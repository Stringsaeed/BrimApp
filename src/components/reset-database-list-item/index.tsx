import { Trash2 } from "@tamagui/lucide-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { InteractionManager } from "react-native";
import {
  Button,
  Dialog,
  ListItem,
  Spinner,
  XStack,
  YGroup,
  useWindowDimensions,
} from "tamagui";

import { NoteService } from "services";

export default function ResetDatabaseListItem() {
  const { width } = useWindowDimensions();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation("settings");

  const onReset = () => {
    void InteractionManager.runAfterInteractions(() => {
      setIsLoading(true);
      try {
        NoteService.deleteAll();
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <YGroup.Item>
        <Dialog.Trigger asChild>
          <ListItem
            color="$red10"
            icon={Trash2}
            title={t("deleteDataTitle")}
            subTitle={t("deleteDataDescription")}
          />
        </Dialog.Trigger>
      </YGroup.Item>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          onPress={() => setOpen(false)}
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={["quick", { opacity: { overshootClamping: true } }]}
          enterStyle={{ scale: 0.9, opacity: 0, y: -20, x: 0 }}
          exitStyle={{ scale: 0.95, opacity: 0, y: 20, x: 0 }}
          gap="$4"
          width={width - 32}
        >
          <Dialog.Title>Delete All Notes</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete all notes? This action cannot be
            undone.
          </Dialog.Description>

          <XStack alignSelf="flex-end" gap="$2">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                variant="outlined"
                bordered
                borderWidth={1}
                borderColor="$color"
                aria-label="Cancel"
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              disabled={isLoading}
              onPress={onReset}
              bg="$red10"
              color="$background"
            >
              <Button.Icon>
                {isLoading ? <Spinner size="small" /> : <Trash2 />}
              </Button.Icon>
              Delete All
            </Button>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
