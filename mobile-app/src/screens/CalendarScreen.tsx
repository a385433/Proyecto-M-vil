import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function CalendarScreen() {
  const { currentUser, reservations, caregivers, respondReservation, updateReservation } = useAppContext();
  const [reviewState, setReviewState] = useState<Record<string, { rating: string; review: string }>>({});
  const [privateNotes, setPrivateNotes] = useState<Record<string, string>>({});

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Inicia sesión para ver tu agenda.</Text>
      </View>
    );
  }

  const myReservations = reservations.filter((reservation) =>
    currentUser.role === 'Tutor'
      ? reservation.tutorId === currentUser.id
      : reservation.caregiverId === currentUser.id,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agenda</Text>
      {myReservations.length === 0 ? (
        <Text style={styles.message}>No tienes reservas en este momento.</Text>
      ) : (
        myReservations.map((reservation) => {
          const caregiver = caregivers.find((item) => item.id === reservation.caregiverId);
          const review = reviewState[reservation.id] || {
            rating: reservation.tutorRating?.toString() || '',
            review: reservation.tutorReview || '',
          };
          const privateNote = privateNotes[reservation.id] ?? reservation.caregiverNotes ?? '';

          return (
            <View key={reservation.id} style={styles.card}>
              <Text style={styles.cardTitle}>{caregiver?.name || 'Cuidador desconocido'}</Text>
              <Text style={styles.text}>Fecha: {reservation.date}</Text>
              <Text style={styles.text}>Horas: {reservation.hours}</Text>
              <Text style={styles.text}>Estado: {reservation.status}</Text>
              <Text style={styles.text}>Notas: {reservation.notes}</Text>

              {currentUser.role === 'Cuidador' && reservation.status === 'pending' && (
                <View style={styles.buttonRow}>
                  <Button title="Aceptar" onPress={() => respondReservation(reservation.id, 'accepted')} />
                  <View style={styles.buttonSpacer} />
                  <Button title="Rechazar" onPress={() => respondReservation(reservation.id, 'rejected')} color="#c62828" />
                </View>
              )}

              {currentUser.role === 'Tutor' && reservation.status !== 'rejected' && (
                <View style={styles.reviewSection}>
                  <Text style={styles.sectionTitle}>Calificar cuidadora</Text>
                  <TextInput
                    style={styles.input}
                    value={review.rating}
                    onChangeText={(value) => setReviewState((prev) => ({ ...prev, [reservation.id]: { ...review, rating: value } }))}
                    placeholder="Puntuación (1-5)"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.input, styles.multiline]}
                    value={review.review}
                    onChangeText={(value) => setReviewState((prev) => ({ ...prev, [reservation.id]: { ...review, review: value } }))}
                    placeholder="Comentario privado"
                    multiline
                  />
                  <Button
                    title="Guardar calificación"
                    onPress={() =>
                      updateReservation({
                        ...reservation,
                        tutorRating: Number(review.rating) || reservation.tutorRating,
                        tutorReview: review.review,
                      })
                    }
                  />
                </View>
              )}

              {currentUser.role === 'Cuidador' && (
                <View style={styles.reviewSection}>
                  <Text style={styles.sectionTitle}>Notas privadas</Text>
                  <TextInput
                    style={[styles.input, styles.multiline]}
                    value={privateNote}
                    onChangeText={(value) => setPrivateNotes((prev) => ({ ...prev, [reservation.id]: value }))}
                    placeholder="Añade notas privadas sobre esta reserva"
                    multiline
                  />
                  <Button
                    title="Guardar nota"
                    onPress={() => updateReservation({ ...reservation, caregiverNotes: privateNote })}
                  />
                </View>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 24, marginBottom: 16 },
  message: { color: '#666', fontSize: 16 },
  card: { backgroundColor: '#f8fafc', borderRadius: 10, padding: 16, marginBottom: 16, borderColor: '#e2e8f0', borderWidth: 1 },
  cardTitle: { fontSize: 18, marginBottom: 8 },
  text: { marginBottom: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonSpacer: { width: 12 },
  reviewSection: { marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  sectionTitle: { fontSize: 16, marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: '#fff', borderColor: '#cbd5e1', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
});
