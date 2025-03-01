import { Mic } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { Button, Spinner, Text, YStack } from "tamagui";

import { useUserAccent } from "hooks";
import { VoiceTranscriptionService } from "services";

interface Props {
  onTranscriptionComplete: (text: string) => void;
}

export default function VoiceRecordingButton({
  onTranscriptionComplete,
}: Props) {
  const { accent } = useUserAccent();
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handlePress = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsTranscribing(true);

      try {
        // Stop the recording and get the audio URI
        const audioUri = await VoiceTranscriptionService.stopRecording();

        if (audioUri) {
          // Transcribe the audio
          const transcription =
            await VoiceTranscriptionService.transcribeAudio();
          onTranscriptionComplete(transcription);
        }
      } catch {
        // Handle error silently
      } finally {
        setIsTranscribing(false);
      }
    } else {
      // Start recording
      setIsRecording(true);

      try {
        await VoiceTranscriptionService.startRecording();
      } catch {
        // Handle error silently
        setIsRecording(false);
      }
    }
  };

  return (
    <YStack>
      <Button
        position="absolute"
        bottom={130} // Position above the AI button
        right={20}
        borderRadius="$12"
        bg={isRecording ? "$red10" : `$${accent}`}
        scaleIcon={2}
        icon={
          isTranscribing ? (
            <Spinner color="$background" />
          ) : (
            <Mic color="$background" size={24} />
          )
        }
        aspectRatio={1}
        width={60}
        height={60}
        onPress={handlePress}
        elevate
      />
      {isRecording && (
        <Text
          position="absolute"
          bottom={195} // Position above the button
          right={20}
          color="$red10"
          fontWeight="bold"
        >
          Recording...
        </Text>
      )}
    </YStack>
  );
}
