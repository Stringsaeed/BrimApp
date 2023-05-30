import { NotesList } from "components";
import { Stack, useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const router = useRouter();
  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/notes/create")}>
        <PlusIcon />
      </Pressable>
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          // title: "test",
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
