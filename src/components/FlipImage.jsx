import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw } from 'lucide-react';

// A responsive image flip component that works across browsers using Framer Motion
const FlipImage = ({ frontImage, backImage, isBackend, className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Track screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const toggleFlip = () => setIsFlipped(!isFlipped);
  
  // Determine button size based on screen width and container size
  const getButtonSize = () => {
    // Extract numeric width from className (e.g., "w-48" -> 48)
    const widthClass = className.match(/w-(\d+)/);
    const width = widthClass ? parseInt(widthClass[1]) : 64;
    
    if (width <= 48 || windowWidth < 340) return { size: 12, padding: "p-1", bottom: "bottom-1", right: "right-1" };
    if (width <= 64 || windowWidth < 480) return { size: 14, padding: "p-1.5", bottom: "bottom-2", right: "right-2" };
    return { size: 16, padding: "p-2", bottom: "bottom-3", right: "right-3" };
  };
  
  const { size, padding, bottom, right } = getButtonSize();
  
  return (
    <div className={`relative ${className}`}>
      {/* Border color based on mode */}
      <div className={`absolute inset-0 rounded-full p-1 ${
        isBackend ? "bg-blue-500" : "bg-orange-500"
      }`}>
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <AnimatePresence initial={false}>
            {!isFlipped ? (
              // Front image
              <motion.div 
                key="front"
                className="absolute inset-0 w-full h-full"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={frontImage}
                  alt="Front Image"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              // Back image
              <motion.div 
                key="back"
                className="absolute inset-0 w-full h-full"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: -90 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={backImage}
                  alt="Back Image"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Toggle button */}
      <motion.button
        onClick={toggleFlip}
        className={`absolute ${bottom} ${right} ${padding} rounded-full shadow-md z-10 text-white ${
          isBackend ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"
        }`}
        aria-label="Toggle image"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <RotateCw size={size} />
      </motion.button>
    </div>
  );
};

export default FlipImage;