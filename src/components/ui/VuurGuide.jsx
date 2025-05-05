import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VuurGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [typing, setTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const messages = [
    "@👋 Hello! I'm Vuur, your AI guide. Click me for tips on navigating this portfolio.",
    "@Use the progress bar at the top to see how far you've explored.",
    "@Check out the Projects section to see my recent work and technical skills.",
    "@Don't forget to visit the Blog section for insights and tutorials.",
    "@Need to get in touch? The Contact form is fully functional - try it out!",
    "@You can download my resume from the About section for more details."
  ];
  
  useEffect(() => {
    if (!hasInteracted) {
      // Show initial greeting after a short delay
      const initialTimer = setTimeout(() => {
        setIsOpen(true);
        typeWriter(messages[0]);
      }, 4000);
      
      return () => clearTimeout(initialTimer);
    }
  }, [hasInteracted]);
  
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        const nextMessage = (currentMessage + 1) % messages.length;
        setCurrentMessage(nextMessage);
        typeWriter(messages[nextMessage]);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen, currentMessage, messages]);
  
  const typeWriter = (text) => {
    setTyping(true);
    setCurrentText('');
    
    let i = 0;
    const speed = 30; // typing speed in ms
    
    const type = () => {
      if (i < text.length) {
        setCurrentText(prev => prev + text.charAt(i));
        i++;
        setTimeout(type, speed);
      } else {
        setTyping(false);
      }
    };
    
    type();
  };
  
  const handleClick = () => {
    setHasInteracted(true);
    if (!isOpen) {
      setIsOpen(true);
      typeWriter(messages[currentMessage]);
    } else {
      setIsOpen(false);
    }
  };
  
  const handleNextTip = (e) => {
    e.stopPropagation();
    const nextMessage = (currentMessage + 1) % messages.length;
    setCurrentMessage(nextMessage);
    typeWriter(messages[nextMessage]);
  };
  
  return (
    <div className="vuur-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="vuur-bubble"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-700 pr-6">
              {currentText}
              {typing && <span className="inline-block w-2 h-4 bg-primary-color/70 ml-1 animate-pulse"></span>}
            </p>
            <button 
              onClick={handleNextTip}
              className="absolute top-2 right-2 text-gray-400 hover:text-primary-color transition-colors p-1"
              title="Next tip"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        onClick={handleClick}
        className="vuur-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default VuurGuide;