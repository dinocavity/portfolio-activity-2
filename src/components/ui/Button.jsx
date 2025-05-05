import { forwardRef } from 'react';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:opacity-90',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  outline: 'border-2 border-blue-900 text-blue-900 bg-transparent hover:bg-blue-50',
  ghost: 'bg-transparent text-blue-900 hover:bg-blue-50'
};

const buttonSizes = {
  sm: 'text-sm px-3 py-1',
  md: 'px-4 py-2',
  lg: 'text-lg px-6 py-3'
};

const Button = forwardRef(({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        ${buttonVariants[variant]} 
        ${buttonSizes[size]} 
        rounded-md font-medium transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:-translate-y-1 hover:shadow-md'} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;