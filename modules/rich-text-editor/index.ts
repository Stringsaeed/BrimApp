import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RichTextEditor.web.ts
// and on native platforms to RichTextEditor.ts
import RichTextEditorModule from './src/RichTextEditorModule';
import RichTextEditorView from './src/RichTextEditorView';
import { ChangeEventPayload, RichTextEditorViewProps } from './src/RichTextEditor.types';

// Get the native constant value.
export const PI = RichTextEditorModule.PI;

export function hello(): string {
  return RichTextEditorModule.hello();
}

export async function setValueAsync(value: string) {
  return await RichTextEditorModule.setValueAsync(value);
}

const emitter = new EventEmitter(RichTextEditorModule ?? NativeModulesProxy.RichTextEditor);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RichTextEditorView, RichTextEditorViewProps, ChangeEventPayload };
