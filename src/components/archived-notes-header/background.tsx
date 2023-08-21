import React from "react";
import { StyleSheet, View } from "react-native";

import BlurView from "components/blur-view";

export default function ArchivedNotesHeaderBackground() {
  return (
    <View style={styles.headerContainer}>
      <BlurView intensity={10} tint="light" style={StyleSheet.absoluteFill} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { flex: 1 },
});
