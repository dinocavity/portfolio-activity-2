import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Experience = () => {
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
  
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech One Global',
      location: 'Uno Aberos Building, Rosie Street, Sri Lanka',
      period: '2033',
      description: 'Led development teams in creating enterprise-level applications, mentored junior developers, and implemented best practices for code quality and efficiency.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Project Management']
    },
    {
      title: 'Software Engineer',
      company: 'Inscale One Company',
      location: 'Building A, Macapagal Ave., Davao City',
      period: '2026',
      description: 'Developed and maintained web applications, collaborated with cross-functional teams, and implemented responsive design principles for optimal user experience.',
      skills: ['JavaScript', 'React', 'Express.js', 'SQL', 'Git']
    },
    {
      title: 'Technology Support',
      company: 'Sample Tech Support Inc.',
      location: 'Miguel Ramos Ave., Cebu City',
      period: '2025',
      description: 'Provided technical assistance to clients, diagnosed and resolved software issues, and documented solutions for knowledge base.',
      skills: ['Customer Service', 'Troubleshooting', 'IT Support', 'Documentation']
    },
    {
      title: 'IT Intern',
      company: 'Western Mindanao State University',
      location: 'Zamboanga City',
      period: 'November 2023',
      description: 'Assisted in network administration, provided technical support to staff and faculty, and helped maintain university IT systems.',
      skills: ['Network Administration', 'Technical Support', 'System Maintenance']
    },
  ];
  
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">Experience</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">My professional journey</p>
        </div>
        
        <div className="max-w-4xl mx-auto" ref={ref}>
          <div className="relative border-l-2 border-blue-900 pl-8 ml-4">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="mb-12 relative"
              >
                {isInView && (
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-white p-6 rounded-lg shadow-md hover-lift"
                  >
                    <div className="absolute w-4 h-4 bg-blue-900 rounded-full -left-[41px] top-8"></div>
                    <span className="absolute -left-28 top-8 text-gray-500 font-medium">{exp.period}</span>
                    
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <div className="flex flex-wrap items-center text-gray-600 mb-4">
                      <span className="font-medium text-blue-900">{exp.company}</span>
                      <span className="mx-2">•</span>
                      <span>{exp.location}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;