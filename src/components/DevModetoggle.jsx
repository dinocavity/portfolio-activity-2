import { useEffect, useState } from "react";
import { Layout, Code2 } from "lucide-react";

const DevModeToggle = () => {
  const [backendMode, setBackendMode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Initialize on mount
  useEffect(() => {
    const storedMode = localStorage.getItem("devMode");
    if (storedMode === "backend") {
      setBackendMode(true);
    } else if (storedMode === "frontend") {
      setBackendMode(false);
    } else {
      // Default to frontend mode
      setBackendMode(false);
    }
  }, []);
  
  // Apply theme changes when mode changes
  useEffect(() => {
    if (backendMode === null) return;
    
    const root = document.documentElement;
    if (backendMode) {
      root.classList.add("dark");
      localStorage.setItem("devMode", "backend");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("devMode", "frontend");
    }
  }, [backendMode]);

  // Accessibility announcement for screen readers
  useEffect(() => {
    if (backendMode === null) return;
    
    const announcer = document.createElement('div');
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.textContent = `Switched to ${backendMode ? 'backend' : 'frontend'} mode`;
    
    document.body.appendChild(announcer);
    
    const timer = setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    };
  }, [backendMode]);

  if (backendMode === null) return null;

  return (
    <button
      onClick={() => setBackendMode(!backendMode)}
      className={`relative group overflow-hidden rounded-full shadow-md transition-all duration-300 ${
        isMobile
          ? 'p-1'
          : 'flex items-center p-1'
      }`}
      aria-label={backendMode ? "Switch to frontend mode" : "Switch to backend mode"}
      title={backendMode ? "Switch to frontend mode" : "Switch to backend mode"}
    >
      {/* Decorative outer glow */}
      <div className={`absolute -inset-0.5 rounded-full opacity-20 blur-sm transition-colors duration-300 ${
        backendMode 
          ? 'bg-gradient-to-r from-[#38bdf8] to-[#818cf8]' 
          : 'bg-gradient-to-r from-[#ea580c] to-[#f97316]'
      }`}></div>
      
      {/* Mobile version - just icons */}
      {isMobile ? (
        <>
          {/* Slider background with gradient */}
          <div 
            className={`absolute top-0 left-0 h-full w-1/2 rounded-full transform transition-transform duration-300 ease-in-out ${
              backendMode 
                ? "translate-x-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8]" 
                : "translate-x-0 bg-gradient-to-r from-[#ea580c] to-[#f97316]"
            }`}
          ></div>
          
          {/* Frontend icon container */}
          <div className={`relative z-10 p-2 transition-all duration-300 ${
            backendMode ? "opacity-50" : "opacity-100"
          }`}>
            <Layout size={18} className={backendMode ? "text-blue-300" : "text-white"} />
          </div>
          
          {/* Backend icon container */}
          <div className={`relative z-10 p-2 transition-all duration-300 ${
            backendMode ? "opacity-100" : "opacity-50"
          }`}>
            <Code2 size={18} className={backendMode ? "text-white" : "text-gray-700"} />
          </div>
        </>
      ) : (
        <>
          {/* Slider background with gradient */}
          <div 
            className={`absolute top-0 left-0 h-full w-1/2 rounded-full transform transition-transform duration-300 ease-in-out ${
              backendMode 
                ? "translate-x-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8]" 
                : "translate-x-0 bg-gradient-to-r from-[#ea580c] to-[#f97316]"
            }`}
          ></div>
          
          {/* Frontend tab with text */}
          <div 
            className={`relative z-10 px-3 py-1.5 flex items-center transition-all duration-300 ${
              backendMode ? "opacity-50" : "opacity-100"
            }`}
          >
            <Layout size={16} className={`mr-2 ${backendMode ? "text-blue-300" : "text-white"}`} />
            <span className={`text-sm font-medium ${backendMode ? "text-blue-300" : "text-white"}`}>Frontend</span>
          </div>
          
          {/* Backend tab with text */}
          <div 
            className={`relative z-10 px-3 py-1.5 flex items-center transition-all duration-300 ${
              backendMode ? "opacity-100" : "opacity-50"
            }`}
          >
            <Code2 size={16} className={`mr-2 ${backendMode ? "text-white" : "text-gray-700"}`} />
            <span className={`text-sm font-medium ${backendMode ? "text-white" : "text-gray-700"}`}>Backend</span>
          </div>
        </>
      )}
      
      {/* Focus ring */}
      <span className="absolute inset-0 rounded-full ring-0 focus-visible:ring-2 focus-visible:ring-orange-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2"></span>
    </button>
  );
};

export default DevModeToggle;