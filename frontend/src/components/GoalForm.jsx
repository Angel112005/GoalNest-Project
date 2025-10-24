import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function GoalForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("short");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "El título es obligatorio",
        text: "Por favor escribe un título antes de agregar el objetivo.",
        background: "#1c1c1c",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
      return;
    }

    const newGoal = {
      id: Date.now(),
      title,
      description,
      type,
    };

    onAdd(newGoal);
    setTitle("");
    setDescription("");
    setType("short");

    Swal.fire({
      icon: "success",
      title: "¡Objetivo agregado!",
      showConfirmButton: false,
      timer: 1000,
      background: "#1c1c1c",
      color: "#fff",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-gray-700 hover:border-gold rounded-xl shadow-lg p-6 w-full max-w-md mx-auto transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-gold text-2xl font-semibold mb-4 text-center tracking-wide">
        Nuevo objetivo 🎯
      </h2>

      {/* Campo de título */}
      <label className="block text-sm text-gray-400 mb-1">Título</label>
      <input
        type="text"
        placeholder="Ej. Terminar mi proyecto de IoT"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded bg-dark border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-gold mb-4"
      />

      {/* Campo de descripción */}
      <label className="block text-sm text-gray-400 mb-1">Descripción</label>
      <textarea
        placeholder="Detalles o notas sobre tu objetivo..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full p-3 rounded bg-dark border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-gold resize-none mb-4"
      ></textarea>

      {/* Campo de plazo */}
      <label className="block text-sm text-gray-400 mb-1">Plazo</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 rounded bg-dark border border-gray-700 text-white focus:ring-2 focus:ring-gold mb-6"
      >
        <option value="short">Corto plazo 🕐</option>
        <option value="medium">Mediano plazo ⏳</option>
        <option value="long">Largo plazo 🎯</option>
      </select>

      {/* Botón de envío */}
      <motion.button
        type="submit"
        className="bg-gold text-dark font-semibold w-full py-3 rounded-md shadow-md hover:brightness-110 transition flex justify-center items-center gap-2"
        whileTap={{ scale: 0.95 }}
      >
        Agregar objetivo
      </motion.button>
    </motion.form>
  );
}
