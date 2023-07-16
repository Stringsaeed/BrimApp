import auth from "@react-native-firebase/auth";
import { useFormik } from "formik";
import React from "react";
import {
  StyleSheet,
  View,
  PlatformColor,
  Platform,
  ColorValue,
  TouchableNativeFeedback,
} from "react-native";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import {
  AnimatedKeyboardView,
  Banner,
  Body,
  Input,
  ListItem,
  Spacing,
} from "components";
import { useAuth } from "contexts";
import { useAnimatedToggle } from "hooks";
import { combineStyles, theme } from "themes";

export default function AccountInfoScreen() {
  const { user } = useAuth();
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
      <AddEmailBanner />
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

function AddEmailBanner() {
  const { user } = useAuth();

  const [showAddEmail, toggleShowAddEmail] = useAnimatedToggle(!!user?.email);

  const { handleSubmit, handleChange, handleBlur, isValid, values, dirty } =
    useFormik({
      onSubmit: (values) => {
        auth().currentUser?.verifyBeforeUpdateEmail(values.email);
      },
      initialValues: {
        email: "",
      },
      validationSchema,
    });

  const buttonDisabled = !isValid || !dirty;

  if (user?.email) return null;

  return (
    <Banner
      color={color}
      label="Link your email"
      shownValue={showAddEmail}
      onClose={toggleShowAddEmail}
    >
      <Input
        placeholder="Email Address"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        style={styles.emailInput}
      />

      <Spacing size={2} />
      <TouchableNativeFeedback
        disabled={buttonDisabled}
        // @ts-expect-error
        onPress={handleSubmit}
        accessibilityRole="button"
      >
        <View
          style={[
            styles.submitBtnContainer,
            buttonDisabled && styles.submitBtnContainerDisabled,
          ]}
        >
          <Body color="dark">Submit</Body>
        </View>
      </TouchableNativeFeedback>
    </Banner>
  );
}

// function EmailVerifiedBanner() {
//   return (
//     <Banner>
//       <CheckCircle size={24} color={theme.colors.success} />
//       <Spacing size={2} />
//       <Body color="success">Email Verified</Body>
//     </Banner>
//   );
// }

const emailFieldSchema = z.string().email();
const formSchema = z.object({
  email: emailFieldSchema,
});
const validationSchema = toFormikValidationSchema(formSchema);

const styles = StyleSheet.create({
  submitBtnContainer: {
    backgroundColor: PlatformColor("systemGreen"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: "100%",
    height: 43,
  },
  emailInput: {
    paddingVertical: 0,
    paddingBottom: 0,
    paddingTop: 0,
    height: 48,
  },
  submitBtnContainerDisabled: {
    opacity: 0.5,
  },
});

const color = Platform.select<ColorValue>({
  android: PlatformColor("@android:color/background_light"),
  ios: PlatformColor("systemGray6"),
  default: theme.colors.info,
});
