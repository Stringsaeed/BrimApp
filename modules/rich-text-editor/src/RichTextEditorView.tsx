import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RichTextEditorViewProps } from './RichTextEditor.types';

const NativeView: React.ComponentType<RichTextEditorViewProps> =
  requireNativeViewManager('RichTextEditor');

export default function RichTextEditorView(props: RichTextEditorViewProps) {
  return <NativeView {...props} />;
}
