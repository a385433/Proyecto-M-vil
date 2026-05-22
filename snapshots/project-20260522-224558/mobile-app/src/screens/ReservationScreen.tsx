import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Reservation'>;

export default function ReservationScreen({ route }: Props) {
  const caregiver = route.params?.caregiver;
  const [date, setDate] = useState('2026-06-01');
  const [hours, setHours] = useState('3');
  const [notes, setNotes] = useState('Necesito apoyo con la cena y el baño.');

  const handleConfirm = () => {
    if (!caregiver) {
      Alert.alert('Selecciona una cuidadora', 'Vuelve a la pantalla de búsqueda y elige una cuidadora.');
      return;
    }

    Alert.alert('Reserva enviada', `Has solicitado una reserva con ${caregiver.name} el ${date} por ${hours} horas.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {caregiver ? (
        <>
          <Text style={styles.title}>Reserva con {caregiver.name}</Text>
          <Text style={styles.text}>{caregiver.location}</Text>
          <Text style={styles.text}>{caregiver.availability}</Text>
          <Text style={styles.text}>Precio: €{caregiver.price}/h</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="Fecha de reserva"
          />
          <TextInput
            style={styles.input}
            value={hours}
            onChangeText={setHours}
            placeholder="Duración (horas)"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.multiline]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notas para la cuidadora"
            multiline
          />
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
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
