// dependencies
import { Stack } from "expo-router";
// context
import { useTheme } from "@context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RecipeLayout() {
  const { colors } = useTheme();
  const { top, right, bottom, left } = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.bgPrimary,
          paddingTop: top,
          paddingRight: right,
          paddingBottom: bottom,
          paddingLeft: left,
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
