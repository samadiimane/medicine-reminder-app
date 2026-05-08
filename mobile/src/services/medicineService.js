import { API_BASE_URL } from '../config/api';

export async function getMedicines(token) {
  const response = await fetch(`${API_BASE_URL}/api/medicines`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load medicines with status ${response.status}`);
  }

  return response.json();
}

export async function createMedicine(token, medicine) {
  const response = await fetch(`${API_BASE_URL}/api/medicines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(medicine),
  });

  if (!response.ok) {
    throw new Error(`Add medicine failed with status ${response.status}`);
  }

  return response.json();
}

export async function updateMedicine(token, id, medicine) {
  const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(medicine),
  });

  if (!response.ok) {
    throw new Error(`Update medicine failed with status ${response.status}`);
  }

  return response.json();
}

export async function deleteMedicine(token, id) {
  const response = await fetch(`${API_BASE_URL}/api/medicines/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Delete failed with status ${response.status}`);
  }
}
