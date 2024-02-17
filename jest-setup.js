import "react-native-gesture-handler/jestSetup";
import "@testing-library/react-native/extend-expect";
import { setUpTests } from "react-native-reanimated";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

setUpTests();

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

export {};
