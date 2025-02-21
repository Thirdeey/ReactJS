import { motion } from "framer-motion";

const Nav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto mt-5 px-6 py-4 rounded-xl shadow-md 
                 bg-[#1e1e1e] border border-gray-700 flex justify-center"
    >
      <h1 className="text-2xl font-bold text-white">My Notes</h1>
    </motion.nav>
  );
};

export default Nav;
