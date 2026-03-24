import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../../../ThemeContext";

export default function RecipeLayout() {
  const { colors } = useTheme();

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bgPrimary },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="cook"
          options={{
            animation: "slide_from_bottom",
            gestureEnabled: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
