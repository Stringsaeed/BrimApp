# Requirements Document

## Introduction

This feature enhances the BrimApp composer component by integrating react-native-enriched's toolbar functionality to provide rich text formatting capabilities. The implementation will include proper keyboard avoidance using react-native-keyboard-controller to ensure the toolbar remains accessible when the keyboard is visible. This will transform the current plain text composer into a rich text editor with formatting options like bold, italic, underline, and other text styling features.

## Requirements

### Requirement 1

**User Story:** As a user, I want to format my notes with rich text options like bold, italic, and underline, so that I can create more visually appealing and organized content.

#### Acceptance Criteria

1. WHEN the user focuses on the composer input THEN the formatting toolbar SHALL appear above the keyboard
2. WHEN the user taps bold button THEN the selected text SHALL become bold OR new text SHALL be typed in bold
3. WHEN the user taps italic button THEN the selected text SHALL become italic OR new text SHALL be typed in italic
4. WHEN the user taps underline button THEN the selected text SHALL become underlined OR new text SHALL be typed underlined
5. WHEN the user has no text selected AND taps a formatting button THEN the formatting SHALL apply to subsequently typed text
6. WHEN the user has text selected AND taps a formatting button THEN the formatting SHALL apply only to the selected text

### Requirement 2

**User Story:** As a user, I want the formatting toolbar to be properly positioned and accessible when the keyboard is open, so that I can easily access formatting options while typing.

#### Acceptance Criteria

1. WHEN the keyboard appears THEN the toolbar SHALL be positioned directly above the keyboard
2. WHEN the keyboard height changes THEN the toolbar SHALL adjust its position accordingly
3. WHEN the keyboard disappears THEN the toolbar SHALL hide smoothly
4. WHEN the device orientation changes THEN the toolbar SHALL maintain proper positioning
5. IF the keyboard animation is in progress THEN the toolbar SHALL animate smoothly with the keyboard

### Requirement 3

**User Story:** As a user, I want to toggle formatting options on and off, so that I can control when specific formatting is applied to my text.

#### Acceptance Criteria

1. WHEN a formatting option is active THEN the corresponding toolbar button SHALL show an active/pressed state
2. WHEN the user taps an active formatting button THEN the formatting SHALL be removed from selected text OR disabled for new text
3. WHEN the cursor moves to differently formatted text THEN the toolbar buttons SHALL update to reflect the current formatting state
4. WHEN multiple formatting options are applied THEN multiple toolbar buttons SHALL show active states simultaneously

### Requirement 4

**User Story:** As a user, I want the formatting toolbar to integrate seamlessly with the existing note toolbox, so that I have access to both formatting and AI features without conflicts.

#### Acceptance Criteria

1. WHEN both the formatting toolbar and note toolbox are visible THEN they SHALL not overlap or interfere with each other
2. WHEN the formatting toolbar is active THEN the existing AI features in the note toolbox SHALL remain accessible
3. WHEN the user switches between formatting and AI features THEN the transitions SHALL be smooth and intuitive
4. WHEN the composer loses focus THEN both the formatting toolbar and note toolbox SHALL handle the state change appropriately

### Requirement 5

**User Story:** As a user, I want the rich text formatting to persist when I save and reopen my notes, so that my formatting choices are preserved.

#### Acceptance Criteria

1. WHEN the user saves a note with formatting THEN the formatting SHALL be preserved in the database
2. WHEN the user reopens a formatted note THEN all formatting SHALL be displayed correctly
3. WHEN the user edits a formatted note THEN the existing formatting SHALL be maintained unless explicitly changed
4. WHEN the note content is synchronized across devices THEN the formatting SHALL be preserved on all devices

### Requirement 6

**User Story:** As a developer, I want the toolbar integration to be configurable, so that formatting options can be enabled or disabled based on user preferences or feature flags.

#### Acceptance Criteria

1. WHEN the toolbar is configured THEN specific formatting options SHALL be able to be enabled or disabled
2. WHEN a formatting option is disabled THEN it SHALL not appear in the toolbar
3. WHEN the toolbar configuration changes THEN the UI SHALL update without requiring an app restart
4. WHEN no formatting options are enabled THEN the toolbar SHALL not be displayed
