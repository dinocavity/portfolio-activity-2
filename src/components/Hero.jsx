import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const Hero = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [flipped, setFlipped] = useState(false);

  // Apply dark mode based on state
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <section className="h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 text-center transition-all duration-500">
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-gray-3900 dark:bg-gray-700 rounded-full shadow-lg transition text-gray-900 dark:text-gray-100"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center">
        {/* Hero Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Welcome to My Portfolio
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          className="text-lg md:text-2xl max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          Crafting seamless web experiences.
        </motion.p>

        {/* Animated Profile/GIF Section */}
        <motion.div
          className="relative mt-12 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center cursor-pointer"
          onClick={() => setFlipped(!flipped)}
        >
          {/* Rotating Border (Slower Spin) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-60 h-60 md:w-72 md:h-72 rounded-full border-[6px] border-transparent animate-[spin_8s_linear_infinite] border-t-blue-500 dark:border-t-gray-400"></div>
          </div>

          {/* Flip Animation for Profile Image */}
          <motion.div
            className="relative w-52 h-52 md:w-64 md:h-64 rounded-full shadow-lg overflow-hidden bg-gray-300 dark:bg-gray-800"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.img
              key={flipped ? "profile" : "gif"}
              src={
                flipped
                  ? "/profile/profile.png"
                  : "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Show More Button */}
        <motion.button
          className="mt-10 px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300"
          style={{
            background: darkMode ? "#ffffff" : "#000000",
            color: darkMode ? "#000000" : "#ffffff",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Show More
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
