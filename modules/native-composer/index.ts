/* eslint-disable import/no-extraneous-dependencies */
import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to NativeComposer.web.ts
// and on native platforms to NativeComposer.ts
import {
  ChangeEventPayload,
  NativeComposerViewProps,
} from "./src/NativeComposer.types";
import NativeComposerModule from "./src/NativeComposerModule";
import NativeComposerView from "./src/NativeComposerView";

// Get the native constant value.
export const PI = NativeComposerModule.PI;

export function hello(): string {
  return NativeComposerModule.hello();
}

export async function setValueAsync(value: string) {
  return await NativeComposerModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  NativeComposerModule ?? NativeModulesProxy.NativeComposer
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { NativeComposerView, NativeComposerViewProps, ChangeEventPayload };
