import React from 'react';

const Button = ({ 
  children, 
  primary, 
  fullWidth,
  small,
  disabled,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    disabled:transform-none disabled:shadow-none
    ${small ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'}
    ${fullWidth ? 'w-full' : 'w-auto'}
  `;
  
  const primaryClasses = `
    bg-primary-600 text-white
    hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-md
    focus:ring-primary-500
    active:bg-primary-800 active:translate-y-0 active:shadow-sm
  `;
  
  const secondaryClasses = `
    bg-white text-gray-800 border border-gray-300
    hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm
    focus:ring-gray-200
    active:bg-gray-100 active:translate-y-0 active:shadow-none
  `;
  
  const classes = `
    ${baseClasses}
    ${primary ? primaryClasses : secondaryClasses}
    ${className}
  `;
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;