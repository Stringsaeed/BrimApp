import { Link, LinkProps } from "expo-router";
import React, { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Spacing from "components/spacing";
import { Body, Subheadline } from "components/typography";
import { theme } from "themes";

interface ListItemProps extends LinkProps<string> {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  subtitle?: string;
  size?: "lg" | "md";
  isFirst?: boolean;
  isLast?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
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
    <Link {...props} asChild style={containerStyle}>
      <TouchableOpacity accessibilityRole="button" style={containerStyle}>
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
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.background,
    borderColor: "rgba(60, 60, 67, 0.36)",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  firstContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  lastContainer: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
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
  lgContainer: {
    height: 60,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  mdContainer: {
    height: 44,
  },
  content: {
    flex: 1,
  },
});
