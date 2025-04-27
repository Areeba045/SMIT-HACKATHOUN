import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-md px-3 w-full max-w-[300px] transition-all duration-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-300 border border-transparent">
      <span className="text-gray-500 text-sm mr-2">🔍</span>
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={onChange}
        className="flex-1 border-none bg-transparent py-2 text-sm focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange({ target: { value: '' } })}
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;