import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, YGroup, ListItem, Separator } from "tamagui";

import { ScreenContainer, Spacer } from "components";
import { useSignOutMutation } from "hooks";

export default function Profile() {
  const signOutMutation = useSignOutMutation();
  const navigation = useNavigation();

  return (
    <ScreenContainer
      style={styles.container}
      handleSafeArea="bottom"
      type="fixed"
    >
      <YGroup bordered separator={<Separator />}>
        <YGroup.Item>
          <ListItem
            onPress={() => {
              navigation.navigate("AccountInfo");
            }}
            title="Account Information"
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem title="Notifications Settings" disabled />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            title="Preferences"
            onPress={() => {
              navigation.navigate("Preferences");
            }}
          />
        </YGroup.Item>
      </YGroup>
      <Spacer />
      <Button bg="indigo" size="$5" onPress={() => signOutMutation.mutate()}>
        <Button.Text color="$background">Sign out</Button.Text>
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 24 },
});
