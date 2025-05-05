import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '',
  hoverable = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        ${hoverable ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.Header = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 border-b border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div 
    className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.displayName = 'Card';

export default Card;
