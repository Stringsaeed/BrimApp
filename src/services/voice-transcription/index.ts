import { Audio } from "expo-av";

// Define recording options
const RECORDING_OPTIONS = {
  ios: {
    outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
    audioQuality: Audio.IOSAudioQuality.MAX,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
    linearPCMBitDepth: 16,
    numberOfChannels: 2,
    extension: ".m4a",
    sampleRate: 44100,
    bitRate: 128000,
  },
  android: {
    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
    audioEncoder: Audio.AndroidAudioEncoder.AAC,
    numberOfChannels: 2,
    extension: ".m4a",
    sampleRate: 44100,
    bitRate: 128000,
  },
  web: {},
};

// Voice recording state
let recording: Audio.Recording | null = null;

export const VoiceTranscriptionService = {
  /**
   * Start recording audio
   */
  startRecording: async (): Promise<void> => {
    try {
      // Request permissions
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        throw new Error("Audio recording permissions not granted");
      }

      // Set audio mode for recording
      await Audio.setAudioModeAsync({
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        shouldDuckAndroid: true,
      });

      // Create and start recording
      const { recording: newRecording } =
        await Audio.Recording.createAsync(RECORDING_OPTIONS);
      recording = newRecording;
    } catch (err) {
      // Handle error
      throw err;
    }
  },

  /**
   * Transcribe the recorded audio
   * Note: This is a placeholder implementation since real speech-to-text
   * would require a proper API integration
   */
  transcribeAudio: async (): Promise<string> => {
    try {
      // In a real implementation, you would send the audio file to a transcription service
      // For now, we'll use a placeholder response
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate processing time
      return "This is a transcription of your voice recording. In a real implementation, this would be the actual transcribed text from your audio.";
    } catch {
      return "Failed to transcribe audio. Please try again.";
    }
  },

  /**
   * Stop recording and return the audio file URI
   */
  stopRecording: async (): Promise<string | null> => {
    try {
      if (!recording) {
        return null;
      }

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recording = null;

      // Reset audio mode
      await Audio.setAudioModeAsync({
        staysActiveInBackground: false,
        playsInSilentModeIOS: false,
        allowsRecordingIOS: false,
        shouldDuckAndroid: true,
      });

      return uri;
    } catch {
      recording = null;
      return null;
    }
  },
};
