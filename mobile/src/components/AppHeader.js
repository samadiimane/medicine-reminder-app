import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../styles/theme';

const logo = require('../../assets/logo.png');

export default function AppHeader({ user, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSide}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <View style={styles.userBox}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName} numberOfLines={1}>
            {user.fullName}
          </Text>
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  logo: {
    width: 100,
    height: 80,
    borderRadius: 16,
  },
  userBox: {
    flex: 1,
  },
  greeting: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  userName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: colors.dangerLight,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '700',
  },
});
