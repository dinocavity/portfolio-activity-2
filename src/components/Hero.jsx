import { useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Hero = ({ setShowHero, setShowSections }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 text-center transition-all duration-500">
      {/* Light/Dark Mode Toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      {/* Hero Title & Description */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Welcome to My Portfolio
      </motion.h1>

      <motion.p
        className="text-lg md:text-2xl max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      >
        Crafting seamless web experiences.
      </motion.p>

      {/* Rotating Profile Image */}
      <motion.div
        className="relative mt-12 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        {/* Outer Spinning Border */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-60 h-60 md:w-72 md:h-72 rounded-full border-[6px] border-transparent animate-[spin_8s_linear_infinite] border-t-blue-500 dark:border-t-gray-400"></div>
        </div>

        {/* Flipping Profile Image */}
        <motion.div
          className="relative w-52 h-52 md:w-64 md:h-64 rounded-full shadow-lg overflow-hidden bg-gray-300 dark:bg-gray-800"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.img
            key={flipped ? "profile" : "gif"}
            src={flipped ? "/profile/profile1.png" : "https://media.giphy.com/media/gWVURnPa6iLLi/giphy.gif?cid=790b7611flqt9kz6sb3r7a1o7fs19hk15pndvml2ph1tt5m7&ep=v1_gifs_search&rid=giphy.gif&ct=g"}
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
        className="mt-10 px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300 bg-black text-white dark:bg-white dark:text-black"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setShowHero(false);
          setShowSections(true); 
        }}
      >
        Show More
      </motion.button>
    </section>
  );
};

export default Hero;
