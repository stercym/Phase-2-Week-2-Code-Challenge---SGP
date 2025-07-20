const API_URL = 'http://localhost:3000/goals';

export const fetchGoals = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch goals');
  }
  return response.json();
};

export const addGoal = async (goal) => {
  const newGoal = {
    ...goal,
    id: Date.now().toString(), // Simple unique ID generation for simulation
    createdAt: new Date().toISOString().split('T')[0],
    savedAmount: goal.savedAmount || 0, // Ensure savedAmount defaults to 0 if not provided
  };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGoal),
  });
  if (!response.ok) {
    throw new Error('Failed to add goal');
  }
  return response.json();
};

export const updateGoal = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT', // Or PATCH if you only want to send changed fields
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error('Failed to update goal');
  }
  return response.json();
};

export const deleteGoal = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete goal');
  }
  return response.json(); // json-server usually returns an empty object or {} on successful DELETE
};

export const makeDeposit = async (goalId, newSavedAmount) => {
  const response = await fetch(`${API_URL}/${goalId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ savedAmount: newSavedAmount }),
  });
  if (!response.ok) {
    throw new Error('Failed to make deposit');
  }
  return response.json();
};