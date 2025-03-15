import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout, Code2, ArrowUp, Download, Instagram, Github, Mail } from "lucide-react";

const AboutMe = ({ isBackend, setShowSections }) => {
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
  
  // Different skills for frontend and backend modes
  const frontendSkills = [
    "React", "JavaScript", "CSS", "Tailwind", 
    "UI/UX Design", "Responsive Design", "Animation"
  ];
  
  const backendSkills = [
    "Node.js", "Express", "MongoDB", "SQL", 
    "API Design", "Authentication", "Cloud Deployment"
  ];

  // Determine image size based on screen width
  const getImageSize = () => {
    if (windowWidth < 340) return "w-40 h-40";
    if (windowWidth < 400) return "w-48 h-48";
    if (windowWidth < 640) return "w-56 h-56";
    return "w-56 h-56";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <motion.section 
      className={`min-h-screen pt-16 md:pt-20 pb-16 px-3 sm:px-4 md:px-6 transition-colors duration-500 ${
        isBackend ? "bg-blue-900 text-white" : "bg-white text-gray-800"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image and Contact Info */}
          <motion.div 
            className="md:col-span-4 flex flex-col items-center md:items-start"
            variants={containerVariants}
          >
            {/* Profile Image */}
            <motion.div 
              className={`relative ${getImageSize()} mb-6`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`absolute inset-0 p-1 rounded-lg ${
                isBackend ? "bg-blue-500" : "bg-orange-500"
              }`}>
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <motion.img
                    src="/profile/profile.png"
                    alt="Profile"
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isBackend ? "brightness-90" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Social Links */}
            <motion.h3 
              className={`text-base sm:text-lg font-bold mb-3 transition-colors duration-300 ${
                isBackend ? "text-blue-300" : "text-orange-500"
              }`}
              variants={itemVariants}
            >
              Connect
            </motion.h3>
            <motion.div 
              className="flex space-x-5 mb-6"
              variants={itemVariants}
            >
              <motion.a 
                href="https://www.instagram.com/l.marquez.dion" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className={`${
                  isBackend ? "text-blue-300 hover:text-blue-200" : "text-orange-500 hover:text-orange-400"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={windowWidth < 380 ? 18 : 20} />
              </motion.a>
              <motion.a 
                href="https://github.com/dinocavity" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`${
                  isBackend ? "text-blue-300 hover:text-blue-200" : "text-orange-500 hover:text-orange-400"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={windowWidth < 380 ? 18 : 20} />
              </motion.a>
              <motion.a 
                href="mailto:your.asurakirei@gmail.com"
                aria-label="Email" 
                className={`${
                  isBackend ? "text-blue-300 hover:text-blue-200" : "text-orange-500 hover:text-orange-400"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={windowWidth < 380 ? 18 : 20} />
              </motion.a>
            </motion.div>
            
            {/* Resume Button (Mobile) */}
            <motion.a
              href="/profile/CURRICULUM VITAE- MARQUEZ.pdf"
              download
              className={`md:hidden flex items-center space-x-2 px-4 py-2 rounded-md shadow-md text-white transition-colors duration-300 ${
                isBackend ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"
              }`}
              aria-label="Download Resume"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span>Resume</span>
            </motion.a>
          </motion.div>

          {/* Bio and Skills */}
          <motion.div 
            className="md:col-span-8"
            variants={containerVariants}
          >
            {/* Developer Type */}
            <motion.div 
              className="flex items-center mb-3"
              variants={itemVariants}
            >
              {isBackend ? (
                <>
                  <Code2 size={windowWidth < 380 ? 18 : 20} className="text-blue-400 mr-2" />
                  <h2 className={`${windowWidth < 380 ? 'text-xl' : 'text-2xl'} font-bold text-blue-300`}>
                    Backend Development
                  </h2>
                </>
              ) : (
                <>
                  <Layout size={windowWidth < 380 ? 18 : 20} className="text-orange-500 mr-2" />
                  <h2 className={`${windowWidth < 380 ? 'text-xl' : 'text-2xl'} font-bold text-orange-500`}>
                    Frontend Development
                  </h2>
                </>
              )}
            </motion.div>
            
            {/* Divider */}
            <motion.div 
              className={`w-16 h-1 mb-4 ${
                isBackend ? "bg-blue-500" : "bg-orange-500"
              }`}
              variants={itemVariants}
            ></motion.div>
            
            {/* Bio */}
            <motion.p 
              className={`mb-4 text-sm sm:text-base ${
                isBackend ? "text-blue-100" : "text-gray-600"
              }`}
              variants={itemVariants}
            >
              {isBackend
                ? "I build robust server-side applications with a focus on performance and scalability. My expertise includes API development, database architecture, and secure authentication systems."
                : "I specialize in crafting beautiful, responsive interfaces with a focus on user experience. My approach combines clean design principles with efficient code to create engaging digital experiences."
              }
            </motion.p>
            <motion.p 
              className={`mb-6 text-sm sm:text-base ${
                isBackend ? "text-blue-100" : "text-gray-600"
              }`}
              variants={itemVariants}
            >
              {isBackend
                ? "With experience in various backend technologies, I create efficient, maintainable code that powers seamless user experiences."
                : "With a keen eye for detail, I transform designs into pixel-perfect interfaces that are both beautiful and functional."
              }
            </motion.p>
            
            {/* Skills */}
            <motion.h3 
              className={`text-base sm:text-lg font-bold mb-3 flex items-center ${
                isBackend ? "text-blue-300" : "text-orange-500"
              }`}
              variants={itemVariants}
            >
              {isBackend ? (
                <>
                  <Code2 size={windowWidth < 380 ? 14 : 16} className="mr-2" />
                  <span>Backend Technologies</span>
                </>
              ) : (
                <>
                  <Layout size={windowWidth < 380 ? 14 : 16} className="mr-2" />
                  <span>Frontend Technologies</span>
                </>
              )}
            </motion.h3>
            <motion.div 
              className="flex flex-wrap gap-1.5 sm:gap-2 mb-6"
              variants={itemVariants}
            >
              {(isBackend ? backendSkills : frontendSkills).map((skill, index) => (
                <motion.span 
                  key={index}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded border transition-all duration-300 ${
                    isBackend 
                      ? "border-blue-700 text-blue-200" 
                      : "border-orange-300 text-gray-700"
                  }`}
                  whileHover={{ 
                    y: -5, 
                    borderColor: isBackend ? "#38bdf8" : "#f97316",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.2 + (index * 0.05),
                      duration: 0.5
                    }
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Resume Button (Desktop) */}
            <motion.a
              href="/profile/CURRICULUM VITAE- MARQUEZ.pdf"
              download
              className={`hidden md:inline-flex items-center space-x-2 px-6 py-2 rounded-md shadow-md text-white transition-colors duration-300 ${
                isBackend ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"
              }`}
              aria-label="Download Resume"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span>Resume</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => setShowSections(false)}
        className={`fixed bottom-6 right-6 p-2 sm:p-3 rounded-full shadow-lg text-white transition-colors duration-300 ${
          isBackend ? "bg-blue-500 hover:bg-blue-600" : "bg-orange-500 hover:bg-orange-600"
        }`}
        aria-label="Back to top"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={windowWidth < 380 ? 16 : 18} />
      </motion.button>
    </motion.section>
  );
};

export default AboutMe;