/* eslint-disable no-useless-escape */
const fs = require("fs");

const {
  WarningAggregator,
  withDangerousMod,
  IOSConfig,
} = require("@expo/config-plugins");

const firebaseImport = `#import <Firebase/Firebase.h>`;
const firebaseAppCheckImport = `#import "RNFBAppCheckModule.h"`;
const methodInvocationBlock = `[RNFBAppCheckModule sharedInstance];`;
const firebaseAppConfigure = `[FIRApp configure];`;

function modifyObjcAppDelegate(contents) {
  if (
    !contents.includes(firebaseImport) &&
    !contents.includes(firebaseAppConfigure)
  ) {
    WarningAggregator.addWarningIOS(
      "@react-native-firebase/app",
      "Unable to determine correct Firebase insertion point in AppDelegate.m. Skipping Firebase addition."
    );
    return contents;
  }

  // Add import
  if (!contents.includes(firebaseAppCheckImport)) {
    contents = contents.replace(
      `${firebaseImport}`,
      `${firebaseAppCheckImport}
${firebaseImport}`
    );
  }

  // To avoid potential issues with existing changes from older plugin versions
  if (contents.includes(methodInvocationBlock)) {
    return contents;
  }

  contents = contents.replace(
    `${firebaseAppConfigure}`,
    `${methodInvocationBlock}
${firebaseAppConfigure}`
  );

  return contents;
}

async function modifyAppDelegateAsync(appDelegateFileInfo) {
  const { contents, language, path } = appDelegateFileInfo;

  if (["objc", "objcpp"].includes(language)) {
    const newContents = modifyObjcAppDelegate(contents);
    await fs.promises.writeFile(path, newContents);
  } else {
    // TODO: Support Swift
    throw new Error(
      `Cannot add Firebase code to AppDelegate of language "${language}"`
    );
  }
}

const withFirebaseAppDelegate = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const fileInfo = IOSConfig.Paths.getAppDelegate(
        config.modRequest.projectRoot
      );
      await modifyAppDelegateAsync(fileInfo);
      return config;
    },
  ]);
};

exports.modifyObjcAppDelegate = modifyObjcAppDelegate;
exports.modifyAppDelegateAsync = modifyAppDelegateAsync;
exports.withFirebaseAppDelegate = withFirebaseAppDelegate;
