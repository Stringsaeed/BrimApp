import React from "react";
import { View } from "react-native";

import {
  AnimatedKeyboardView,
  Banner,
  Body,
  Caption1,
  Input,
  ListItem,
  Spacing,
} from "components";
import { useAuth } from "contexts";
import { useAnimatedToggle } from "hooks";
import { combineStyles } from "themes";

export default function AccountInfoScreen() {
  const { user } = useAuth();
  const [showAddEmail, toggleShowAddEmail] = useAnimatedToggle(!!user?.email);

  return (
    <AnimatedKeyboardView
      style={combineStyles(
        "container",
        "keyboardContainer",
        "baseScreen",
        "background",
        "gap"
      )}
    >
      <Banner shownValue={showAddEmail} onClose={toggleShowAddEmail}>
        <Body emphasized>Email</Body>
        <Spacing size={2} />
        <Caption1>Link your email to your phone number</Caption1>
        <Spacing size={1} />
        <Caption1 italic>(optional but recommended)</Caption1>
        <Spacing size={2} />
        <Input
          placeholder="Email Address"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Banner>

      <View>
        <ListItem
          isFirst
          href="/"
          size="lg"
          disabled
          title="Display Name"
          subtitle={user?.displayName ?? ""}
        />
        <ListItem
          href="/"
          disabled
          size="lg"
          title="Email"
          subtitle={user?.email ?? ""}
        />
        <ListItem
          isLast
          href="/"
          disabled
          size="lg"
          title="Phone Number"
          subtitle={user?.phoneNumber ?? ""}
        />
      </View>
    </AnimatedKeyboardView>
  );
}
