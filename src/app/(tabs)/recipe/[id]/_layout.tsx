// dependencies
import { Stack } from 'expo-router';

// context
import { useTheme } from '@context/ThemeContext';

export default function RecipeLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bgPrimary },
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen
        name='cook'
        options={{
          animation: 'slide_from_bottom',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
