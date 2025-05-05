import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Initialize particles
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      
      // Set canvas dimensions
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();
      
      // Particle class
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.opacity = Math.random() * 0.5 + 0.1;
          this.color = '#1e40af'; // Primary color
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
          }
          
          if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
          }
        }
        
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.fill();
        }
      }
      
      // Create particles array
      const particlesArray = [];
      const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
      
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
      
      // Connect particles with lines
      function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              opacityValue = 1 - (distance / 150);
              ctx.strokeStyle = 'rgba(30, 64, 175, ' + opacityValue * 0.15 + ')';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        
        connect();
        animationFrameId = requestAnimationFrame(animate);
      }
      
      animate();
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-1/2">
            {isVisible && (
              <>
                <motion.div 
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="bg-white/30 inline-block px-5 py-2 rounded-full backdrop-blur-sm mb-4"
                >
                  <span className="text-primary-color font-medium">Software Engineer</span>
                </motion.div>
                
                <motion.h1 
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="text-5xl sm:text-7xl font-bold mb-6"
                >
                  I'm <span className="text-gradient">Dion Cedrick</span> Marquez
                </motion.h1>
                
                <motion.p 
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="text-gray-700 text-lg mb-10 max-w-xl"
                >
                  A passionate programmer dedicated to creating exceptional digital experiences through clean code and innovative solutions. I specialize in building modern web applications that solve real-world problems.
                </motion.p>
                
                <motion.div 
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="flex flex-wrap gap-5"
                >
                  <a href="#contact" className="btn-primary">
                    <span className="relative z-10">Let's Talk</span>
                  </a>
                  <a href="#projects" className="btn-outline">
                    View Portfolio
                  </a>
                </motion.div>
                
                <motion.div
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="mt-12 flex items-center"
                >
                  <div className="flex mr-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white overflow-hidden -ml-${i > 1 ? 4 : 0}`}>
                        <img src={`/assets/images/testimonial${i}.jpg`} alt={`Client ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold">20+ Completed Projects</div>
                    <div className="text-sm text-gray-600">Across multiple platforms</div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.4, 
                  ease: [0.215, 0.61, 0.355, 1] 
                }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary-color via-primary-light to-accent-color rounded-full opacity-10 blur-2xl animate-pulse"></div>
                <div className="relative">
                  <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-2xl bg-white p-2 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src="/hero1.jpg" 
                        alt="Dion Cedrick Marquez" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  
                  {/* Experience badge */}
                  <motion.div 
                    className="absolute -right-8 top-10 bg-white rounded-xl px-4 py-2 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-color/10 flex items-center justify-center rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-color" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">WMSU</div>
                        <div className="text-primary-color font-bold">BSIT</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Skill badge */}
                  <motion.div 
                    className="absolute -left-10 top-2/3 bg-white rounded-xl px-4 py-2 shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-accent-color/10 flex items-center justify-center rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-color" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Full Stack Dev</div>
                        <div className="text-accent-color font-bold">React & Node.js</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Tech icons with dynamic animations */}
                  {[
                    { icon: 'js', top: '-10%', left: '15%', delay: 1.6 },
                    { icon: 'react', top: '10%', right: '-15%', delay: 1.8 },
                    { icon: 'node', bottom: '-5%', right: '20%', delay: 2 },
                    { icon: 'python', bottom: '15%', left: '-10%', delay: 2.2 }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: tech.delay, duration: 0.5, type: 'spring' }}
                      style={{ 
                        top: tech.top || 'auto', 
                        left: tech.left || 'auto',
                        right: tech.right || 'auto',
                        bottom: tech.bottom || 'auto'
                      }}
                    >
                      {tech.icon === 'js' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                          <path fill="#F0DB4F" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                        </svg>
                      )}
                      {tech.icon === 'react' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                          <path fill="#61DAFB" d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 0 0-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 0 0-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 0 1 3.233-.501 24.847 24.847 0 0 1 2.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zm16.616 16.89c-1.16.678-2.999.806-5.207.328l-.471-.119-.133.468a23.57 23.57 0 0 0-.61 3.785l-.019.235-.195.134a23.913 23.913 0 0 0-2.96 2.414l-.349.34-.349-.34c-2.516-2.572-3.514-4.964-2.658-6.455.856-1.483 3.335-1.85 6.362-.958l.472.119.134-.468c.548-1.917 1.294-3.73 2.189-5.298l.153-.23.229-.144c2.568-1.596 4.664-2.1 5.875-1.382 1.261.748 1.653 2.92.738 6.087l-.118.461.461.115c3.345.85 5.444 2.407 5.444 4.198 0 1.798-2.095 3.382-5.444 4.243l-.461.118-.117-.461c-.646-2.639-1.738-4.992-3.113-6.949l-.165-.248.165-.248c1.368-2.063 2.421-4.509 2.989-7.093l.09-.396.385-.141c2.006-.738 3.532-.802 4.388-.29.837.502 1.264 1.865.852 3.7-.426 1.894-1.647 4.008-3.131 5.878z"/>
                        </svg>
                      )}
                      {tech.icon === 'node' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                          <path fill="#539E43" d="M12 21.985c-.275 0-.532-.074-.766-.211l-2.437-1.442c-.365-.203-.182-.276-.072-.314.487-.169.585-.207 1.102-.501.056-.027.129-.011.186.027l1.871 1.12c.074.036.166.036.232 0l7.292-4.215c.074-.044.115-.127.115-.232v-8.429c0-.099-.044-.186-.115-.229l-7.292-4.201c-.074-.044-.171-.044-.24 0l-7.287 4.201c-.074.044-.115.13-.115.229v8.429c0 .099.044.182.115.229l1.993 1.153c1.086.54 1.75-.096 1.75-.739v-8.313c0-.118.094-.21.213-.21h.915c.114 0 .213.092.213.21v8.314c0 1.449-.788 2.283-2.156 2.283-.422 0-.751 0-1.675-.454l-1.906-1.096C.382 16.553 0 15.834 0 15.085v-8.429c0-.749.382-1.463 1.006-1.832l7.292-4.208c.363-.205.846-.205 1.205 0l7.292 4.208c.624.369 1.006 1.083 1.006 1.832v8.429c0 .749-.382 1.463-1.006 1.832l-7.292 4.215c-.234.137-.497.211-.766.211zm2.196-8.337c-3.168 0-3.83-1.456-3.83-2.684 0-.118.094-.21.213-.21h.939c.104 0 .192.075.21.178.142.963.556 1.447 2.468 1.447 1.517 0 2.156-.342 2.156-1.147 0-.465-.182-.804-2.549-1.036-1.984-.192-3.211-.633-3.211-2.214 0-1.461 1.238-2.332 3.312-2.332 2.328 0 3.474.808 3.621 2.546.006.059-.016.114-.052.159-.033.042-.079.067-.127.067h-.944c-.099 0-.186-.074-.207-.175-.23-1.025-.793-1.353-2.29-1.353-1.692 0-1.891.586-1.891 1.028 0 .533.231.689 2.468.994 2.218.302 3.292.73 3.292 2.24-.005 1.582-1.326 2.488-3.587 2.488z"/>
                        </svg>
                      )}
                      {tech.icon === 'python' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                          <path fill="#3776AB" d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
                        </svg>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.5 }}
      >
        <p className="text-gray-600 mb-2">Scroll Down</p>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative">
          <motion.div 
            className="w-1.5 h-1.5 bg-gray-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;