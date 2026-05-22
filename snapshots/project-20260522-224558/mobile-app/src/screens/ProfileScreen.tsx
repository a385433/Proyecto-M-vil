import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { initialUserProfile } from '../data/mockData';
import { UserProfile } from '../types';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);

  const handleSave = () => {
    Alert.alert('Perfil guardado', 'Tus datos se han actualizado correctamente.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil de Tutor</Text>
      <TextInput
        style={styles.input}
        value={profile.name}
        onChangeText={(value) => setProfile({ ...profile, name: value })}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={profile.email}
        onChangeText={(value) => setProfile({ ...profile, email: value })}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={profile.phone}
        onChangeText={(value) => setProfile({ ...profile, phone: value })}
        placeholder="Teléfono"
      />
      <TextInput
        style={styles.input}
        value={profile.children}
        onChangeText={(value) => setProfile({ ...profile, children: value })}
        placeholder="Hijos / información relevante"
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        value={profile.preferences}
        onChangeText={(value) => setProfile({ ...profile, preferences: value })}
        placeholder="Preferencias de cuidado"
        multiline
      />
      <Button title="Guardar perfil" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
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
