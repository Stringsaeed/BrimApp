import { Trash2 } from "@tamagui/lucide-icons";
import React from "react";
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

import { wmDatabase } from "config";

export default function ResetDatabaseListItem() {
  const { width } = useWindowDimensions();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onReset = () => {
    void InteractionManager.runAfterInteractions(async () => {
      setIsLoading(true);
      try {
        await wmDatabase.write(async () => {
          const notes = await wmDatabase.get("notes").query().fetch();
          await wmDatabase.batch(
            ...notes.map((note) => note.prepareDestroyPermanently())
          );
        });
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
            title="Delete all data"
            subTitle="This cannot be undone"
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
