import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { caregivers } from '../data/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const nextCaregiver = caregivers[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Nanys Care</Text>
      <Text style={styles.subtitle}>Tu próxima reserva recomendada</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{nextCaregiver.name}</Text>
        <Text>{nextCaregiver.location} · {nextCaregiver.availability}</Text>
        <Text>Valoración: {nextCaregiver.rating} ⭐</Text>
        <Text>Precio: €{nextCaregiver.price}/h</Text>
      </View>
      <Button title="Buscar cuidadora" onPress={() => navigation.navigate('Search')} />
      <View style={styles.buttonSpacer} />
      <Button title="Mi perfil" onPress={() => navigation.navigate('Profile')} />
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
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
  buttonSpacer: {
    height: 12,
  },
});
