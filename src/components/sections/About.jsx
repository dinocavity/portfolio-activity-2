import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };
  
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Tailwind CSS', level: 90 },
  ];
  
  const languages = [
    { name: 'Filipino', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Chavacano', level: 'Fluent' },
    { name: 'Bisaya', level: 'Fluent' },
  ];
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">About Me</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Get to know me better</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" ref={ref}>
          <div>
            {isInView && (
              <motion.div 
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                <p className="text-gray-700 mb-4">
                  I'm Dion Cedrick Marquez, a Software Engineer based in Zamboanga City, Philippines. 
                  I'm passionate about creating efficient and user-friendly web applications.
                </p>
                <p className="text-gray-700 mb-4">
                  With a Bachelor's degree in Information Technology from Western Mindanao State University, 
                  I've built a strong foundation in software development and continue to expand my skills in modern web technologies.
                </p>
                <p className="text-gray-700 mb-8">
                  Beyond coding, I'm an accomplished archer, earning medals in various competitions including the 
                  ASEAN Youth Archery Championship. I believe that archery has taught me the importance of focus, 
                  patience, and precision – skills that I bring to my development work.
                </p>
                
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">Languages</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {languages.map((language, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 bg-blue-900 rounded-full mr-2"></div>
                        <span className="text-gray-700 mr-2">{language.name}:</span>
                        <span className="text-gray-600 font-medium">{language.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <a href="/marquezcv.pdf" download className="btn-primary inline-block">
                  Download Resume
                </a>
              </motion.div>
            )}
          </div>
          
          <div>
            {isInView && (
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h3 className="text-2xl font-bold mb-4">My Skills</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-blue-900">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-900 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Education</h3>
                  
                  <div className="border-l-2 border-blue-900 pl-6 space-y-8">
                    <div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-900 absolute -ml-[26px]"></div>
                        <h4 className="text-xl font-semibold">Bachelor of Science in Information Technology</h4>
                      </div>
                      <p className="text-gray-600">Western Mindanao State University | 2021 - 2025</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-900 absolute -ml-[26px]"></div>
                        <h4 className="text-xl font-semibold">Accountancy and Business Management</h4>
                      </div>
                      <p className="text-gray-600">Don Pablo Lorenzo Memorial High School | 2017 - 2021</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-900 absolute -ml-[26px]"></div>
                        <h4 className="text-xl font-semibold">Elementary Education</h4>
                      </div>
                      <p className="text-gray-600">San Roque Elementary School | 2009 - 2015</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;