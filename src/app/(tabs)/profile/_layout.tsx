import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@context/ThemeContext';

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
      <Stack.Screen name='index' />
    </Stack>
  );
}
