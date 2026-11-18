import { useState } from 'react';
import { View, Text, Pressable, FlatList, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { EVENTS } from '../../data/events';
import { useEvents } from '../../context/EventsContext';
import { notifyNow } from '../../utils/notify';

export default function MyEventsScreen() {
  const router = useRouter();
  const { registered, toggleRegister, clearRegistered } = useEvents();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const myEvents = EVENTS.filter((e) => registered.includes(e.id));

  const confirmClear = async () => {
    clearRegistered();
    setConfirmVisible(false);
    await notifyNow('Registrations cancelled', 'All your event registrations were removed.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Events ({myEvents.length})</Text>
        {myEvents.length > 0 && (
          <Pressable onPress={() => setConfirmVisible(true)}>
            <Text style={{ color: '#B91C1C', fontWeight: '600' }}>Cancel all</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={myEvents}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={
          <Text style={styles.empty}>You have not registered for any events yet.</Text>
        }
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => router.push(`/event/${item.id}`)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>📅 {item.date} · {item.time}</Text>
              <Text style={styles.meta}>📍 {item.venue}</Text>
            </View>
            <Pressable onPress={() => toggleRegister(item.id)}>
              <Text style={{ color: '#B91C1C' }}>Remove</Text>
            </Pressable>
          </Pressable>
        )}
      />

      {/* Confirm Modal */}
      <Modal visible={confirmVisible} transparent animationType="fade" onRequestClose={() => setConfirmVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={styles.modalTitle}>Cancel all registrations?</Text>
            <View style={styles.btnRow}>
              <Pressable style={[styles.mBtn, { backgroundColor: '#D1D5DB' }]} onPress={() => setConfirmVisible(false)}>
                <Text>No</Text>
              </Pressable>
              <Pressable style={[styles.mBtn, { backgroundColor: '#B91C1C' }]} onPress={confirmClear}>
                <Text style={{ color: '#fff' }}>Yes, cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 55, paddingHorizontal: 16, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A' },
  empty: { textAlign: 'center', marginTop: 40, color: '#6B7280' },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12, elevation: 2 },
  title: { fontSize: 17, fontWeight: '700' },
  meta: { color: '#4B5563', marginTop: 2 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  box: { backgroundColor: '#fff', padding: 24, borderRadius: 14, width: '82%' },
  modalTitle: { fontSize: 19, fontWeight: 'bold' },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  mBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
});