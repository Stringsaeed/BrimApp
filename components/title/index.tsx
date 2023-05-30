import React from "react";
import { StyleSheet, Text } from "react-native";

interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: { fontSize: 36, fontWeight: "700" },
});
