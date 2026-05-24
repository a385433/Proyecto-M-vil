import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function NotificationsScreen() {
  const { currentUser, notifications } = useAppContext();

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Inicia sesión para ver tus notificaciones.</Text>
      </View>
    );
  }

  const myNotifications = notifications.filter((notification) => notification.recipientId === currentUser.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      {myNotifications.length === 0 ? (
        <Text style={styles.message}>No tienes notificaciones recientes.</Text>
      ) : (
        myNotifications.map((notification) => (
          <View key={notification.id} style={styles.card}>
            <Text style={styles.text}>{notification.text}</Text>
            <Text style={styles.date}>{new Date(notification.date).toLocaleString()}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 24, marginBottom: 16 },
  message: { color: '#666', fontSize: 16 },
  card: { backgroundColor: '#f8fafc', borderRadius: 10, padding: 16, marginBottom: 16, borderColor: '#e2e8f0', borderWidth: 1 },
  text: { marginBottom: 8 },
  date: { color: '#6b7280', fontSize: 12 },
});
