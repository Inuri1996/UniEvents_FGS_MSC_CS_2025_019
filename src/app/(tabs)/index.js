import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEvents } from "../../context/EventsContext";
import { EVENTS, CATEGORIES, getImage } from '../../data/events';

export default function HomeScreen() {
  const router = useRouter();
  const { registered, saved, lastResumed } = useEvents();
  const [filter, setFilter] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);

  const data =
    filter === "All" ? EVENTS : EVENTS.filter((e) => e.category === filter);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/event/${item.id}`)}
    >
      {/* <Image
        source={{ uri: `https://picsum.photos/seed/uni${item.id}/600/300` }}
        style={styles.image}
      /> */}
      <Image source={getImage(item)} style={styles.image} />
      <View style={styles.cardBody}>
        <View style={styles.rowBetween}>
          <Text style={styles.category}>{item.category}</Text>
          <Text>{saved.includes(item.id) ? "❤️" : ""}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          📅 {item.date} · {item.time}
        </Text>
        <Text style={styles.meta}>📍 {item.venue}</Text>
        {registered.includes(item.id) && (
          <Text style={styles.badge}>✔ Registered</Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>UniEvents</Text>
          <Text style={styles.sub}>{data.length} events</Text>
        </View>
        <Pressable
          style={styles.filterBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.filterText}>Filter: {filter}</Text>
        </Pressable>
      </View>

      {lastResumed && (
        <Text style={styles.resumed}>
          👋 Welcome back! Resumed at {lastResumed}
        </Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No events in this category</Text>
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Filter by category</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[styles.option, filter === cat && styles.optionActive]}
                onPress={() => {
                  setFilter(cat);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    filter === cat && { color: "#fff" },
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 55,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: { fontSize: 26, fontWeight: "bold", color: "#1E3A8A" },
  sub: { color: "#6B7280" },
  filterBtn: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  filterText: { color: "#fff", fontWeight: "600" },
  resumed: { color: "#047857", marginBottom: 10, fontWeight: "500" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: { width: "100%", height: 140 },
  cardBody: { padding: 14 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  category: {
    color: "#F59E0B",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 12,
  },
  title: { fontSize: 18, fontWeight: "700", marginVertical: 4 },
  meta: { color: "#4B5563", marginTop: 2 },
  badge: { marginTop: 8, color: "#047857", fontWeight: "700" },
  empty: { textAlign: "center", marginTop: 40, color: "#6B7280" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  option: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    marginTop: 10,
  },
  optionActive: { backgroundColor: "#1E3A8A" },
  optionText: { fontWeight: "600" },
  cancel: { textAlign: "center", marginTop: 16, color: "#6B7280" },
});
