import React from 'react';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false 
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={name}
        className="text-sm font-medium text-gray-700 flex items-center"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-0.5">*</span>
        )}
      </label>
      
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          px-3 py-2 rounded-md text-base
          transition-all duration-200
          ${error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:ring-primary-200'
          }
          border focus:outline-none focus:ring-2
        `}
      />
      
      {error && (
        <p className="text-xs text-red-500 -mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;