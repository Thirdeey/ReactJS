import AddTodo from "@/components/AddTodo";
import TodoCard from "@/components/TodoCard";
import TodoModal from "@/components/TodoModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const Todos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null); // ✅ Add State for Selected To-Do

  // Fetch To-Do List
  const fetchTodo = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/todolist");
      if (response.data && Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]); 
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setData([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  // Delete To-Do
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`);
      fetchTodo(); // ✅ Refresh list after deletion
      setSelectedTodo(null); // ✅ Close modal after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="relative">
      {/* 📝 To-Do List Card */}
      <Card className="w-[800px] bg-[#1e1e1e] text-white shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>To-Do's</CardTitle>
              <CardDescription className="text-gray-400">
                Here are your tasks
              </CardDescription>
            </div>
            {/* ➕ Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="p-2 rounded-full bg-[#00AEEF] text-white hover:bg-blue-500 transition"
            >
              <FiPlus size={24} />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-5 items-center">
            {loading ? (
              <p className="text-gray-400">Loading tasks...</p>
            ) : data.length > 0 ? (
              data.map((todo, index) => (
                <TodoCard
                  key={todo.id || index}
                  data={todo}
                  onClick={() => setSelectedTodo(todo)} // ✅ Open modal when clicked
                />
              ))
            ) : (
              <p className="text-gray-400">No to-dos available.</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <h1>&copy; THIRDEEY</h1>
        </CardFooter>
      </Card>

      {/* 📌 Add Todo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-[#1e1e1e] text-white p-6 rounded-lg shadow-lg w-[500px] relative"
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white"
            >
              <FiX size={24} />
            </button>
            {/* AddTodo Component - Pass Modal Control & Fetch Function */}
            <AddTodo onClose={() => setShowAddModal(false)} refreshTodos={fetchTodo} />
          </motion.div>
        </div>
      )}

      {/* 📝 To-Do Modal for Editing/Deleting */}
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)} // ✅ Close Modal
          onDelete={handleDelete} // ✅ Handle Delete
        />
      )}
    </div>
  );
};

export default Todos;
