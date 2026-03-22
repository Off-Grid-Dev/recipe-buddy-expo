import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../ThemeContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { colors, mode } = useTheme();

  return (
    <>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bgPrimary },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="new-recipe" />
        <Stack.Screen name="recipe/[id]/index" />
        <Stack.Screen
          name="recipe/[id]/cook"
          options={{
            // Cook mode slides up like a modal — feels intentional and focused
            animation: 'slide_from_bottom',
            gestureEnabled: false, // prevent accidental swipe-dismiss mid-batch
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter':              require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium':       require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold':     require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold':         require('../assets/fonts/Inter-Bold.ttf'),
    'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Italic':  require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
    'PlayfairDisplay-Bold':    require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
