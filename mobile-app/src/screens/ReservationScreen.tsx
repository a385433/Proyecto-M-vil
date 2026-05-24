import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Reservation'>;

export default function ReservationScreen({ route }: Props) {
  const { currentUser, createReservation } = useAppContext();
  const caregiver = route.params?.caregiver;
  const [date, setDate] = useState('2026-06-01');
  const [hours, setHours] = useState('3');
  const [notes, setNotes] = useState('Necesito apoyo con la cena y el baño.');
  const [reminderDate, setReminderDate] = useState('2026-05-31');
  const [reminderEmail, setReminderEmail] = useState(currentUser?.email || '');

  const handleConfirm = () => {
    if (!caregiver || !currentUser) {
      Alert.alert('Error', 'Tu sesión o selección no es válida.');
      return;
    }

    createReservation(
      {
        tutorId: currentUser.id,
        caregiverId: caregiver.id,
        date,
        hours,
        notes,
      },
      reminderDate,
    );

    Alert.alert('Reserva enviada', `Tu solicitud con ${caregiver.name} ha sido creada. Se enviará un recordatorio automático el ${reminderDate}.`);
  };

  if (!currentUser || currentUser.role !== 'Tutor') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Solo los tutores pueden solicitar reservas.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {caregiver ? (
        <>
          <Text style={styles.title}>Reserva con {caregiver.name}</Text>
          <Text style={styles.text}>{caregiver.location}</Text>
          <Text style={styles.text}>{caregiver.availability}</Text>
          <Text style={styles.text}>Precio: €{caregiver.price}/h</Text>
          <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Fecha de reserva" />
          <TextInput style={styles.input} value={hours} onChangeText={setHours} placeholder="Duración (horas)" keyboardType="numeric" />
          <TextInput style={styles.input} value={reminderEmail} onChangeText={setReminderEmail} placeholder="Correo para recordatorio" keyboardType="email-address" />
          <TextInput style={styles.input} value={reminderDate} onChangeText={setReminderDate} placeholder="Fecha de envío del recordatorio" />
          <TextInput style={[styles.input, styles.multiline]} value={notes} onChangeText={setNotes} placeholder="Notas para la cuidadora" multiline />
          <Text style={styles.reminderInfo}>Se enviará un recordatorio automático al correo indicado antes de la cita.</Text>
          <Button title="Confirmar solicitud" onPress={handleConfirm} />
        </>
      ) : (
        <Text style={styles.title}>Selecciona primero una cuidadora en la búsqueda.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
  },
  text: {
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  reminderInfo: {
    marginBottom: 16,
    color: '#4b5563',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
