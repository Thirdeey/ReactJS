import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";

const TodoModal = ({ todo, onClose, onDelete }) => {
  if (!todo) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [date, setDate] = useState(todo?.date || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/todolist/${todo.id}`, {
        title,
        description,
        date,
      });

      onClose(); // ✅ Close Modal
      setTimeout(() => {
        window.location.reload(); // ✅ Refresh Page after a short delay
      }, 300);
    } catch (error) {
      console.error("Error updating to-do:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-[#1e1e1e] text-white p-6 rounded-lg shadow-lg w-[400px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-white">
          <FiX size={24} />
        </button>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#00AEEF]">
            {isEditing ? "Edit To-Do" : todo.title || "Untitled"}
          </h2>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(!isEditing)} className="text-yellow-400 hover:text-yellow-300">
              <FiEdit size={20} />
            </button>
            <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-400">
              <FiTrash size={20} />
            </button>
          </div>
        </div>

        {isEditing ? (
          <>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white p-2 rounded-md border border-gray-600 focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white p-2 rounded-md border border-gray-600 focus:outline-none h-24"
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white p-2 rounded-md border border-gray-600 focus:outline-none"
              />
            </div>
            <button
              className="mt-4 w-full bg-[#00AEEF] text-white py-2 rounded-md hover:bg-blue-500 transition"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <p className="mt-4 text-gray-300">{todo.description || "No description"}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TodoModal;
