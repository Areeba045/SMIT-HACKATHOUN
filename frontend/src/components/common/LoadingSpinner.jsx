import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return 'w-6 h-6 border-2';
      case 'large':
        return 'w-12 h-12 border-4';
      case 'medium':
      default:
        return 'w-9 h-9 border-3';
    }
  };
  
  const spinner = (
    <div 
      className={`
        ${getSizeClass(size)}
        rounded-full
        border-primary-200
        border-t-primary-600
        animate-spin
      `}
    />
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;