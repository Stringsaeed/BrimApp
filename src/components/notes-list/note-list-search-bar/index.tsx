import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { X } from "@tamagui/lucide-icons";
import React, { useRef } from "react";
import { TextInput } from "react-native";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Circle, Spacer, XStack } from "tamagui";

import SearchBar from "components/search-bar";
import { useNotesList } from "contexts";
import { RootStackScreenProps, Routes } from "routers";

const AnimatedXStack = Animated.createAnimatedComponent(XStack);

export default function NoteListSearchBar() {
  const [isFocused, setIsFocused] = React.useState(false);
  const headerHeight = useHeaderHeight();
  const { top } = useSafeAreaInsets();
  const marginTop = headerHeight ? "$4" : top + 16;
  const inputRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<RootStackScreenProps<Routes.Note>["navigation"]>();
  const {
    onSearchValueChange,
    isSearchBarVisible,
    multiSelectMode,
    searchValue,
  } = useNotesList();

  const isCloseButtonVisible = !!(isFocused || searchValue?.length);

  const onCloseSearch = () => {
    inputRef.current?.blur();
    onSearchValueChange?.("");
    onBlur();
  };

  const onFocus = () => {
    navigation.setOptions({
      headerShown: false,
    });
    setIsFocused(true);
  };

  const onBlur = () => {
    if (searchValue?.length === 0) {
      navigation.setOptions({
        headerShown: true,
      });
    }
    setIsFocused(false);
  };

  if (!isSearchBarVisible) return null;

  return (
    <AnimatedXStack
      layout={LinearTransition.easing(Easing.inOut(Easing.ease))}
      my="$4"
      px="$4"
      marginTop={marginTop}
      width="100%"
      ai="center"
    >
      <SearchBar
        ref={inputRef}
        disabled={multiSelectMode}
        onChangeText={onSearchValueChange}
        value={searchValue}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isCloseButtonVisible && (
        <XStack>
          <Spacer size="$2" />
          <Circle size={36} bg="$gray3" onPress={onCloseSearch}>
            <X size="$1" color="$gray12" />
          </Circle>
        </XStack>
      )}
    </AnimatedXStack>
  );
}
