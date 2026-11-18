import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEvents } from "../../context/EventsContext";
import { notifyLater, notifyNow } from "../../utils/notify";

export default function ProfileScreen() {
  const { registered, saved, lastResumed, resumeCount } = useEvents();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={{ fontSize: 40 }}>🎓</Text>
      </View>
      <Text style={styles.name}>Inuri Hansani</Text>
      <Text style={styles.sub}>Mobile Computing </Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{registered.length}</Text>
          <Text>Registered</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{saved.length}</Text>
          <Text>Saved</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{resumeCount}</Text>
          <Text>App resumes</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>AppState monitor</Text>
        <Text>
          {lastResumed
            ? `Last returned to the foreground at ${lastResumed}`
            : "Minimise the app and open it again to see this update."}
        </Text>
      </View>

      <Pressable
        style={styles.btn}
        onPress={() =>
          notifyNow("Test notification", "Local notifications are working!")
        }
      >
        <Text style={styles.btnText}>Send notification now</Text>
      </Pressable>
      <Pressable
        style={[styles.btn, { backgroundColor: "#F59E0B" }]}
        onPress={() =>
          notifyLater("Scheduled notification", "This came 5 seconds later.", 5)
        }
      >
        <Text style={styles.btnText}>Send notification in 5 seconds</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#F3F4F6",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 12 },
  sub: { color: "#6B7280", marginBottom: 20 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  stat: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  statNum: { fontSize: 24, fontWeight: "bold", color: "#1E3A8A" },
  infoBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
  },
  infoTitle: { fontWeight: "700", marginBottom: 6 },
  btn: {
    backgroundColor: "#1E3A8A",
    padding: 14,
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
