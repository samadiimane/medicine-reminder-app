import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MedicineForm({
  editingMedicineId,
  medicineName,
  setMedicineName,
  dose,
  setDose,
  time,
  setTime,
  frequency,
  setFrequency,
  notes,
  setNotes,
  loading,
  onSave,
  onCancel,
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>
        {editingMedicineId ? 'Edit medicine' : 'Add medicine'}
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={medicineName}
        onChangeText={setMedicineName}
        placeholder="Example: Vitamin C"
      />

      <Text style={styles.label}>Dose</Text>
      <TextInput
        style={styles.input}
        value={dose}
        onChangeText={setDose}
        placeholder="Example: 500mg"
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="Example: 08:00:00"
      />

      <Text style={styles.label}>Frequency</Text>
      <TextInput
        style={styles.input}
        value={frequency}
        onChangeText={setFrequency}
        placeholder="Example: Once per day"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Example: After breakfast"
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title={editingMedicineId ? 'Update medicine' : 'Add medicine'}
          onPress={onSave}
        />
      )}

      {editingMedicineId ? (
        <View style={styles.cancelButton}>
          <Button title="Cancel edit" onPress={onCancel} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cancelButton: {
    marginTop: 8,
  },
});
