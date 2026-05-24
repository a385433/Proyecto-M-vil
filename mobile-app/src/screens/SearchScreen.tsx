import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: Props) {
  const { currentUser, caregivers } = useAppContext();
  const [query, setQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredCaregivers = useMemo(() => {
    const term = query.toLowerCase();
    const locationTerm = locationFilter.toLowerCase();
    const availabilityTerm = availabilityFilter.toLowerCase();
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;

    return caregivers.filter((caregiver) => {
      const matchesQuery =
        caregiver.name.toLowerCase().includes(term) ||
        caregiver.location.toLowerCase().includes(term) ||
        caregiver.bio.toLowerCase().includes(term) ||
        caregiver.experience.toLowerCase().includes(term);
      const matchesLocation = !locationTerm || caregiver.location.toLowerCase().includes(locationTerm);
      const matchesAvailability = !availabilityTerm || caregiver.availability.toLowerCase().includes(availabilityTerm);
      const matchesPrice = caregiver.price >= min && caregiver.price <= max;
      return matchesQuery && matchesLocation && matchesAvailability && matchesPrice;
    });
  }, [caregivers, query, locationFilter, availabilityFilter, minPrice, maxPrice]);

  if (!currentUser || currentUser.role !== 'Tutor') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Acceso restringido</Text>
        <Text style={styles.message}>Solo los tutores pueden buscar cuidadoras.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar cuidadoras</Text>
      <TextInput style={styles.input} placeholder="Buscar por nombre, zona, experiencia o calificación" value={query} onChangeText={setQuery} />
      <TextInput style={styles.input} placeholder="Ubicación deseada" value={locationFilter} onChangeText={setLocationFilter} />
      <TextInput style={styles.input} placeholder="Horario deseado" value={availabilityFilter} onChangeText={setAvailabilityFilter} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Precio min" value={minPrice} onChangeText={setMinPrice} keyboardType="numeric" />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Precio max" value={maxPrice} onChangeText={setMaxPrice} keyboardType="numeric" />
      </View>
      <ScrollView style={styles.list}>
        {filteredCaregivers.map((caregiver) => (
          <View key={caregiver.id} style={styles.card}>
            <Text style={styles.cardTitle}>{caregiver.name}</Text>
            <Text>{caregiver.bio}</Text>
            <Text>{caregiver.location} · {caregiver.distance}</Text>
            <Text>€{caregiver.price}/h · {caregiver.availability}</Text>
            <Text>Experiencia: {caregiver.experience}</Text>
            <Text>Certificaciones: {caregiver.certifications}</Text>
            <Text>Capacidades: {caregiver.capabilities}</Text>
            <Text>Valoración: {caregiver.rating} ⭐</Text>
            <Button title="Solicitar reserva" onPress={() => navigation.navigate('Reservation', { caregiver })} />
          </View>
        ))}
        {filteredCaregivers.length === 0 && (
          <Text style={styles.emptyText}>No se encontraron cuidadoras para esa búsqueda.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
  },
  message: {
    color: '#666',
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },
  list: {
    flex: 1,
    marginTop: 12,
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  emptyText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#666',
  },
});
