# Implementation Plan

- [ ] 1. Set up toolbar configuration infrastructure

  - Create toolbar configuration types and interfaces
  - Implement default toolbar configuration service
  - Add toolbar theme integration with existing user accent system
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 2. Create EnrichedToolbar component

  - [ ] 2.1 Implement base EnrichedToolbar component structure

    - Create component file with proper TypeScript interfaces
    - Set up toolbar visibility state management
    - Integrate with Tamagui theme system for consistent styling
    - _Requirements: 1.1, 3.1, 3.2_

  - [ ] 2.2 Implement formatting button components

    - Create reusable formatting button component with active/inactive states
    - Add bold, italic, and underline formatting buttons
    - Implement button press handlers for text formatting
    - _Requirements: 1.2, 1.3, 1.4, 3.1, 3.2_

  - [ ] 2.3 Add toolbar state synchronization with text input
    - Implement cursor position tracking for formatting state updates
    - Add logic to update button states based on current text formatting
    - Handle multiple active formatting states simultaneously
    - _Requirements: 3.3, 3.4_

- [ ] 3. Enhance Composer component with toolbar integration

  - [ ] 3.1 Update Composer component props and refs

    - Extend ComposerComponentProps interface to include toolbar configuration
    - Update ComposerRef interface to expose toolbar methods
    - Add toolbar enable/disable prop handling
    - _Requirements: 6.1, 6.2_

  - [ ] 3.2 Integrate EnrichedToolbar with EnrichedTextInput

    - Connect toolbar component to text input ref
    - Implement toolbar visibility based on input focus state
    - Add proper ref forwarding for toolbar access
    - _Requirements: 1.1, 2.1_

  - [ ] 3.3 Implement keyboard avoidance using react-native-keyboard-controller
    - Add useReanimatedKeyboardAnimation hook integration
    - Create animated positioning for toolbar above keyboard
    - Handle keyboard show/hide animations smoothly
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 4. Add advanced formatting capabilities

  - [ ] 4.1 Implement heading formatting options

    - Add heading1 and heading2 formatting buttons
    - Create heading style definitions in theme system
    - Implement heading toggle functionality
    - _Requirements: 1.5, 1.6, 3.1, 3.2_

  - [ ] 4.2 Add list formatting functionality
    - Implement bullet list and numbered list buttons
    - Add list creation and toggle logic
    - Handle nested list scenarios
    - _Requirements: 1.5, 1.6, 3.1, 3.2_

- [ ] 5. Implement rich text persistence

  - [ ] 5.1 Update note data model for rich text content

    - Extend note database schema to support HTML content
    - Create migration script for existing plain text notes
    - Add rich text content validation
    - _Requirements: 5.1, 5.2_

  - [ ] 5.2 Implement rich text serialization and deserialization

    - Add HTML to/from EnrichedTextInput conversion utilities
    - Implement content sanitization for security
    - Add fallback handling for corrupted rich text content
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ] 5.3 Update note saving and loading logic
    - Modify useNoteComposer hook to handle rich text content
    - Update note creation and update mutations for rich text
    - Ensure backward compatibility with existing plain text notes
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 6. Integrate toolbar with existing note toolbox

  - [ ] 6.1 Update NoteScreen layout for toolbar positioning

    - Modify NoteScreen component to accommodate toolbar
    - Ensure proper spacing between composer, toolbar, and note toolbox
    - Handle layout adjustments for different screen sizes
    - _Requirements: 4.1, 4.2_

  - [ ] 6.2 Coordinate toolbar and toolbox focus management
    - Update note toolbox blur handling to work with formatting toolbar
    - Ensure smooth transitions between formatting and AI features
    - Implement proper focus restoration after toolbox operations
    - _Requirements: 4.3, 4.4_

- [ ] 7. Add toolbar configuration and customization

  - [ ] 7.1 Create toolbar configuration hook

    - Implement useToolbarConfig hook for configuration management
    - Add configuration persistence using existing storage service
    - Create default configuration with all formatting tools enabled
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 7.2 Implement dynamic toolbar tool enabling/disabling
    - Add logic to show/hide toolbar buttons based on configuration
    - Create configuration update methods
    - Ensure toolbar updates without app restart
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8. Add comprehensive testing

  - [ ] 8.1 Create unit tests for toolbar components

    - Write tests for EnrichedToolbar component functionality
    - Add tests for formatting button state management
    - Test toolbar configuration service methods
    - _Requirements: All requirements validation_

  - [ ] 8.2 Add integration tests for composer and toolbar
    - Test complete formatting workflow from selection to application
    - Verify keyboard avoidance behavior
    - Test rich text persistence and loading
    - _Requirements: All requirements validation_

- [ ] 9. Performance optimization and polish

  - [ ] 9.1 Optimize toolbar rendering performance

    - Implement React.memo for toolbar buttons to prevent unnecessary re-renders
    - Add animation performance optimizations using native driver
    - Optimize toolbar state updates for smooth user experience
    - _Requirements: 2.5, 3.3_

  - [ ] 9.2 Add accessibility improvements
    - Implement proper ARIA labels for all toolbar buttons
    - Add screen reader announcements for formatting state changes
    - Ensure keyboard navigation support for toolbar
    - _Requirements: All requirements accessibility compliance_
