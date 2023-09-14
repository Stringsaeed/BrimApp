import * as React from 'react';

import { NativeComposerViewProps } from './NativeComposer.types';

export default function NativeComposerView(props: NativeComposerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
