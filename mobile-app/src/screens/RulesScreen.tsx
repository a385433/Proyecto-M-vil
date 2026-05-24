import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const rulesText = `Reglamento y normas de conducta para cuidadores:\n\n1. Puntualidad y profesionalismo: el cuidador debe presentarse a tiempo y actuar de forma respetuosa con la familia y los niños.\n\n2. Seguridad: mantener vigilancia constante, respetar las indicaciones de los tutores y prevenir situaciones de riesgo.\n\n3. Confidencialidad: no compartir datos personales ni información sensible de las familias.\n\n4. Higiene y cuidado: mantener buenas prácticas de limpieza y atención personal durante el cuidado.\n\n5. Comunicación: informar cualquier incidencia de forma clara y oportuna.\n\n6. Capacitación: respetar las capacitaciones, certificaciones y protocolos solicitados por el sistema.`;

export default function RulesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reglamento para Cuidadores</Text>
      <Text style={styles.text}>{rulesText}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 24, marginBottom: 16 },
  text: { fontSize: 16, lineHeight: 24, color: '#333' },
});
