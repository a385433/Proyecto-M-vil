import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppContext } from '../context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = useMemo(() => email.includes('@') && password.length >= 6, [email, password]);

  const handleSubmit = () => {
    if (!isValid) {
      Alert.alert('Error', 'Introduce un correo válido y una contraseña de al menos 6 caracteres.');
      return;
    }

    const success = login(email, password);
    if (!success) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos.');
      return;
    }

    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nanys Care</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleSubmit} disabled={!isValid} />
      <View style={styles.registerRow}>
        <Text style={styles.hint}>¿No tienes cuenta?</Text>
        <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  hint: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  registerRow: {
    alignItems: 'center',
  },
});
