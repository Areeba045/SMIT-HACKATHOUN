import React, { useContext, useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';

// Components
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import TaskColumn from '../components/tasks/TaskColumn';
import TaskModal from '../components/tasks/TaskModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { 
    tasks, 
    loading, 
    getTasksByStatus,
    moveTask, 
    fetchTasks 
  } = useContext(TaskContext);
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredTasks(filtered);
    }
  }, [searchTerm, tasks]);
  
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    const statusMap = {
      'open-column': 'open',
      'in-progress-column': 'in-progress',
      'review-column': 'review',
      'done-column': 'done'
    };
    
    if (destination.droppableId !== source.droppableId) {
      try {
        await moveTask(draggableId, statusMap[destination.droppableId]);
        fetchTasks();
      } catch (error) {
        console.error('Error moving task:', error);
      }
    }
  };
  
  const openTasksByStatus = getTasksByStatus('open').filter(task => 
    searchTerm.trim() === '' || 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const inProgressTasksByStatus = getTasksByStatus('in-progress').filter(task => 
    searchTerm.trim() === '' || 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const reviewTasksByStatus = getTasksByStatus('review').filter(task => 
    searchTerm.trim() === '' || 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const doneTasksByStatus = getTasksByStatus('done').filter(task => 
    searchTerm.trim() === '' || 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar onCreateTask={() => setIsTaskModalOpen(true)} />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header 
          title="Task Dashboard" 
          onAddTask={() => setIsTaskModalOpen(true)} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <LoadingSpinner />
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-1 p-6 gap-6 overflow-x-auto">
              <TaskColumn 
                id="open-column"
                title="Open" 
                color="#38b2ac"
                tasks={openTasksByStatus} 
                count={openTasksByStatus.length}
              />
              
              <TaskColumn 
                id="in-progress-column"
                title="In Progress" 
                color="#4299e1"
                tasks={inProgressTasksByStatus} 
                count={inProgressTasksByStatus.length}
              />
              
              <TaskColumn 
                id="review-column"
                title="Review" 
                color="#ecc94b"
                tasks={reviewTasksByStatus} 
                count={reviewTasksByStatus.length}
              />
              
              <TaskColumn 
                id="done-column"
                title="Done" 
                color="#9f7aea"
                tasks={doneTasksByStatus} 
                count={doneTasksByStatus.length}
              />
            </div>
          </DragDropContext>
        )}
      </main>
      
      {isTaskModalOpen && (
        <TaskModal 
          onClose={() => setIsTaskModalOpen(false)} 
          onTaskAdded={() => {
            fetchTasks();
            setIsTaskModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;