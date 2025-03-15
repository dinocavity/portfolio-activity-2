import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout, Code2 } from "lucide-react";

const Header = ({ isBackend, setIsBackend }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle between frontend and backend mode
  const toggleMode = () => {
    setIsBackend(!isBackend);
    if (isBackend) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("devMode", "frontend");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("devMode", "backend");
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled 
          ? "py-2 backdrop-blur-md " + (isBackend ? "bg-blue-900/70" : "bg-white/70")
          : "py-3 " + (isBackend ? "bg-transparent" : "bg-transparent")
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex justify-between items-center">
        {/* Logo/Programmer Name */}
        <motion.a 
          href="#" 
          className={`text-base sm:text-lg md:text-xl font-bold relative overflow-hidden group ${
            isMobile ? "ml-0" : "ml-1"
          }`}
          aria-label="Home"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.span 
            className={`inline-block ${isBackend ? "text-blue-400" : "text-orange-500"}`}
            animate={{ y: 0 }}
            whileHover={{ y: -20 }}
            transition={{ duration: 0.3 }}
          >
            DinoCavity
          </motion.span>
          <motion.span 
            className={`absolute top-0 left-0 ${isBackend ? "text-blue-300" : "text-orange-400"}`}
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            DinoCavity
          </motion.span>
        </motion.a>
        
        {/* Frontend/Backend Toggle */}
        <motion.button
          onClick={toggleMode}
          className={`relative overflow-hidden rounded-full shadow-md flex items-center border border-gray-200 dark:border-gray-700 ${
            isMobile 
              ? "px-2 py-1" // Smaller on mobile
              : "px-3 py-1.5" // Larger on desktop
          }`}
          aria-label={isBackend ? "Switch to frontend mode" : "Switch to backend mode"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background slider */}
          <motion.div 
            className={`absolute top-0 left-0 h-full rounded-full ${
              isBackend ? "bg-blue-500" : "bg-orange-500"
            }`}
            animate={{ 
              x: isBackend ? '100%' : '0%',
              width: '50%'
            }}
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          ></motion.div>
          
          {/* Frontend label */}
          <div className={`relative z-10 flex items-center ${
            isMobile ? "px-1" : "px-2"
          } transition-opacity duration-300 ${
            isBackend ? "opacity-50" : "opacity-100"
          }`}>
            <Layout size={isMobile ? 12 : 14} className="mr-1 text-white" />
            <span className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium text-white whitespace-nowrap`}>
              {isMobile ? "FE" : "Frontend"}
            </span>
          </div>
          
          {/* Backend label */}
          <div className={`relative z-10 flex items-center ${
            isMobile ? "px-1" : "px-2"
          } transition-opacity duration-300 ${
            isBackend ? "opacity-100" : "opacity-50"
          }`}>
            <Code2 size={isMobile ? 12 : 14} className="mr-1 text-white" />
            <span className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium text-white whitespace-nowrap`}>
              {isMobile ? "BE" : "Backend"}
            </span>
          </div>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;