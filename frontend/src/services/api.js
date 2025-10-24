// Detecta la URL del backend automáticamente
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API_URL = `${API_BASE}/api/goals`;

export async function getGoals() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function addGoal(goal) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  return await res.json();
}

export async function updateGoal(id, goal) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
}

export async function deleteGoal(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
