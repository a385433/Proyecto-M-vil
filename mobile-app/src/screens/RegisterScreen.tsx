import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Role } from '../types';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { register } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('Tutor');

  const isValid = useMemo(
    () => name.length > 2 && email.includes('@') && password.length >= 6,
    [name, email, password],
  );

  const handleRegister = () => {
    if (!isValid) {
      Alert.alert('Error', 'Completa los campos correctamente antes de continuar.');
      return;
    }

    const success = register({
      name,
      email,
      password,
      role,
      photoUrl: '',
      phone: '',
      children: '',
      needs: '',
      experience: '',
      certifications: '',
      capabilities: '',
      availability: '',
      rate: '12',
      avatarUrl: '',
      bio: '',
    });

    if (!success) {
      Alert.alert('Error', 'Ya existe un usuario con ese correo electrónico.');
      return;
    }

    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <View style={styles.roleSwitcher}>
        <TouchableOpacity style={[styles.roleButton, role === 'Tutor' && styles.roleButtonActive]} onPress={() => setRole('Tutor')}>
          <Text style={[styles.roleText, role === 'Tutor' && styles.roleTextActive]}>Tutor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleButton, role === 'Cuidador' && styles.roleButtonActive]} onPress={() => setRole('Cuidador')}>
          <Text style={[styles.roleText, role === 'Cuidador' && styles.roleTextActive]}>Cuidador</Text>
        </TouchableOpacity>
      </View>
      <Button title="Crear cuenta" onPress={handleRegister} disabled={!isValid} />
      <Text style={styles.hint}>Después podrás completar tu perfil y comenzar a recibir solicitudes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
  roleSwitcher: { flexDirection: 'row', marginBottom: 16 },
  roleButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginRight: 8, alignItems: 'center' },
  roleButtonActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  roleText: { color: '#111' },
  roleTextActive: { color: '#fff', fontWeight: '700' },
  hint: { marginTop: 16, color: '#666', textAlign: 'center' },
});
