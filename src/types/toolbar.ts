export type FormattingTool =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "heading1"
  | "heading2"
  | "bulletList"
  | "numberedList";

export type ToolbarPosition = "above-keyboard" | "fixed-bottom";

export interface ToolbarTheme {
  backgroundColor: string;
  buttonColor: string;
  activeButtonColor: string;
  iconColor: string;
}

export interface ToolbarConfig {
  enabledTools: FormattingTool[];
  theme: ToolbarTheme;
  position: ToolbarPosition;
  animationDuration: number;
}

export interface ToolbarState {
  activeTools: FormattingTool[];
  isVisible: boolean;
}

export interface ToolbarConfiguration {
  id: string;
  userId?: string;
  enabledTools: FormattingTool[];
  theme: ToolbarTheme;
  position: ToolbarPosition;
  animationDuration: number;
  createdAt: Date;
  updatedAt: Date;
}
