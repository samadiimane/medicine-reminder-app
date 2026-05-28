import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../styles/theme';

export default function MedicineCard({ medicine, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>

        <View style={styles.mainInfo}>
          <Text style={styles.name}>{medicine.name}</Text>
          <Text style={styles.meta}>{medicine.frequency}</Text>
        </View>

        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{medicine.time}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailText}>Dose: {medicine.dose || '-'}</Text>
        <Text style={styles.detailText}>Notes: {medicine.notes || '-'}</Text>
      </View>

      <View style={styles.actionRow}>
        <View style={styles.actionButton}>
          <Button title="Edit" color={colors.accent} onPress={() => onEdit(medicine)} />
        </View>

        <View style={styles.actionButton}>
          <Button title="Remove" color={colors.danger} onPress={() => onDelete(medicine.id)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
  },
  mainInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    color: colors.muted,
    marginTop: 2,
  },
  timeBadge: {
    backgroundColor: '#eff6ff',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  timeText: {
    color: colors.accent,
    fontWeight: '700',
  },
  details: {
    backgroundColor: '#f8fafc',
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.md,
    gap: 4,
  },
  detailText: {
    color: colors.text,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actionButton: {
    flex: 1,
    borderRadius: radius.lg,
  },
});
