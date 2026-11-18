import { useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';
import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { EventsProvider, useEvents } from '../context/EventsContext';
import { setupNotifications } from '../utils/notify';

// Configure notification behavior
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

function AppStateWatcher() {
  const { setLastResumed, setResumeCount } = useEvents();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    setupNotifications();

    const subscription = AppState.addEventListener('change', (nextState) => {
      // Transition from background or inactive to active means foreground
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        console.log('App has come to the foreground!');
        const timeStr = new Date().toLocaleTimeString();
        setLastResumed(timeStr);
        setResumeCount((prev) => prev + 1);
      }
      appState.current = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, [setLastResumed, setResumeCount]);

  return null;
}

export default function RootLayout() {
  return (
    <EventsProvider>
      <AppStateWatcher />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event" options={{ headerShown: false }} />
      </Stack>
    </EventsProvider>
  );
}
