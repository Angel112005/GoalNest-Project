import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaEdit, FaSave, FaTimes, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

export default function GoalCard({ goal, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: goal.title,
    description: goal.description || "",
    type: goal.type,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "El título no puede estar vacío",
        background: "#1c1c1c",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
      return;
    }

    onEdit(goal.id, formData);
    setEditing(false);

    Swal.fire({
      icon: "success",
      title: "Cambios guardados",
      showConfirmButton: false,
      timer: 1000,
      background: "#1c1c1c",
      color: "#fff",
    });
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      title: goal.title,
      description: goal.description || "",
      type: goal.type,
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Eliminar objetivo?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      background: "#1c1c1c",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#555",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        onDelete(goal.id);
        Swal.fire({
          icon: "success",
          title: "Eliminado correctamente",
          showConfirmButton: false,
          timer: 1000,
          background: "#1c1c1c",
          color: "#fff",
        });
      }
    });
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "short":
        return "Corto plazo 🕐";
      case "medium":
        return "Mediano plazo ⏳";
      case "long":
        return "Largo plazo 🎯";
      default:
        return "Sin definir";
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-gray-700 hover:border-gold rounded-xl shadow-lg p-5 transition-all duration-300 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {editing ? (
            <>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título del objetivo"
                className="bg-dark border border-gray-600 rounded px-3 py-2 w-full text-white font-semibold focus:ring-2 focus:ring-gold mb-2"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción..."
                rows={2}
                className="bg-dark border border-gray-600 rounded px-3 py-2 w-full text-white text-sm focus:ring-2 focus:ring-gold resize-none"
              ></textarea>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 mt-2 rounded bg-dark border border-gray-700 text-white text-sm focus:ring-2 focus:ring-gold"
              >
                <option value="short">Corto plazo 🕐</option>
                <option value="medium">Mediano plazo ⏳</option>
                <option value="long">Largo plazo 🎯</option>
              </select>
            </>
          ) : (
            <>
              <h2 className="text-gold text-xl font-semibold tracking-wide mb-1">
                {goal.title}
              </h2>
              {goal.description && (
                <p className="text-gray-300 text-sm leading-relaxed">
                  {goal.description}
                </p>
              )}
              <p className="text-sm text-gray-400 mt-1">{getTypeLabel(goal.type)}</p>
            </>
          )}
        </div>

        <div className="flex gap-2 ml-3">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-gold text-dark px-3 py-2 rounded hover:brightness-110 flex items-center gap-1"
                title="Guardar"
              >
                <FaSave />
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-600 flex items-center gap-1"
                title="Cancelar"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="text-gold hover:text-yellow-300 p-2"
                title="Editar"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 p-2"
                title="Eliminar"
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 border-t border-gray-700 pt-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FaClock />
          {getTypeLabel(formData.type)}
        </div>
        {!editing && (
          <span className="text-xs text-gray-500 italic">
            Última act.: {new Date().toLocaleDateString()}
          </span>
        )}
      </div>
    </motion.div>
  );
}
