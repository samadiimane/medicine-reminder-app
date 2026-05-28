import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import MedicineForm from '../components/MedicineForm';
import MedicineCard from '../components/MedicineCard';
import { colors, radius, spacing } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

export default function MedicinesScreen({
  user,
  medicines,
  form,
  loading,
  error,
  isMedicineModalVisible,
  onOpenAddModal,
  onSaveMedicine,
  onEditMedicine,
  onDeleteMedicine,
  onRefresh,
  onLogout,
  onCancelEdit,
}) {
  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView contentContainerStyle={commonStyles.pageContent}>
        <AppHeader user={user} onLogout={onLogout} />

        <Pressable style={styles.addButton} onPress={onOpenAddModal}>
          <Text style={styles.addButtonText}>Add Medicine</Text>
        </Pressable>

        {error ? <Text style={commonStyles.error}>{error}</Text> : null}

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Medicines</Text>

          <Pressable onPress={onRefresh}>
            <Text style={styles.refreshText}>Refresh</Text>
          </Pressable>
        </View>

        <View style={styles.listContainer}>
          {medicines.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🩺</Text>
              <Text style={styles.emptyTitle}>No medicines yet</Text>
              <Text style={styles.emptyText}>
                Tap “Add Medicine” to create your first reminder.
              </Text>
            </View>
          ) : (
            medicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onEdit={onEditMedicine}
                onDelete={onDeleteMedicine}
              />
            ))
          )}
        </View>

        <MedicineForm
          visible={isMedicineModalVisible}
          editingMedicineId={form.editingMedicineId}
          medicineName={form.medicineName}
          setMedicineName={form.setMedicineName}
          dose={form.dose}
          setDose={form.setDose}
          time={form.time}
          setTime={form.setTime}
          frequency={form.frequency}
          setFrequency={form.setFrequency}
          notes={form.notes}
          setNotes={form.setNotes}
          loading={loading}
          onSave={onSaveMedicine}
          onCancel={onCancelEdit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  summaryTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
  summaryText: {
    color: '#d1fae5',
    marginTop: 6,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  refreshText: {
    color: colors.primary,
    fontWeight: '700',
  },
  listContainer: {
    width: '100%',
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 6,
  },
});
