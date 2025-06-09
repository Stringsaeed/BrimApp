import { Buffer } from "buffer";

import React, { useRef, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useSpeechToText } from "react-native-executorch";
import LiveAudioStream from "react-native-live-audio-stream";
import { useSharedValue } from "react-native-reanimated";
import { Spinner, View } from "tamagui";

import { useUserAccent } from "@/hooks";
import { Sentry } from "@/services";

import ReanimatedIconWaveform from "./reanimated-icon-waveform";

const audioStreamOptions = {
  sampleRate: 16000,
  bitsPerSample: 16,
  bufferSize: 16000,
  audioSource: 1,
  channels: 1,
};

const startStreamingAudio = (options: any, onChunk: (data: string) => void) => {
  LiveAudioStream.init(options);
  LiveAudioStream.on("data", onChunk);
  LiveAudioStream.start();
};

const float32ArrayFromPCMBinaryBuffer = (b64EncodedBuffer: string) => {
  const b64DecodedChunk = Buffer.from(b64EncodedBuffer, "base64");
  const int16Array = new Int16Array(b64DecodedChunk.buffer);

  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = Math.max(
      -1,
      Math.min(1, (int16Array[i] / audioStreamOptions.bufferSize) * 8)
    );
  }
  return float32Array;
};

export default function VoiceRecordingButton({
  onTranscribe,
}: {
  onTranscribe?: (text: string) => void;
}) {
  const volumeProgress = useSharedValue(0);
  const [isRecording, setIsRecording] = useState(false);
  const { accent } = useUserAccent();
  const { isGenerating, transcribe, isReady } = useSpeechToText({
    streamingConfig: "quality",
    modelName: "moonshine",
  });
  const audioBuffer = useRef<number[]>([]);

  const onChunk = (data: string) => {
    const float32Chunk = float32ArrayFromPCMBinaryBuffer(data);
    audioBuffer.current?.push(...float32Chunk);
  };

  const handleRecordPress = async () => {
    if (Platform.OS === "android") {
      const permission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (!permission) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission not granted");
          return;
        }
      }
    }

    if (isRecording) {
      try {
        setIsRecording(false);

        await LiveAudioStream.stop();
        const result = await transcribe(audioBuffer.current);
        audioBuffer.current = [];
        onTranscribe?.(result);
      } catch (error) {
        Sentry.captureException(error);
      }
    } else {
      setIsRecording(true);
      // recorder.record();
      startStreamingAudio(audioStreamOptions, onChunk);
    }
  };

  return (
    <>
      <View
        position="absolute"
        bottom={130}
        right={20}
        borderRadius="$12"
        aspectRatio={1}
        width={60}
        jc="center"
        ai="center"
        height={60}
        opacity={isRecording ? 0.5 : 1}
        bg={`$${accent}`}
        onPress={handleRecordPress}
        disabled={isGenerating || !isReady}
      >
        {isGenerating ? (
          <Spinner />
        ) : (
          <ReanimatedIconWaveform volumeProgress={volumeProgress} />
        )}
      </View>
    </>
  );
}
