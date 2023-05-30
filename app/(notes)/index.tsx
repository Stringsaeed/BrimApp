import React from "react";
import { Stack, useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { NotesList } from "components";

export default function Page() {
  const router = useRouter();
  const renderHeaderRight = () => {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/notes/create")}
      >
        <PlusIcon />
      </Pressable>
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerTintColor: "black",
          headerShown: true,
          headerRight: renderHeaderRight,
        }}
      />
      <View style={styles.container}>
        <NotesList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
