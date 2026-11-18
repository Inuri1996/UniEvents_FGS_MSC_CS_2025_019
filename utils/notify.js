import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function setupNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Immediate notification
export async function notifyNow(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}

// Scheduled notification (timed reminder)
export async function notifyLater(title, body, seconds = 10) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    },
  });
}