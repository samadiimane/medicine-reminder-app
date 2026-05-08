import React from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MedicineForm from '../components/MedicineForm';
import MedicineCard from '../components/MedicineCard';

export default function MedicinesScreen({
  user,
  medicines,
  form,
  loading,
  error,
  onSaveMedicine,
  onEditMedicine,
  onDeleteMedicine,
  onRefresh,
  onLogout,
  onCancelEdit,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>My Medicines</Text>
          <Text style={styles.subtitle}>Logged in as {user.fullName}</Text>

          <MedicineForm
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

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.sectionTitle}>Medicine list</Text>

          <Button title="Refresh list" onPress={onRefresh} />

          {medicines.length === 0 ? (
            <Text style={styles.emptyText}>No medicines found.</Text>
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

          <View style={styles.logoutButton}>
            <Button title="Logout" color="red" onPress={onLogout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 6,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 16,
  },
});
