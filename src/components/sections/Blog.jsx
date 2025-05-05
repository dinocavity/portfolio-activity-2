import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import blogposts from '../../data/blogposts';

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
  
  // Only show the first 3 blog posts on the home page
  const featuredPosts = blogposts.slice(0, 3);
  
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">Blog</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Thoughts, tutorials and insights</p>
        </div>
        
        <div ref={ref}>
          {isInView && (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredPosts.map((post, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover-lift"
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="h-52 overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 hover:text-blue-900 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex space-x-2">
                        {post.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded"
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
          )}
          
          {blogposts.length > 3 && (
            <div className="text-center mt-12">
              <a href="#" className="btn-outline inline-block">
                View All Posts
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;