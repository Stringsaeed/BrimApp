import React, { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

import Spacing from "components/spacing";
import { Body, Subheadline } from "components/typography";
import { theme } from "themes";

interface ListItemProps extends TouchableOpacityProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  subtitle?: string;
  size?: "lg" | "md";
  isFirst?: boolean;
  isLast?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

export default function ListItem({
  contentStyle: overrideContentStyle,
  size = "md",
  subtitle,
  isFirst,
  isLast,
  style,
  title,
  right,
  left,
  ...props
}: ListItemProps) {
  const containerStyle = useMemo<ViewStyle>(() => {
    return StyleSheet.flatten([
      styles.container,
      styles[`${size}Container`],
      isFirst && styles.firstContainer,
      isLast && styles.lastContainer,
      style,
    ]);
  }, [isFirst, isLast, size, style]);

  const contentStyle = useMemo<ViewStyle>(() => {
    return StyleSheet.flatten([
      styles.content,
      styles[`${size}Content`],
      overrideContentStyle,
    ]);
  }, [overrideContentStyle, size]);

  return (
    <TouchableOpacity {...props} style={containerStyle}>
      {!!left && (
        <>
          {left}
          <Spacing size={4} horizontal />
        </>
      )}
      <View style={contentStyle}>
        <Body>{title}</Body>
        {!!subtitle && <Subheadline color="info">{subtitle}</Subheadline>}
      </View>
      {!!right && (
        <>
          <Spacing size={4} horizontal />
          {right}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      height: 1,
      width: 0,
    },
    borderBottomColor: "rgba(60, 60, 67, 0.36)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    shadowColor: theme.colors.dark,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  lastContainer: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomWidth: 0,
  },
  firstContainer: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  mdContent: {
    paddingVertical: 4,
    gap: -4,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  lgContent: {
    paddingVertical: 9,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  mdContainer: {
    height: 44,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  lgContainer: {
    height: 60,
  },
  content: {
    flex: 1,
  },
});
