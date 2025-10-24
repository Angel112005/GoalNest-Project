import { useEffect, useState } from "react";
import GoalForm from "../components/GoalForm";
import GoalCard from "../components/GoalCard";
import { motion } from "framer-motion";
import { getGoals, addGoal, updateGoal, deleteGoal } from "../services/api";
import Swal from "sweetalert2";

export default function Home() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error("Error al obtener objetivos:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudieron cargar los objetivos desde la API.",
        background: "#1c1c1c",
        color: "#fff",
      });
    }
  };

  const handleAdd = async (goal) => {
    const saved = await addGoal(goal);
    setGoals([saved, ...goals]);
  };

  const handleDelete = async (id) => {
    await deleteGoal(id);
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleEdit = async (id, newData) => {
    await updateGoal(id, newData);
    setGoals(goals.map((g) => (g.id === id ? { ...g, ...newData } : g)));
  };

  const filterByType = (type) => goals.filter((g) => g.type === type);

  // 🧮 Totales por tipo
  const totalShort = filterByType("short").length;
  const totalMedium = filterByType("medium").length;
  const totalLong = filterByType("long").length;
  const totalAll = goals.length;

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col md:flex-row px-6 py-10 gap-8">
      {/* === CONTENIDO PRINCIPAL === */}
      <motion.main
        className="flex-1 flex flex-col items-center order-1 md:order-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gold mb-2 text-center">
          GoalNest 🪶
        </h1>
        <p className="text-gray-400 mb-10 text-center">
          Organiza tus metas con elegancia y propósito.  
          <br />By Ángel Gabriel Martínez Castillo
        </p>

        <GoalForm onAdd={handleAdd} />

        {/* Sección general */}
        <div className="mt-10 w-full max-w-3xl">
          <h2 className="text-[#4FA3F7] text-2xl font-semibold mb-4 border-b border-[#4FA3F7] pb-2">
            🗂 Todos los objetivos
          </h2>
          {goals.length > 0 ? (
            <div className="grid gap-4">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-6">
              Aún no has agregado ningún objetivo.
            </p>
          )}
        </div>

          {/* === BOTÓN FINAL DE AUTOR ELEGANTE Y LIMPIO === */}
          <div className="mt-20 text-center flex flex-col items-center">
            <motion.button
              onClick={async () => {
                try {
                  const res = await fetch("http://localhost:5000/martinez");
                  const data = await res.json();
                  Swal.fire({
                    title: "👨‍💻 Desarrollado por",
                    html: `
                      <p style="font-size:1.2rem; margin-top:8px; color:#c0c0c0;">
                        <strong style="color:#e0e0e0;">${data.nombre_completo}</strong>
                      </p>
                      <p style="margin-top:6px; color:#a8a8a8;">Creador del proyecto <strong style="color:#b3cfff;">GoalNest</strong></p>
                    `,
                    background: "#101010",
                    color: "#e5e5e5",
                    confirmButtonColor: "#b3cfff",
                    confirmButtonText: "Cerrar",
                  });
                } catch {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo obtener la información del autor.",
                    background: "#101010",
                    color: "#fff",
                  });
                }
              }}
              className="px-8 py-3 rounded-md text-lg font-semibold text-gray-200 bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] border border-gray-600 shadow-[0_0_15px_rgba(179,207,255,0.2)] hover:shadow-[0_0_25px_rgba(179,207,255,0.5)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🪶 Ver información del autor
            </motion.button>

            <p className="text-gray-500 text-sm mt-4 italic">
              GoalNest © {new Date().getFullYear()} — Proyecto académico de Sistemas Operativos
            </p>
          </div>



      </motion.main>

      {/* === SIDEBAR DERECHO (CLASIFICACIÓN + ESTADÍSTICAS) === */}
      <motion.aside
        className="bg-gradient-to-b from-[#111] to-[#1a1a1a] border border-gray-700 rounded-xl shadow-lg w-full md:w-1/3 lg:w-1/4 p-5 h-fit md:sticky md:top-10 order-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* ===== ESTADÍSTICAS ===== */}
        <div className="mb-8">
          <h2 className="text-[#4FA3F7] text-2xl font-semibold mb-4 text-center">
            📊 Estadísticas
          </h2>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-[#161616] rounded-lg border border-gray-700 hover:border-[#4FA3F7] transition">
              <p className="text-sm text-gray-400">Corto</p>
              <p className="text-gold text-xl font-bold">{totalShort}</p>
            </div>
            <div className="p-3 bg-[#161616] rounded-lg border border-gray-700 hover:border-[#4FA3F7] transition">
              <p className="text-sm text-gray-400">Mediano</p>
              <p className="text-gold text-xl font-bold">{totalMedium}</p>
            </div>
            <div className="p-3 bg-[#161616] rounded-lg border border-gray-700 hover:border-[#4FA3F7] transition">
              <p className="text-sm text-gray-400">Largo</p>
              <p className="text-gold text-xl font-bold">{totalLong}</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Total de objetivos</p>
            <motion.p
              className="text-3xl font-bold text-[#4FA3F7]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {totalAll}
            </motion.p>
          </div>
        </div>

        {/* ===== CLASIFICACIÓN ===== */}
        <h2 className="text-[#4FA3F7] text-2xl font-semibold mb-5 text-center">
          📂 Clasificación
        </h2>

        {["short", "medium", "long"].map((type) => (
          <div key={type} className="mb-6">
            <h3 className="text-[#4FA3F7] text-lg mb-2 border-b border-gray-700 pb-1">
              {type === "short"
                ? "Corto plazo 🕐"
                : type === "medium"
                ? "Mediano plazo ⏳"
                : "Largo plazo 🎯"}
            </h3>
            {filterByType(type).length > 0 ? (
              <div className="flex flex-col gap-2">
                {filterByType(type).map((goal) => (
                  <motion.div
                    key={goal.id}
                    className="p-3 bg-[#161616] rounded-lg border border-gray-700 hover:border-[#4FA3F7] transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="text-sm font-semibold text-[#d4af37] truncate">
                      {goal.title}
                    </h4>
                    {goal.description && (
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {goal.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 italic mt-1">
                      {goal.type === "short"
                        ? "Corto"
                        : goal.type === "medium"
                        ? "Mediano"
                        : "Largo"}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-xs italic">
                Sin objetivos en esta categoría.
              </p>
            )}
          </div>
        ))}
      </motion.aside>
    </div>
  );
}
