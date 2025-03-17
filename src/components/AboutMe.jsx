import { motion } from "framer-motion";
import { Instagram, Facebook, Github, Mail, ArrowUp } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const AboutMe = ({ setShowHero, setShowSections }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center transition-all duration-500">
      {/* Light/Dark Mode Toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <motion.img
        src="/profile/profile.png"
        alt="Profile"
        className="w-40 h-40 md:w-52 md:h-52 rounded-full shadow-lg mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <h2 className="text-3xl md:text-4xl font-bold">Dion Cedrick Marquez</h2>
      <p className="text-lg md:text-xl max-w-xl mt-2">
        Passionate Web Developer, building modern and efficient applications.
      </p>

      {/* Social Media Links */}
      <div className="flex space-x-4 mt-4">
        <a href="https://www.instagram.com/l.marquez.dion" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-6 h-6 cursor-pointer hover:text-pink-500 transition" />
        </a>
        <a href="https://www.facebook.com/cedrick.marquez.963" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />
        </a>
        <a href="https://github.com/dinocavity" target="_blank" rel="noopener noreferrer">
          <Github className="w-6 h-6 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition" />
        </a>
        <a href="mailto:your.asurakirei@gmail.com">
          <Mail className="w-6 h-6 cursor-pointer hover:text-red-500 transition" />
        </a>
      </div>

      {/* Download CV Button */}
      <motion.a
        href="/profile/CURRICULUM VITAE- MARQUEZ.pdf"
        className="mt-10 px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300 bg-black text-white dark:bg-white dark:text-black"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        download
      >
        View CV
      </motion.a>

      {/* Floating Go Back to Top Button */}
      <button
        onClick={() => {
          setShowHero(true);
          setShowSections(false);
        }}
        className="fixed bottom-6 right-6 p-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full shadow-lg transition hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        <ArrowUp size={24} />
      </button>
    </section>
  );
};

export default AboutMe;
