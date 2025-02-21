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
import { useParams } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todolist/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <p className="text-gray-500 text-center mt-10">Loading task...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full px-6"
    >
      <Card className="w-full max-w-3xl bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#00AEEF]">{todo.title}</CardTitle>
          <CardDescription className="text-gray-400">{todo.date}</CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <p className="text-gray-300 text-lg">{todo.description}</p>
        </CardContent>
        <CardFooter className="text-gray-500 text-sm">
          © Thirdeey | All rights reserved.
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Todo;
