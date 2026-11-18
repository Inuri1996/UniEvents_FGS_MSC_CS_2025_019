import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEvents } from "../../context/EventsContext";
import { EVENTS, getImage } from "../../data/events";
import { notifyLater, notifyNow } from "../../utils/notify";

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { registered, saved, toggleRegister, toggleSaved } = useEvents();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const event = EVENTS.find((e) => e.id === id);
  if (!event) return <Text style={{ padding: 20 }}>Event not found</Text>;

  const isRegistered = registered.includes(event.id);
  const isSaved = saved.includes(event.id);

  const confirmAction = async () => {
    toggleRegister(event.id);
    setConfirmVisible(false);
    if (!isRegistered) {
      await notifyNow(
        "Registration confirmed! 🎉",
        `You are registered for ${event.title}.`,
      );
    }
  };

  const onSave = async () => {
    toggleSaved(event.id);
    if (!isSaved)
      await notifyNow("Event bookmarked!", `${event.title} was saved.`);
  };

  const onRemind = async () => {
    await notifyLater(
      "Event reminder ⏰",
      `${event.title} starts at ${event.time}!`,
      10,
    );
    Alert.alert("Reminder set", "You will be notified in 10 seconds.");
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Image
        source={{ uri: `https://picsum.photos/seed/uni${event.id}/800/400` }}
        style={styles.image}
      /> */}
      <Image source={getImage(event)} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>
          📅 {event.date} · {event.time}
        </Text>
        <Text style={styles.meta}>📍 {event.venue}</Text>
        <Text style={styles.meta}>🎓 {event.organizer}</Text>
        <Text style={styles.meta}>💺 {event.seats} seats</Text>
        <Text style={styles.desc}>{event.description}</Text>

        <Pressable
          style={[styles.btn, isRegistered && { backgroundColor: "#B91C1C" }]}
          onPress={() => setConfirmVisible(true)}
        >
          <Text style={styles.btnText}>
            {isRegistered ? "Cancel Registration" : "Register Now"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.btn, { backgroundColor: "#F59E0B" }]}
          onPress={onSave}
        >
          <Text style={styles.btnText}>
            {isSaved ? "❤️ Saved (tap to remove)" : "🤍 Save Event"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.btn, { backgroundColor: "#047857" }]}
          onPress={onRemind}
        >
          <Text style={styles.btnText}>⏰ Remind me in 10 seconds</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Go back</Text>
        </Pressable>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={styles.modalTitle}>
              {isRegistered ? "Cancel registration?" : "Confirm registration?"}
            </Text>
            <Text style={{ marginTop: 6 }}>{event.title}</Text>
            <View style={styles.row}>
              <Pressable
                style={[styles.mBtn, { backgroundColor: "#D1D5DB" }]}
                onPress={() => setConfirmVisible(false)}
              >
                <Text>No</Text>
              </Pressable>
              <Pressable
                style={[styles.mBtn, { backgroundColor: "#1E3A8A" }]}
                onPress={confirmAction}
              >
                <Text style={{ color: "#fff" }}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 220 },
  body: { padding: 18 },
  category: { color: "#F59E0B", fontWeight: "700", textTransform: "uppercase" },
  title: { fontSize: 26, fontWeight: "bold", marginVertical: 6 },
  meta: { fontSize: 15, color: "#374151", marginTop: 3 },
  desc: { fontSize: 16, marginVertical: 16, lineHeight: 22 },
  btn: {
    backgroundColor: "#1E3A8A",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  back: {
    textAlign: "center",
    marginTop: 18,
    color: "#6B7280",
    marginBottom: 30,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: { backgroundColor: "#fff", padding: 24, borderRadius: 14, width: "82%" },
  modalTitle: { fontSize: 19, fontWeight: "bold" },
  row: { flexDirection: "row", gap: 12, marginTop: 20 },
  mBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
});
