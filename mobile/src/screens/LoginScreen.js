import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing } from '../styles/theme';
import { commonStyles } from '../styles/commonStyles';

const logo = require('../../assets/logo.png');

export default function LoginScreen({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  onLogin,
  onGoToRegister,
}) {
  return (
    <SafeAreaView style={commonStyles.centeredScreen}>
      <View style={styles.authCard}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={commonStyles.subtitle}>
          Secure access to your medicine schedule
        </Text>

        <Text style={commonStyles.label}>Email</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <Text style={commonStyles.label}>Password</Text>
        <TextInput
          style={commonStyles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Button title="Login" color={colors.primary} onPress={onLogin} />
        )}

        <View style={commonStyles.linkButton}>
          <Button
            title="Create new account"
            color={colors.accent}
            onPress={onGoToRegister}
          />
        </View>

        {error ? <Text style={commonStyles.error}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authCard: {
    ...commonStyles.card,
    width: '100%',
    maxWidth: 390,
  },
  logo: {
    width: 220,
    height: 200,
    alignSelf: 'center',
  },
});