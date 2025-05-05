import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogposts from '../data/blogposts';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    const foundPost = blogposts.find(post => post.id === parseInt(id));
    setPost(foundPost);
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-16 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Link to="/#blog" className="btn-primary inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 md:px-8 py-16">
      <Link to="/#blog" className="inline-flex items-center text-blue-900 mb-8 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Blog
      </Link>
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-4">{post.date}</span>
            <span className="mr-4">·</span>
            <span>{post.readTime} min read</span>
          </div>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </header>
        
        <div className="prose prose-lg max-w-none">
          {post.content.map((section, index) => (
            <section key={index} className="mb-8">
              {section.heading && (
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              )}
              <p className="mb-4">{section.text}</p>
              {section.image && (
                <figure className="my-6">
                  <img 
                    src={section.image} 
                    alt={section.imageAlt || 'Blog image'} 
                    className="w-full rounded-lg shadow-sm"
                  />
                  {section.imageCaption && (
                    <figcaption className="text-sm text-gray-500 mt-2 text-center">
                      {section.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;