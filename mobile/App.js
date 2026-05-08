import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MedicinesScreen from './src/screens/MedicinesScreen';
import { login, register } from './src/services/authService';
import {
  createMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine,
} from './src/services/medicineService';

export default function App() {
  const [authMode, setAuthMode] = useState('login');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('imane@test.com');
  const [password, setPassword] = useState('123456789');

  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [medicines, setMedicines] = useState([]);

  const [editingMedicineId, setEditingMedicineId] = useState(null);
  const [medicineName, setMedicineName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('08:00:00');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const clearMedicineForm = () => {
    setEditingMedicineId(null);
    setMedicineName('');
    setDose('');
    setTime('08:00:00');
    setFrequency('');
    setNotes('');
  };

  const fetchMedicines = async (jwtToken = token) => {
    setError('');
    const data = await getMedicines(jwtToken);
    setMedicines(data);
  };

  const saveAuthenticatedUser = async (data) => {
    setUser({
      id: data.userId,
      fullName: data.fullName,
      email: data.email,
    });

    setToken(data.token);
    await fetchMedicines(data.token);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setUser(null);
    setToken('');
    setMedicines([]);

    try {
      const data = await login(email, password);
      await saveAuthenticatedUser(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    setUser(null);
    setToken('');
    setMedicines([]);

    try {
      const data = await register(fullName, email, password);
      await saveAuthenticatedUser(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMedicine = async () => {
    setLoading(true);
    setError('');

    const medicinePayload = {
      name: medicineName,
      dose,
      time,
      frequency,
      notes,
    };

    try {
      if (editingMedicineId) {
        await updateMedicine(token, editingMedicineId, medicinePayload);
      } else {
        await createMedicine(token, medicinePayload);
      }

      clearMedicineForm();
      await fetchMedicines();
    } catch (err) {
      setError(err.message || 'Could not save medicine');
    } finally {
      setLoading(false);
    }
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicineId(medicine.id);
    setMedicineName(medicine.name || '');
    setDose(medicine.dose || '');
    setTime(medicine.time || '08:00:00');
    setFrequency(medicine.frequency || '');
    setNotes(medicine.notes || '');
  };

  const handleDeleteMedicine = async (id) => {
    setLoading(true);
    setError('');

    try {
      await deleteMedicine(token, id);

      if (editingMedicineId === id) {
        clearMedicineForm();
      }

      await fetchMedicines();
    } catch (err) {
      setError(err.message || 'Could not delete medicine');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setMedicines([]);
    setError('');
    clearMedicineForm();
    setAuthMode('login');
  };

  if (!user && authMode === 'register') {
    return (
      <RegisterScreen
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        error={error}
        onRegister={handleRegister}
        onGoToLogin={() => {
          setError('');
          setAuthMode('login');
        }}
      />
    );
  }

  if (!user) {
    return (
      <LoginScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        error={error}
        onLogin={handleLogin}
        onGoToRegister={() => {
          setError('');
          setFullName('');
          setAuthMode('register');
        }}
      />
    );
  }

  return (
    <MedicinesScreen
      user={user}
      medicines={medicines}
      form={{
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
      }}
      loading={loading}
      error={error}
      onSaveMedicine={handleSaveMedicine}
      onEditMedicine={handleEditMedicine}
      onDeleteMedicine={handleDeleteMedicine}
      onRefresh={() => fetchMedicines()}
      onLogout={handleLogout}
      onCancelEdit={clearMedicineForm}
    />
  );
}
