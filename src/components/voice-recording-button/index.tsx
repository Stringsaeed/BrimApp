import React, { useEffect, useRef, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import {
  AudioContext,
  AudioManager,
  AudioRecorder,
} from "react-native-audio-api";
import {
  TranscriptionResult,
  useSpeechToText,
  WHISPER_TINY_EN,
} from "react-native-executorch";
import { useSharedValue } from "react-native-reanimated";
import { Spinner, View } from "tamagui";
import useUserAccent from "@/hooks/use-user-accent";
import { Sentry } from "@/services/sentry";
import ReanimatedIconWaveform from "./reanimated-icon-waveform";

// const audioStreamOptions = {
//   sampleRate: 16000,
//   bitsPerSample: 16,
//   bufferSize: 16000,
//   audioSource: 1,
//   channels: 1,
// };
// const startStreamingAudio = (options: any, onChunk: (data: string) => void) => {
//   LiveAudioStream.init(options);
//   LiveAudioStream.on("data", onChunk);
//   LiveAudioStream.start();
// };
// const float32ArrayFromPCMBinaryBuffer = (b64EncodedBuffer: string) => {
//   const b64DecodedChunk = Buffer.from(b64EncodedBuffer, "base64");
//   const int16Array = new Int16Array(b64DecodedChunk.buffer);
//   const float32Array = new Float32Array(int16Array.length);
//   for (let i = 0; i < int16Array.length; i++) {
//     float32Array[i] = Math.max(
//       -1,
//       Math.min(1, (int16Array[i] / audioStreamOptions.bufferSize) * 8)
//     );
//   }
//   return float32Array;
// };

export default function VoiceRecordingButton({
  onTranscribe,
}: {
  onTranscribe?: (text: string) => void;
}) {
  const { accent } = useUserAccent();
  const volumeProgress = useSharedValue(0);

  const [, setTranscription] = useState<null | TranscriptionResult>(null);
  const [liveResult, setLiveResult] = useState<{
    fullText: string;
    segments: any[];
  } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef(new AudioRecorder());
  const isRecordingRef = useRef(false);
  const model = useSpeechToText({
    model: WHISPER_TINY_EN,
  });
  const handleStartTranscribeFromMicrophone = async () => {
    isRecordingRef.current = true;

    setTranscription(null);
    setLiveResult({ fullText: "", segments: [] });

    const sampleRate = 16000;

    recorder.current.onAudioReady(
      {
        sampleRate,
        bufferLength: 0.1 * sampleRate,
        channelCount: 1,
      },
      ({ buffer }) => {
        model.streamInsert(buffer.getChannelData(0));
      }
    );

    try {
      const success = await AudioManager.setAudioSessionActivity(true);
      if (!success) {
        Alert.alert("Cannot start audio session correctly");
      }
      const result = recorder.current.start();
      if (result.status === "error") {
        Alert.alert(`Recording problems: ${result.message}`);
      }
    } catch (e) {
      Alert.alert(e instanceof Error ? e.message : String(e));
      isRecordingRef.current = false;
      return;
    }

    let accumulatedText = "";
    let accumulatedSegments: any[] = [];

    try {
      const streamIter = model.stream({
        verbose: __DEV__,
      });

      for await (const { committed, nonCommitted } of streamIter) {
        if (!isRecordingRef.current) break;

        if (committed.text) {
          accumulatedText += committed.text;
        }
        if (committed.segments) {
          accumulatedSegments = [...accumulatedSegments, ...committed.segments];
        }

        const currentDisplay = {
          fullText: accumulatedText + nonCommitted.text,
          segments: [...accumulatedSegments, ...(nonCommitted.segments || [])],
        };

        setLiveResult(currentDisplay);
      }
    } catch (e) {
      Alert.alert(e instanceof Error ? e.message : String(e));
    }
  };

  const handleStopTranscribeFromMicrophone = () => {
    isRecordingRef.current = false;

    recorder.current.stop();
    model.streamStop();

    if (liveResult) {
      setTranscription({
        text: liveResult.fullText,
        segments: liveResult.segments,
        language: "en",
        duration: 0,
      });
      onTranscribe?.(liveResult.fullText);
      setLiveResult(null);
    }
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
        handleStopTranscribeFromMicrophone();
      } catch (error) {
        Sentry.captureException(error);
      }
    } else {
      setIsRecording(true);
      void handleStartTranscribeFromMicrophone();
    }
  };

  useEffect(() => {
    AudioManager.setAudioSessionOptions({
      iosCategory: "playAndRecord",
      iosMode: "spokenAudio",
      iosOptions: ["allowBluetoothHFP", "defaultToSpeaker"],
    });
    const checkPerms = async () => {
      await AudioManager.requestRecordingPermissions();
    };
    void checkPerms();
  }, []);

  return (
    <>
      <View
        position="absolute"
        bottom={110}
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
        disabled={model.isGenerating || !model.isReady}
      >
        {model.isGenerating ? (
          <Spinner />
        ) : (
          <ReanimatedIconWaveform volumeProgress={volumeProgress} />
        )}
      </View>
    </>
  );
}
