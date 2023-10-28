const { createRunOncePlugin, withPlugins } = require("@expo/config-plugins");

const { withFirebaseAppDelegate } = require("./helpers/iosAppDelegate");

/**
 * A config plugin for configuring `@react-native-firebase/app`
 */
const withFirebaseAppCheck = (config) => {
  return withPlugins(config, [
    // iOS
    withFirebaseAppDelegate,
  ]);
};

module.exports = createRunOncePlugin(
  withFirebaseAppCheck,
  "BrimApp_FirebaseAppCheck",
  "1.0.0"
);
