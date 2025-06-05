import { Audio } from "expo-av";
import React, { useState } from "react";
import {
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { View } from "tamagui";

import { useUserAccent } from "hooks";

import ReanimatedIconWaveform from "./reanimated-icon-waveform";

const MIN_SCALE = 0;

export default function VoiceRecordingButton() {
  const { accent } = useUserAccent();

  // const [recognizing, setRecognizing] = useState(false);
  // const [, setTranscript] = useState("");
  const volumeProgress = useSharedValue<number>(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // const recorder = useAudioRecorder({
  //   ...RecordingPresets.HIGH_QUALITY,
  //   isMeteringEnabled: true,
  // });
  // const player = useAudioPlayer(recorder?.uri);

  // const { metering } = useAudioRecorderState(recorder, 100);

  const handlePress = async () => {
    const status = await Audio.requestPermissionsAsync();

    if (!status.granted) {
      return;
    }

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync({
      ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
      isMeteringEnabled: true,
    });

    recording.setProgressUpdateInterval(100);

    recording.setOnRecordingStatusUpdate((status) => {
      if (status.metering === undefined) {
        volumeProgress.value = 0 as const;
        return;
      }

      const normalizedMetering = ((status.metering + 160) / 160) * 100;

      const clampedNormalized = Math.min(Math.max(normalizedMetering, 0), 100);

      volumeProgress.value = withSequence(
        withTiming(clampedNormalized, {
          duration: 100,
        }),

        withTiming(MIN_SCALE, {
          duration: 50,
        })
      );
    });
    await recording.startAsync();

    setRecording(recording);

    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    await recording?.stopAndUnloadAsync();
    setRecording(null);
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
        bg={isRecording ? "$red10" : `$${accent}`}
        onPress={isRecording ? handleStopRecording : handlePress}
      >
        <ReanimatedIconWaveform volumeProgress={volumeProgress} />
      </View>
    </>
  );
}
