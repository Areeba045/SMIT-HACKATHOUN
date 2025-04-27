import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ onCreateTask }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    }
  };
  
  return (
    <aside className={`flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} bg-sidebar text-white h-full transition-all duration-300 z-10`}>
      <div className="flex items-center justify-between p-4 h-16 border-b border-white/10">
        <div className={`font-bold ${isCollapsed ? 'text-xl' : 'text-2xl'}`}>
          {isCollapsed ? 'SM' : 'SMITApp'}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/70 hover:text-white transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center px-4 py-3 rounded-md transition-all ${
                location.pathname === '/' 
                  ? 'text-white bg-white/10' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl w-6 text-center">📋</span>
              {!isCollapsed && <span className="ml-3 font-medium">Dashboard</span>}
            </Link>
          </li>
          
          <li>
            <button
              onClick={onCreateTask}
              className="w-full flex items-center px-4 py-3 rounded-md transition-all text-white/70 hover:text-white hover:bg-primary-500/20"
            >
              <span className="text-xl w-6 text-center">✚</span>
              {!isCollapsed && <span className="ml-3 font-medium">Create Task</span>}
            </button>
          </li>
          
          <li>
            <Link
              to="/activity"
              className={`flex items-center px-4 py-3 rounded-md transition-all ${
                location.pathname === '/activity'
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl w-6 text-center">📊</span>
              {!isCollapsed && <span className="ml-3 font-medium">Activity</span>}
            </Link>
          </li>
          
          <li>
            <Link
              to="/profile"
              className={`flex items-center px-4 py-3 rounded-md transition-all ${
                location.pathname === '/profile'
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl w-6 text-center">👤</span>
              {!isCollapsed && <span className="ml-3 font-medium">Profile</span>}
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-base font-semibold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="text-sm font-semibold truncate">{user?.name}</div>
              <div className="text-xs text-white/70 truncate">{user?.email}</div>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-white/10 text-white/80 hover:text-white hover:bg-white/15 transition-all font-medium"
        >
          <span className="text-base">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;