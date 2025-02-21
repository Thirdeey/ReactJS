import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const AddTodo = ({ onClose, refreshTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !date) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const id = Date.now().toString();

    try {
      await axios.post("http://localhost:3000/todolist", {
        id,
        title,
        description,
        date,
      });

      onClose();
      refreshTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-[#1e1e1e] text-white shadow-xl rounded-2xl w-full max-w-lg p-6 relative border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-white transition"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <CardHeader>
          <CardTitle className="text-[#00AEEF] text-xl font-semibold text-center">
            Add New Task
          </CardTitle>
        </CardHeader>

        {/* Form */}
        <CardContent className="flex flex-col gap-y-4">
          <div>
            <Label className="text-gray-300">Title</Label>
            <Input
              className="bg-[#2a2a2a] text-white border-gray-700 focus:ring-[#00AEEF] focus:border-[#00AEEF]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-gray-300">Description</Label>
            <Textarea
              className="bg-[#2a2a2a] text-white border-gray-700 focus:ring-[#00AEEF] focus:border-[#00AEEF] h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-gray-300">Date</Label>
            <Input
              type="date"
              className="bg-[#2a2a2a] text-white border-gray-700 focus:ring-[#00AEEF] focus:border-[#00AEEF]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </CardContent>

        {/* Buttons */}
        <CardFooter className="flex justify-center gap-4">
          <Button
            className="bg-[#00AEEF] hover:bg-blue-500 text-white flex items-center gap-2 w-full py-2 rounded-lg transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
            <FiPlus size={18} />
          </Button>
        </CardFooter>
      </motion.div>
    </motion.div>
  );
};

export default AddTodo;
