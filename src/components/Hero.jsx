import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout, Code2 } from "lucide-react";
import FlipImage from "./FlipImage";

const Hero = ({ isBackend, setShowSections }) => {
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
  
  // Determine image size based on screen width
  const getImageSize = () => {
    if (windowWidth < 380) return "w-48 h-48";
    if (windowWidth < 480) return "w-56 h-56";
    if (windowWidth < 768) return "w-64 h-64";
    return "w-72 h-72";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="min-h-screen w-full pt-16 md:pt-20 flex flex-col justify-center px-3 sm:px-4 md:px-6 overflow-hidden">
      {/* Background color based on mode */}
      <div className="absolute inset-0 -z-10 transition-colors duration-500">
        <div className={isBackend ? "bg-blue-900" : "bg-white"}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content - Stacks on mobile, left column on desktop */}
          <div className="text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
            {/* Developer Type Badge */}
            <motion.div 
              className="inline-flex items-center mb-2 sm:mb-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 transition-colors duration-300"
              style={{ 
                borderColor: isBackend ? '#38bdf8' : '#f97316',
                backgroundColor: isBackend ? 'rgba(56, 189, 248, 0.1)' : 'rgba(249, 115, 22, 0.05)'
              }}
              variants={itemVariants}
            >
              {isBackend ? (
                <>
                  <Code2 size={windowWidth < 380 ? 12 : 16} className="mr-1.5 text-blue-400" />
                  <span className={`text-blue-400 font-medium ${windowWidth < 380 ? 'text-xs' : 'text-sm'}`}>
                    Backend Developer
                  </span>
                </>
              ) : (
                <>
                  <Layout size={windowWidth < 380 ? 12 : 16} className="mr-1.5 text-orange-500" />
                  <span className={`text-orange-500 font-medium ${windowWidth < 380 ? 'text-xs' : 'text-sm'}`}>
                    Frontend Developer
                  </span>
                </>
              )}
            </motion.div>
            
            {/* Name */}
            <motion.h1 
              className={`text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 transition-colors duration-300 ${
                isBackend ? "text-white" : "text-gray-800"
              }`}
              variants={itemVariants}
            >
              Dion Cedrick Marquez
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className={`text-base sm:text-lg max-w-lg mx-auto md:mx-0 mb-5 sm:mb-8 transition-colors duration-300 ${
                isBackend ? "text-blue-200" : "text-gray-600"
              }`}
              variants={itemVariants}
            >
              {isBackend 
                ? "Building robust APIs and efficient database architectures with clean, maintainable code."
                : "Crafting beautiful, responsive interfaces with a focus on user experience and modern design."}
            </motion.p>
            
            {/* CTA Button */}
            <motion.button
              onClick={() => setShowSections(true)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md text-white font-medium transition-all duration-300 ${
                isBackend 
                  ? "bg-blue-500 hover:bg-blue-600" 
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <span>View Portfolio</span>
                <motion.span 
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
          
          {/* Profile Image with Flip - Stacks on mobile, right column on desktop */}
          <motion.div 
            className="flex justify-center order-1 md:order-2 mt-10 md:mt-0"
            variants={itemVariants}
          >
            <FlipImage 
              frontImage="/profile/profile1.png"
              backImage="https://media.giphy.com/media/gWVURnPa6iLLi/giphy.gif"
              isBackend={isBackend}
              className={getImageSize()}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;