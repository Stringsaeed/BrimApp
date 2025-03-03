import { fireEvent, screen } from "@testing-library/react-native";
import { useFormikContext } from "formik";
import React from "react";
import { TextInput } from "react-native";

import render from "utils/test";

import NoteTitleInput from "../";

// Mock the useFormikContext hook
jest.mock("formik", () => ({
  useFormikContext: jest.fn(),
}));

describe("NoteTitleInput", () => {
  const mockHandleChange = jest.fn();
  const mockHandleBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default mock implementation
    (useFormikContext as jest.Mock).mockReturnValue({
      values: { title: "Test Title" },
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
    });
  });

  it("renders correctly", () => {
    const { toJSON } = render(<NoteTitleInput />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays the title from form context", () => {
    render(<NoteTitleInput />);
    expect(screen.getByDisplayValue("Test Title")).toBeTruthy();
  });

  it("shows placeholder when title is empty", () => {
    (useFormikContext as jest.Mock).mockReturnValue({
      handleChange: mockHandleChange,
      handleBlur: mockHandleBlur,
      values: { title: "" },
    });

    render(<NoteTitleInput />);
    expect(
      screen.getByPlaceholderText("Wanna title your note? 😒")
    ).toBeTruthy();
  });

  it("calls handleChange when text changes", () => {
    render(<NoteTitleInput />);
    fireEvent.changeText(
      screen.getByLabelText("Text input field"),
      "New Title"
    );
    expect(mockHandleChange).toHaveBeenCalledWith("title");
  });

  it("calls handleBlur when input loses focus", () => {
    render(<NoteTitleInput />);
    fireEvent(screen.getByLabelText("Text input field"), "blur");
    expect(mockHandleBlur).toHaveBeenCalledWith("title");
  });

  it("accepts and applies custom props", () => {
    render(<NoteTitleInput testID="custom-title-input" />);
    expect(screen.getByTestId("custom-title-input")).toBeTruthy();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<TextInput>();
    render(<NoteTitleInput ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
