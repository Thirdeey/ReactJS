import Nav from "@/components/Nav";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center bg-[#121212] text-gray-200"
    >
      {/* Navbar - Centered and Spaced */}
      <div className="w-full max-w-4xl">
        <Nav />
      </div>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-4xl flex-1 flex justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1e1e1e] rounded-xl shadow-lg px-6 py-8 border border-gray-700 w-full"
        >
          <Outlet />
        </motion.div>
      </div>

      {/* Footer - Centered */}
      <footer className="w-full max-w-4xl py-5 text-center text-gray-400 text-sm border-t border-gray-700">
        © Thirdeey | All rights reserved.
      </footer>
    </motion.div>
  );
};

export default MainLayout;
