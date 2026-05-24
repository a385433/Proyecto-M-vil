import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { User } from '../types';

const calculateRate = (profile: User) => {
  const baseRate = 10;
  const yearsMatch = profile.experience?.match(/(\d+)\s*(años|años de|years|year)/i);
  const years = yearsMatch ? Number(yearsMatch[1]) : 0;
  const certifications = profile.certifications?.split(/[,;]+/).map((item) => item.trim()).filter(Boolean).length || 0;
  const capabilities = profile.capabilities?.split(/[,;]+/).map((item) => item.trim()).filter(Boolean).length || 0;
  const derivedRate = baseRate + years * 1.5 + certifications * 1.5 + capabilities * 1;
  return Math.max(10, Math.round(derivedRate)).toString();
};

export default function ProfileScreen() {
  const { currentUser, updateUser } = useAppContext();
  const [profile, setProfile] = useState<User | null>(currentUser);

  const derivedRate = useMemo(() => (profile ? calculateRate(profile) : '0'), [profile]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inicia sesión para editar tu perfil.</Text>
      </View>
    );
  }

  const handleSave = () => {
    updateUser({ ...profile, rate: derivedRate });
    Alert.alert('Perfil guardado', 'Tus datos se han actualizado correctamente.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{profile.role === 'Cuidador' ? 'Perfil de Cuidador' : 'Perfil de Tutor'}</Text>

      {profile.role === 'Cuidador' && (
        <>
          {profile.photoUrl ? (
            <Image source={{ uri: profile.photoUrl }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>Sube la foto de perfil usando URL</Text>
            </View>
          )}
          <TextInput
            style={styles.input}
            value={profile.photoUrl || ''}
            onChangeText={(value) => setProfile({ ...profile, photoUrl: value })}
            placeholder="URL de la foto"
          />
        </>
      )}

      <TextInput style={styles.input} value={profile.name} onChangeText={(value) => setProfile({ ...profile, name: value })} placeholder="Nombre" />
      <TextInput style={styles.input} value={profile.email} onChangeText={(value) => setProfile({ ...profile, email: value })} placeholder="Correo electrónico" keyboardType="email-address" />
      <TextInput style={styles.input} value={profile.phone || ''} onChangeText={(value) => setProfile({ ...profile, phone: value })} placeholder="Teléfono" />

      {profile.role === 'Tutor' ? (
        <>
          <TextInput style={styles.input} value={profile.children || ''} onChangeText={(value) => setProfile({ ...profile, children: value })} placeholder="Hijos" />
          <TextInput style={[styles.input, styles.multiline]} value={profile.needs || ''} onChangeText={(value) => setProfile({ ...profile, needs: value })} placeholder="Necesidades específicas" multiline />
        </>
      ) : (
        <>
          <TextInput style={[styles.input, styles.multiline]} value={profile.experience || ''} onChangeText={(value) => setProfile({ ...profile, experience: value })} placeholder="Experiencia" multiline />
          <TextInput style={[styles.input, styles.multiline]} value={profile.certifications || ''} onChangeText={(value) => setProfile({ ...profile, certifications: value })} placeholder="Certificaciones" multiline />
          <TextInput style={[styles.input, styles.multiline]} value={profile.capabilities || ''} onChangeText={(value) => setProfile({ ...profile, capabilities: value })} placeholder="Capacidades" multiline />
          <TextInput style={styles.input} value={profile.availability || ''} onChangeText={(value) => setProfile({ ...profile, availability: value })} placeholder="Disponibilidad" />
          <View style={styles.rateContainer}>
            <Text style={styles.rateLabel}>Tarifa estimada</Text>
            <Text style={styles.rateValue}>€{derivedRate}/h</Text>
            <Text style={styles.rateDescription}>Calculada según experiencia, certificaciones y capacidades.</Text>
          </View>
        </>
      )}

      <TextInput style={[styles.input, styles.multiline]} value={profile.bio || ''} onChangeText={(value) => setProfile({ ...profile, bio: value })} placeholder="Descripción" multiline />
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
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoPlaceholderText: {
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  rateContainer: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9fafb',
  },
  rateLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  rateDescription: {
    color: '#6b7280',
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
