import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useEffect } from 'react';
import { initDatabase } from '@/db/sqlite/database';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  useEffect(() => {
    // Initialize SQLite schema on app start (no-op if already created)
    try {
      initDatabase();
    } catch (e) {
      console.warn('SQLite init failed:', e);
    }
  }, []);

  const theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.light.background,
      card: Colors.light.surface,
      text: Colors.light.text,
      border: Colors.light.border,
    },
  };

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: Colors.light.background },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" backgroundColor={Colors.light.background} />
    </ThemeProvider>
  );
}
