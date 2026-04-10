# Design Document

## Overview

This design outlines the integration of react-native-enriched's toolbar functionality with the existing composer component in BrimApp. The solution will enhance the current plain text editor with rich text formatting capabilities while maintaining seamless keyboard avoidance using react-native-keyboard-controller. The design focuses on creating a configurable, accessible, and performant rich text editing experience that integrates smoothly with existing AI-powered features.

## Architecture

### Component Hierarchy

```
NoteScreen
├── NoteTitleInput
├── Composer (Enhanced)
│   ├── EnrichedTextInput
│   └── EnrichedToolbar (New)
└── NoteToolbox (Existing)
```

### Key Components

1. **Enhanced Composer Component**: Extended to support toolbar integration
2. **EnrichedToolbar Component**: New component wrapping react-native-enriched's toolbar
3. **Toolbar Configuration Service**: Manages which formatting options are available
4. **Keyboard Avoidance Manager**: Handles positioning using react-native-keyboard-controller

## Components and Interfaces

### Enhanced Composer Component

```typescript
interface ComposerProps {
  ref?: ForwardedRef<EnrichedTextInputInstance>;
  onFocus?: () => void;
  onBlur?: () => void;
  toolbarEnabled?: boolean;
  toolbarConfig?: ToolbarConfig;
}

interface ComposerRef extends EnrichedTextInputInstance {
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean;
  getToolbarRef: () => EnrichedToolbarInstance | null;
}
```

### EnrichedToolbar Component

```typescript
interface EnrichedToolbarProps {
  textInputRef: RefObject<EnrichedTextInputInstance>;
  visible: boolean;
  config: ToolbarConfig;
  onStateChange?: (state: ToolbarState) => void;
}

interface ToolbarConfig {
  enabledTools: FormattingTool[];
  theme: ToolbarTheme;
  position: "above-keyboard" | "fixed-bottom";
}

type FormattingTool =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "heading1"
  | "heading2"
  | "bulletList"
  | "numberedList";

interface ToolbarState {
  activeTools: FormattingTool[];
  isVisible: boolean;
}
```

### Keyboard Avoidance Manager

```typescript
interface KeyboardAvoidanceManager {
  keyboardHeight: SharedValue<number>;
  toolbarPosition: SharedValue<number>;
  animateWithKeyboard: (callback: () => void) => void;
}
```

### Toolbar Configuration Service

```typescript
interface ToolbarConfigService {
  getDefaultConfig(): ToolbarConfig;
  updateConfig(config: Partial<ToolbarConfig>): void;
  isToolEnabled(tool: FormattingTool): boolean;
}
```

## Data Models

### Toolbar Configuration Model

```typescript
interface ToolbarConfiguration {
  id: string;
  userId?: string;
  enabledTools: FormattingTool[];
  theme: {
    backgroundColor: string;
    buttonColor: string;
    activeButtonColor: string;
    iconColor: string;
  };
  position: "above-keyboard" | "fixed-bottom";
  animationDuration: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Rich Text Content Model

```typescript
interface RichTextContent {
  html: string;
  plainText: string;
  formatting: FormattingRange[];
}

interface FormattingRange {
  start: number;
  end: number;
  type: FormattingTool;
  attributes?: Record<string, any>;
}
```

## Error Handling

### Toolbar Initialization Errors

- **Scenario**: Toolbar fails to initialize with EnrichedTextInput
- **Handling**: Fallback to plain text mode with error logging
- **User Experience**: Show subtle notification about reduced functionality

### Keyboard Animation Conflicts

- **Scenario**: Multiple keyboard animations conflict with toolbar positioning
- **Handling**: Debounce keyboard events and use latest animation state
- **User Experience**: Smooth animations with no visual glitches

### Rich Text Parsing Errors

- **Scenario**: Corrupted or invalid rich text content
- **Handling**: Graceful degradation to plain text with content preservation
- **User Experience**: Content is never lost, formatting may be stripped

### Configuration Loading Errors

- **Scenario**: Toolbar configuration fails to load
- **Handling**: Use default configuration with retry mechanism
- **User Experience**: Toolbar appears with default settings

## Testing Strategy

### Unit Tests

1. **Composer Component Tests**

   - Toolbar visibility based on focus state
   - Configuration prop handling
   - Ref forwarding and method exposure

2. **EnrichedToolbar Component Tests**

   - Button state management
   - Formatting application
   - Theme integration

3. **Keyboard Avoidance Tests**

   - Position calculations
   - Animation synchronization
   - Orientation change handling

4. **Configuration Service Tests**
   - Default configuration loading
   - Configuration updates
   - Tool enablement checks

### Integration Tests

1. **Composer + Toolbar Integration**

   - Text selection and formatting
   - Multiple formatting combinations
   - Undo/redo functionality

2. **Keyboard + Toolbar Integration**

   - Positioning during keyboard show/hide
   - Animation smoothness
   - Device rotation scenarios

3. **Persistence Integration**
   - Rich text saving and loading
   - Cross-device synchronization
   - Migration from plain text

### End-to-End Tests

1. **Complete Formatting Workflow**

   - Create note with formatting
   - Save and reopen note
   - Verify formatting preservation

2. **Multi-Device Synchronization**
   - Format text on device A
   - Verify formatting appears on device B
   - Edit formatting on device B
   - Verify changes sync to device A

## Implementation Phases

### Phase 1: Core Toolbar Integration

- Enhance Composer component with toolbar support
- Implement basic formatting tools (bold, italic, underline)
- Add keyboard avoidance using react-native-keyboard-controller

### Phase 2: Advanced Formatting

- Add heading styles and list formatting
- Implement toolbar state management
- Add configuration service

### Phase 3: Persistence and Sync

- Implement rich text content model
- Add database schema updates
- Ensure cross-device synchronization

### Phase 4: Polish and Configuration

- Add toolbar theming
- Implement configuration UI
- Performance optimizations and testing

## Performance Considerations

### Rendering Optimization

- Use React.memo for toolbar buttons to prevent unnecessary re-renders
- Implement virtualization for large toolbar configurations
- Optimize animation performance with native driver

### Memory Management

- Properly cleanup keyboard listeners on component unmount
- Manage toolbar state efficiently to prevent memory leaks
- Use weak references where appropriate

### Bundle Size Impact

- Lazy load toolbar components when not needed
- Tree-shake unused formatting tools
- Optimize icon assets and use vector graphics

## Accessibility

### Screen Reader Support

- Proper ARIA labels for all toolbar buttons
- Announce formatting state changes
- Keyboard navigation support

### Visual Accessibility

- High contrast mode support
- Configurable button sizes
- Clear visual indicators for active states

### Motor Accessibility

- Adequate touch targets (minimum 44pt)
- Support for external keyboards
- Voice control compatibility
