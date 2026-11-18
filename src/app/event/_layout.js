import { Stack } from 'expo-router';

export default function EventStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1E3A8A' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Event Details' }} />
    </Stack>
  );
}
