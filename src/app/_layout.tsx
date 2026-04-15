// dependencies
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

// context
import { ThemeProvider, useTheme } from '@context/ThemeContext';

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
        <Stack.Screen name='(auth)' />
        <Stack.Screen name='(tabs)' />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require('../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    PlayfairDisplay: require('../../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 800);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
