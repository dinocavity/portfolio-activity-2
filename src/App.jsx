import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";

function App() {
  const [isBackend, setIsBackend] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  
  // Fix for mobile viewport height issues
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);
  
  // Initialize theme from localStorage
  useEffect(() => {
    // Get mode from localStorage
    const storedMode = localStorage.getItem("devMode");
    
    if (storedMode === "backend") {
      setIsBackend(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsBackend(false);
      document.documentElement.classList.remove("dark");
    }
    
    // Preload images to prevent layout shifts
    const imageUrls = [
      '/profile/profile1.png', 
      '/profile/profile.png'
    ];
    
    // Preload images
    const preloadImages = imageUrls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; 
      });
    });
    
    // Wait for minimum time and image loading
    Promise.all([
      ...preloadImages,
      new Promise(resolve => setTimeout(resolve, 800))
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  // Variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  // Simple loading screen
  if (loading) {
    return (
      <div 
        className={`fixed inset-0 flex items-center justify-center ${
          isBackend ? "bg-blue-900" : "bg-white"
        }`}
        style={{ height: viewportHeight }}
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className={`w-12 sm:w-16 h-12 sm:h-16 border-3 sm:border-4 border-t-transparent rounded-full mx-auto mb-4 ${
              isBackend ? "border-blue-500" : "border-orange-500"
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.p 
            className={`text-sm sm:text-base ${isBackend ? "text-blue-300" : "text-orange-500"}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ minHeight: viewportHeight }}>
      <Header isBackend={isBackend} setIsBackend={setIsBackend} />
      
      <AnimatePresence mode="wait">
        {!showSections ? (
          <motion.div
            key="hero"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
            style={{ minHeight: viewportHeight }}
          >
            <Hero isBackend={isBackend} setShowSections={setShowSections} />
          </motion.div>
        ) : (
          <motion.div
            key="about"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
            style={{ minHeight: viewportHeight }}
          >
            <AboutMe isBackend={isBackend} setShowSections={setShowSections} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;