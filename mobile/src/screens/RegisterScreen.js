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

export default function RegisterScreen({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  onRegister,
  onGoToLogin,
}) {
  return (
    <SafeAreaView style={commonStyles.centeredScreen}>
      <View style={styles.authCard}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={commonStyles.title}>Create Account</Text>
        <Text style={commonStyles.subtitle}>Start managing your medicine safely</Text>

        <Text style={commonStyles.label}>Full name</Text>
        <TextInput
          style={commonStyles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
        />

        <Text style={commonStyles.label}>Email</Text>
        <TextInput
          style={commonStyles.input}
          autoCapitalize="none"
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
          <Button title="Register" color={colors.primary} onPress={onRegister} />
        )}

        <View style={commonStyles.linkButton}>
          <Button title="Already have an account? Login" color={colors.accent} onPress={onGoToLogin} />
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
    maxWidth: 460,
  },
  logo: {
    width: 220,
    height: 200,
    alignSelf: 'center',
  },
});
