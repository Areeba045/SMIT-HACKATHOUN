import React from "react";
import SearchBar from "../common/SearchBar";

const Header = ({ title, onAddTask, searchTerm, setSearchTerm }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 h-16 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {setSearchTerm && (
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
          />
        )}
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="px-4 text-nowrap py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Add Task
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
