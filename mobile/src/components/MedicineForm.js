import React from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export default function MedicineForm({
  visible,
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
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>
                {editingMedicineId ? 'Edit Medicine' : 'Add Medicine'}
              </Text>
              <Text style={styles.modalSubtitle}>
                Keep the schedule clear and easy to follow.
              </Text>
            </View>

            <Pressable style={styles.closeButton} onPress={onCancel}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <Text style={commonStyles.label}>Name</Text>
          <TextInput
            style={commonStyles.input}
            value={medicineName}
            onChangeText={setMedicineName}
            placeholder="Example: Vitamin C"
          />

          <Text style={commonStyles.label}>Dose</Text>
          <TextInput
            style={commonStyles.input}
            value={dose}
            onChangeText={setDose}
            placeholder="Example: 500mg"
          />

          <Text style={commonStyles.label}>Time</Text>
          <TextInput
            style={commonStyles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Example: 08:00:00"
          />

          <Text style={commonStyles.label}>Frequency</Text>
          <TextInput
            style={commonStyles.input}
            value={frequency}
            onChangeText={setFrequency}
            placeholder="Example: Once per day"
          />

          <Text style={commonStyles.label}>Notes</Text>
          <TextInput
            style={[commonStyles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Example: After breakfast"
            multiline
          />

          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <View style={styles.actions}>
              <View style={styles.actionButton}>
                <Button title="Cancel" color={colors.muted} onPress={onCancel} />
              </View>

              <View style={styles.actionButton}>
                <Button
                  title={editingMedicineId ? 'Update' : 'Save'}
                  color={colors.primary}
                  onPress={onSave}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  modalSubtitle: {
    color: colors.muted,
    marginTop: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 26,
    color: colors.text,
    lineHeight: 28,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});
