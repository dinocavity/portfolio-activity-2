import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import blogposts from '../../data/blogposts';

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const indexOfLastPost = indexOfFirstPost + postsPerPage;
  const totalPages = Math.ceil(blogposts.length / postsPerPage);
  
  // Get current posts to display
  const currentPosts = blogposts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Handle page changes
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top of blog section when changing pages
      document.getElementById('blog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      document.getElementById('blog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">Blog</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Thoughts, tutorials and insights</p>
        </div>
        
        <div ref={ref}>
          {isInView && (
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPage} // Re-render animation when page changes
                variants={container}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentPosts.map((post, index) => (
                  <motion.div 
                    key={post.id} 
                    variants={item}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover-lift card-shadow"
                  >
                    <Link to={`/blog/${post.id}`} className="block">
                      <div className="h-52 overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/600x400/3b82f6/ffffff?text=${encodeURIComponent(post.title)}`;
                          }}
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime} min read</span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 hover:text-blue-900 transition-colors font-heading">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="bg-blue-50 text-blue-900 text-xs px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
          
          {blogposts.length > postsPerPage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col items-center mt-16 space-y-4"
            >
              {/* Pagination controls */}
              <div className="flex justify-center space-x-2">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-blue-900 border border-blue-900 hover:bg-blue-50 hover:shadow-md'
                  }`}
                  aria-label="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="hidden md:flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentPage === i + 1
                          ? 'bg-blue-900 text-white shadow-md' 
                          : 'bg-white text-blue-900 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md'
                      }`}
                      aria-label={`Page ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <div className="flex md:hidden items-center px-4">
                  <span className="text-gray-600 font-medium">
                    {currentPage} / {totalPages}
                  </span>
                </div>
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-blue-900 border border-blue-900 hover:bg-blue-50 hover:shadow-md'
                  }`}
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* On mobile, show View All button as an alternative */}
              <div className="block md:hidden">
                <button 
                  onClick={() => goToPage(1)} 
                  className="btn-outline inline-flex items-center"
                >
                  <span>View All Posts</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
