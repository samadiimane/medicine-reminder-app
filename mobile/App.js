import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const API_BASE_URL = 'http://192.168.1.1:8080';

export default function App() {
  const [email, setEmail] = useState('imane@test.com');
  const [password, setPassword] = useState('123456789');

  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [medicines, setMedicines] = useState([]);

  const [medicineName, setMedicineName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('08:00:00');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setUser(null);
    setToken('');
    setMedicines([]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const data = await response.json();

      setUser({
        id: data.userId,
        fullName: data.fullName,
        email: data.email,
      });

      setToken(data.token);
      await fetchMedicines(data.token);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicines = async (jwtToken = token) => {
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to load medicines with status ${response.status}`);
      }

      const data = await response.json();
      setMedicines(data);
    } catch (err) {
      setError(err.message || 'Could not load medicines');
    }
  };

  const handleAddMedicine = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/medicines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: medicineName,
          dose,
          time,
          frequency,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error(`Add medicine failed with status ${response.status}`);
      }

      setMedicineName('');
      setDose('');
      setTime('08:00:00');
      setFrequency('');
      setNotes('');

      await fetchMedicines();
    } catch (err) {
      setError(err.message || 'Could not add medicine');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setMedicines([]);
    setError('');
  };

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>My Medicines</Text>
            <Text style={styles.subtitle}>Logged in as {user.fullName}</Text>

            <Text style={styles.sectionTitle}>Add medicine</Text>

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
              <Button title="Add medicine" onPress={handleAddMedicine} />
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text style={styles.sectionTitle}>Medicine list</Text>

            <Button title="Refresh list" onPress={() => fetchMedicines()} />

            {medicines.length === 0 ? (
              <Text style={styles.emptyText}>No medicines found.</Text>
            ) : (
              medicines.map((item) => (
                <View key={item.id} style={styles.medicineItem}>
                  <Text style={styles.medicineName}>{item.name}</Text>
                  <Text>Dose: {item.dose || '-'}</Text>
                  <Text>Time: {item.time}</Text>
                  <Text>Frequency: {item.frequency}</Text>
                  <Text>Notes: {item.notes || '-'}</Text>
                </View>
              ))
            )}

            <View style={styles.logoutButton}>
              <Button title="Logout" color="red" onPress={handleLogout} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.card}>
        <Text style={styles.title}>Medicine Reminder</Text>
        <Text style={styles.subtitle}>Login to manage your medicine schedule</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
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
  error: {
    color: 'red',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
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
  logoutButton: {
    marginTop: 16,
  },
});
