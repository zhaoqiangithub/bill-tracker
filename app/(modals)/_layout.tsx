import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <Stack.Screen name="add-account" />
      <Stack.Screen name="add-transaction" />
    </Stack>
  );
}
