import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function setupNotifications() {
  if (Platform.OS === 'web') return false;
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.warn('Failed to setup notifications:', error);
    return false;
  }
}

// Immediate notification
export async function notifyNow(title, body) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null,
    });
  } catch (error) {
    console.warn('Failed to send immediate notification:', error);
  }
}

// Scheduled notification (timed reminder)
export async function notifyLater(title, body, seconds = 10) {
  try {
    const trigger = Notifications.SchedulableTriggerInputTypes?.TIME_INTERVAL
      ? { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds }
      : { seconds };

    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger,
    });
  } catch (error) {
    console.warn('Failed to schedule notification:', error);
  }
}
