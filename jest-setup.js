/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@testing-library/react-native/extend-expect";
import React from "react";
import "react-native-gesture-handler/jestSetup";
import { setUpTests } from "react-native-reanimated";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

process.env = Object.assign(process.env, {
  EXPO_PUBLIC_FLAGSMITH_ENVIRONMENT_ID: "flagsmithEnvironmentId",
  EXPO_PUBLIC_SUPABASE_ANON_KEY: "supabaseAnonKey",
  EXPO_PUBLIC_GEMINI_API_KEY: "geminiAPIKey",
  EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY: "",
  EXPO_PUBLIC_SUPABASE_URL: "testing",
  EXPO_PUBLIC_SENTRY_DSN: "sentryDsn",
  NODE_ENV: "supabaseUrl",
});

setUpTests();

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("@gorhom/bottom-sheet", () => {
  const RN = jest.requireActual("react-native");
  const BottomSheetModal = ({
    backdropComponent,
    handleComponent,
    footerComponent,
    children,
    ...props
  }) => {
    return (
      <RN.View {...props}>
        {backdropComponent && backdropComponent()}
        {handleComponent && handleComponent()}
        {children}
        {footerComponent && footerComponent()}
      </RN.View>
    );
  };
  return {
    __esModule: true,
    ...jest.requireActual("@gorhom/bottom-sheet/mock"),
    ...jest.requireActual("react-native-reanimated/mock"),
    TouchableOpacity: jest.requireActual("react-native").TouchableOpacity,
    BottomSheetBackdrop: jest.requireActual("react-native").View,
    BottomSheetHandle: jest.requireActual("react-native").View,
    BottomSheetFooter: jest.requireActual("react-native").View,
    BottomSheetModal,
  };
});

jest.mock("vexo-analytics", () => ({
  identifyDevice: jest.fn(),
  customEvent: jest.fn(),
  vexo: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

jest.mock("@supabase/supabase-js", () => {
  let testData = [
    {
      org_users: [{ id: "mockUserId", status: "active" }],
      id: "mockedRoleId",
    },
  ];

  return {
    createClient: jest.fn().mockImplementation(() => {
      return {
        update: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          data: testData, // Use the data variable here
          error: null,
        })),
        select: jest.fn().mockImplementation(() => ({
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          data: testData, // Use the data variable here
          error: null,
        })),
        from: jest.fn().mockReturnThis(),
      };
    }),
    setTestData: (newData) => {
      testData = newData;
    },
  };
});

export {};
