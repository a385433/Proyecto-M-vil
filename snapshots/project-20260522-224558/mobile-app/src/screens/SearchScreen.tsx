import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { caregivers } from '../data/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const filteredCaregivers = useMemo(() => {
    const term = query.toLowerCase();
    return caregivers.filter((caregiver) =>
      caregiver.name.toLowerCase().includes(term) ||
      caregiver.location.toLowerCase().includes(term) ||
      caregiver.bio.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar cuidadoras</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre, zona o especialidad"
        value={query}
        onChangeText={setQuery}
      />
      <ScrollView style={styles.list}>
        {filteredCaregivers.map((caregiver) => (
          <View key={caregiver.id} style={styles.card}>
            <Text style={styles.cardTitle}>{caregiver.name}</Text>
            <Text>{caregiver.bio}</Text>
            <Text>{caregiver.location} · {caregiver.distance}</Text>
            <Text>€{caregiver.price}/h · {caregiver.availability}</Text>
            <Text>Valoración: {caregiver.rating} ⭐</Text>
            <Button
              title="Solicitar reserva"
              onPress={() => navigation.navigate('Reservation', { caregiver })}
            />
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  list: {
    flex: 1,
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
