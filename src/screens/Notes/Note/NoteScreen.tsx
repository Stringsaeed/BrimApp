import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormikProvider } from "formik";
import { useRef, useState } from "react";
import { type TextInput } from "react-native";
import {
  EnrichedTextInputInstance,
  OnChangeStateEvent,
} from "react-native-enriched";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Separator, YStack } from "tamagui";
import Composer from "@/components/composer";
import ComposerToolbox from "@/components/composer-toolbox";
import DateText from "@/components/date-text";
import NoteAutoSave from "@/components/note-auto-save";
import NoteHeaderRight from "@/components/note-header-right";
import NoteTitleInput from "@/components/note-title-input";
import NoteToolbox from "@/components/note-toolbox";
import useCreateEmptyNoteMutation from "@/hooks/use-create-empty-note-mutation";
import useDeleteNoteMutation from "@/hooks/use-delete-note-mutation";
import useNavigateProfile from "@/hooks/use-navigate-profile";
import useNoteForm from "@/hooks/use-note-form";
import useNotePrivacyMutation from "@/hooks/use-note-privacy-mutation";
import { NoteService } from "@/services/notes/notes";

type StylesState = OnChangeStateEvent;

const DEFAULT_STYLE_STATE = {
  isActive: false,
  isConflicting: false,
  isBlocking: false,
};

const DEFAULT_STYLES: StylesState = {
  bold: DEFAULT_STYLE_STATE,
  italic: DEFAULT_STYLE_STATE,
  underline: DEFAULT_STYLE_STATE,
  strikeThrough: DEFAULT_STYLE_STATE,
  inlineCode: DEFAULT_STYLE_STATE,
  h1: DEFAULT_STYLE_STATE,
  h2: DEFAULT_STYLE_STATE,
  h3: DEFAULT_STYLE_STATE,
  h4: DEFAULT_STYLE_STATE,
  h5: DEFAULT_STYLE_STATE,
  h6: DEFAULT_STYLE_STATE,
  blockQuote: DEFAULT_STYLE_STATE,
  codeBlock: DEFAULT_STYLE_STATE,
  orderedList: DEFAULT_STYLE_STATE,
  unorderedList: DEFAULT_STYLE_STATE,
  link: DEFAULT_STYLE_STATE,
  image: DEFAULT_STYLE_STATE,
  mention: DEFAULT_STYLE_STATE,
  checkboxList: DEFAULT_STYLE_STATE,
};

export default function NoteView() {
  const titleInputRef = useRef<TextInput>(null);
  const composerRef = useRef<EnrichedTextInputInstance>(null);
  const [stylesState, setStylesState] = useState<StylesState>(DEFAULT_STYLES);

  const router = useRouter();
  const { id: idParam } = useLocalSearchParams();
  const handleChangeState = (state: StylesState) => {
    setStylesState(state);
  };
  const id = idParam as string;
  const note = NoteService.get(id);
  // UI hooks
  const headerHeight = useHeaderHeight();
  // Logic hooks
  const onNavigateProfile = useNavigateProfile();
  const deleteNoteMutation = useDeleteNoteMutation();
  const notePrivacyMutation = useNotePrivacyMutation();
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const config = useNoteForm(note);
  const togglePrivacy = () => {
    if (!note) return;
    notePrivacyMutation.mutate({ note });
  };
  const handleDelete = async () => {
    if (!note) return;
    await deleteNoteMutation.mutateAsync(note);
    router.back();
  };
  const onToolboxSheetOpen = () => {
    composerRef.current?.blur();
    if (titleInputRef.current?.isFocused()) {
      titleInputRef.current?.blur();
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <FormikProvider value={config}>
        <NoteHeaderRight
          onPressLock={togglePrivacy}
          onPressTrash={handleDelete}
          isPrivate={note?.is_private}
          onPressPlus={createEmptyNoteMutation.mutate}
          onPressProfile={onNavigateProfile}
        />
        <NoteAutoSave />
        <YStack
          backgroundColor="$background"
          paddingTop={headerHeight}
          flex={1}
        >
          <DateText date={note?.updated_at} />
          <NoteTitleInput ref={titleInputRef} />
          <Separator />
          <Composer
            ref={composerRef}
            onChangeState={(e) => handleChangeState(e.nativeEvent)}
          />
          <NoteToolbox onOpen={onToolboxSheetOpen} />
          <ComposerToolbox editorRef={composerRef} stylesState={stylesState} />
        </YStack>
      </FormikProvider>
    </KeyboardAvoidingView>
  );
}
