import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { TaskContext } from '../context/TaskContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ActivityLogs = () => {
  const { activityLogs, loading, fetchActivityLogs } = useContext(TaskContext);
  
  useEffect(() => {
    fetchActivityLogs();
  }, []);
  
  const getActionColor = (action) => {
    switch (action) {
      case 'created':
        return 'bg-green-100 text-green-600';
      case 'updated':
        return 'bg-blue-100 text-blue-600';
      case 'deleted':
        return 'bg-red-100 text-red-600';
      case 'status_changed':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  const getActionIcon = (action) => {
    switch (action) {
      case 'created':
        return '+';
      case 'updated':
        return '✎';
      case 'deleted':
        return '×';
      case 'status_changed':
        return '↻';
      default:
        return '•';
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <Header title="Activity Logs" />
        
        <div className="p-6 max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md">
              {activityLogs.length} activities
            </span>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          ) : activityLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No activity logs yet
              </h3>
              <p className="text-gray-600 max-w-md">
                Activity logs will appear here when you start working with tasks.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div 
                  key={log._id}
                  className="flex p-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0
                      ${getActionColor(log.action)}
                    `}
                  >
                    {getActionIcon(log.action)}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-1">
                      {log.details}
                    </p>
                    <span className="text-xs text-gray-500">
                      {format(new Date(log.createdAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ActivityLogs;