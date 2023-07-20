import * as React from 'react';

import { RichTextEditorViewProps } from './RichTextEditor.types';

export default function RichTextEditorView(props: RichTextEditorViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
