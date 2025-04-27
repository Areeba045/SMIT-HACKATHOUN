import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ id, title, color, tasks, count }) => {
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg min-w-[280px] max-w-[280px] h-full md:min-w-[260px] md:max-w-[260px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: color }}
          />
          {title}
        </h3>
        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-md">
          {count}
        </span>
      </div>
      
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 overflow-y-auto p-3 transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-black/[0.02]' : 'bg-transparent'}
              min-h-[100px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300
            `}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
              />
            ))}
            {provided.placeholder}
            
            {tasks.length === 0 && (
              <div className="flex items-center justify-center h-[100px] border-2 border-dashed border-gray-300 rounded-lg mt-3">
                <p className="text-sm text-gray-500">No tasks</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;