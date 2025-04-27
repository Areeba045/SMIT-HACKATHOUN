import React, { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { format, isPast, isToday } from "date-fns";
import { TaskContext } from "../../context/TaskContext";
import TaskModal from "./TaskModal";

const TaskCard = ({ task, index }) => {
  const { deleteTask } = useContext(TaskContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task._id);
    }
    setIsMenuOpen(false);
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;

    const dueDate = new Date(task.dueDate);

    if (isPast(dueDate) && !isToday(dueDate)) {
      return "overdue";
    } else if (isToday(dueDate)) {
      return "today";
    } else {
      return "upcoming";
    }
  };

  const dueDateStatus = getDueDateStatus();

  const getDueDateClasses = (status) => {
    const baseClasses = "text-xs font-medium px-2 py-1 rounded-md inline-block";
    switch (status) {
      case "overdue":
        return `${baseClasses} bg-red-100 text-red-600`;
      case "today":
        return `${baseClasses} bg-yellow-100 text-yellow-600`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-600`;
    }
  };

  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              bg-white rounded-lg shadow-sm p-3 mb-3
              border-l-4 transition-all duration-200
              ${snapshot.isDragging ? "shadow-md rotate-1 scale-102 z-10" : ""}
              hover:shadow-md hover:-translate-y-1
            `}
            style={{
              borderLeftColor: task.color,
              ...provided.draggableProps.style,
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-semibold text-gray-900 mr-2 break-words">
                {task.title}
              </h4>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-800 transition-colors p-1"
                >
                  ⋮
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden w-32 z-10">
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {task.description && (
              <p className="text-xs text-gray-600 mb-3">
                {task.description.length > 100
                  ? `${task.description.substring(0, 100)}...`
                  : task.description}
              </p>
            )}

            {task.dueDate && (
              <div className={getDueDateClasses(dueDateStatus)}>
                Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
              </div>
            )}
          </div>
        )}
      </Draggable>

      {isEditModalOpen && (
        <TaskModal
          task={task}
          isEdit={true}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
