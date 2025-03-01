import { CoreBridge, darkEditorCss } from "@10play/tentap-editor";

const fontCss = `
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

* {
  font-family: "Inter", sans-serif;
}
`;

const paddingCss = `
.ProseMirror {
  padding: 16px;
}
`;

const buildAllCss = (isDark: boolean) => {
  return `
    ${fontCss}
    ${paddingCss}
    ${isDark ? darkEditorCss : ""}
  `;
};

export const editorCss = (isDark: boolean) => {
  return [CoreBridge.configureCSS(buildAllCss(isDark))];
};
