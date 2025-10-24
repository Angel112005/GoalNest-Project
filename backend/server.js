const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🟢 Endpoint solicitado: apellido → nombre completo
app.get("/martinez", (req, res) => {
  res.json({ nombre_completo: "Ángel Gabriel Martínez Castillo" });
});

// 🟡 Crear tabla si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('short','medium','long'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// 🧩 Rutas CRUD
// Obtener todos los objetivos
app.get("/api/goals", (req, res) => {
  db.query("SELECT * FROM goals ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Crear un objetivo
app.post("/api/goals", (req, res) => {
  const { title, description, type } = req.body;
  db.query(
    "INSERT INTO goals (title, description, type) VALUES (?, ?, ?)",
    [title, description, type],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, title, description, type });
    }
  );
});

// Editar un objetivo
app.put("/api/goals/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  db.query(
    "UPDATE goals SET title=?, description=?, type=? WHERE id=?",
    [title, description, type, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Objetivo actualizado correctamente" });
    }
  );
});

// Eliminar un objetivo
app.delete("/api/goals/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM goals WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Objetivo eliminado" });
  });
});

// 🔵 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
