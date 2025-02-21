import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const TodoCard = ({ data, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full cursor-pointer"
      onClick={onClick}
    >
      <Card className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-[#00AEEF]">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">{data.description}</CardContent>
        <CardFooter className="text-gray-500 text-sm">{data.date}</CardFooter>
      </Card>
    </motion.div>
  );
};

export default TodoCard;
