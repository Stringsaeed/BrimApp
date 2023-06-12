import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from "react-native";

import styles from "./styles";

interface FormScrollContainerProps extends ScrollViewProps {
  centered?: boolean;
}

export default function FormScrollContainer({
  contentContainerStyle,
  centered = true,
  style,
  ...props
}: FormScrollContainerProps) {
  const containerStyle = StyleSheet.flatten([styles.scrollContainer, style]);
  const contentStyle = StyleSheet.flatten([
    styles.contentContainer,
    centered && styles.centered,
    contentContainerStyle,
  ]);
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
        <ScrollView
          style={containerStyle}
          contentContainerStyle={contentStyle}
          {...props}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
