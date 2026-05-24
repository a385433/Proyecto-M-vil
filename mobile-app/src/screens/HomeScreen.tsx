import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { currentUser, reservations, caregivers } = useAppContext();

  const myReservations = currentUser
    ? reservations.filter((reservation) =>
        currentUser.role === 'Tutor'
          ? reservation.tutorId === currentUser.id
          : reservation.caregiverId === currentUser.id,
      )
    : [];

  const upcoming = myReservations.filter((reservation) => reservation.status !== 'rejected');

  const nextCaregiver = caregivers[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {currentUser?.name || 'Usuario'}</Text>
      <Text style={styles.subtitle}>{currentUser?.role === 'Tutor' ? 'Encuentra cuidadoras según tus necesidades.' : 'Administra tus solicitudes y agenda como cuidador.'}</Text>

      {currentUser?.role === 'Tutor' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{nextCaregiver.name}</Text>
          <Text>{nextCaregiver.location} · {nextCaregiver.availability}</Text>
          <Text>Valoración: {nextCaregiver.rating} ⭐</Text>
          <Text>Precio: €{nextCaregiver.price}/h</Text>
        </View>
      )}

      <View style={styles.buttonGroup}>
        {currentUser?.role === 'Tutor' ? (
          <>
            <Button title="Buscar cuidadora" onPress={() => navigation.navigate('Search')} />
            <View style={styles.buttonSpacer} />
          </>
        ) : null}
        <Button title="Mi perfil" onPress={() => navigation.navigate('Profile')} />
        <View style={styles.buttonSpacer} />
        <Button title="Agenda" onPress={() => navigation.navigate('Calendar')} />
        <View style={styles.buttonSpacer} />
        <Button title="Notificaciones" onPress={() => navigation.navigate('Notifications')} />
        <View style={styles.buttonSpacer} />
        <Button title="Reglamento" onPress={() => navigation.navigate('Rules')} />
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Reservas activas: {upcoming.length}</Text>
        <Text style={styles.summaryText}>Solicitudes pendientes: {myReservations.filter((reservation) => reservation.status === 'pending').length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#444',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  buttonGroup: {
    marginBottom: 24,
  },
  buttonSpacer: {
    height: 12,
  },
  summary: {
    padding: 16,
    backgroundColor: '#eef2ff',
    borderRadius: 10,
  },
  summaryText: {
    marginBottom: 6,
  },
});
