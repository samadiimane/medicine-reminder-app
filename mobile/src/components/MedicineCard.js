import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function MedicineCard({ medicine, onEdit, onDelete }) {
  return (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{medicine.name}</Text>
      <Text>Dose: {medicine.dose || '-'}</Text>
      <Text>Time: {medicine.time}</Text>
      <Text>Frequency: {medicine.frequency}</Text>
      <Text>Notes: {medicine.notes || '-'}</Text>

      <View style={styles.actionRow}>
        <View style={styles.actionButton}>
          <Button title="Edit" onPress={() => onEdit(medicine)} />
        </View>

        <View style={styles.actionButton}>
          <Button title="Delete" color="red" onPress={() => onDelete(medicine.id)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  medicineItem: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
  },
});
