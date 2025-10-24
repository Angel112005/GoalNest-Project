const API_URL = "http://localhost:5000/api/goals"; // <-- backend local

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
