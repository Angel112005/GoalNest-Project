import { useState } from 'react';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const goal = { title: newGoal };
    setGoals([...goals, goal]);
    setNewGoal('');
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📘 GoalNest</h1>
      <h2>By Ángel Gabriel Martínez Castillo</h2>

      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          placeholder="Escribe un nuevo objetivo..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          style={{ padding: '0.5rem', width: '250px' }}
        />
        <button
          onClick={addGoal}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
        >
          Agregar
        </button>
      </div>

      <h3 style={{ marginTop: '2rem' }}>🎯 Tus objetivos:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {goals.map((g, i) => (
          <li key={i} style={{ margin: '0.5rem 0', background: '#f0f0f0', padding: '0.5rem' }}>
            {g.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
