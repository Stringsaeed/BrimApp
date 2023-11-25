/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/prefer-await-to-then */
import messaging from "@react-native-firebase/messaging";
import Constants from "expo-constants";
// import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import type { Subscription, ExpoPushToken } from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token: ExpoPushToken | undefined;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      name: "default",
    });
  }

  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
  if (projectId) {
    token = await Notifications.getExpoPushTokenAsync({ projectId });
  }
  // } else {
  //   return;
  // }
  await messaging().requestPermission();

  return token?.data;
}

export default function useHandleNotifications() {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(() => {});
    notificationListener.current =
      Notifications.addNotificationReceivedListener(() => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
}
