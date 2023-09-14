import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { NativeComposerViewProps } from './NativeComposer.types';

const NativeView: React.ComponentType<NativeComposerViewProps> =
  requireNativeViewManager('NativeComposer');

export default function NativeComposerView(props: NativeComposerViewProps) {
  return <NativeView {...props} />;
}
