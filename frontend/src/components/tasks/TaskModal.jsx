import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../../context/TaskContext";

const colorOptions = [
  { name: "Blue", value: "#4299e1" },
  { name: "Teal", value: "#38b2ac" },
  { name: "Green", value: "#48bb78" },
  { name: "Yellow", value: "#ecc94b" },
  { name: "Orange", value: "#ed8936" },
  { name: "Red", value: "#f56565" },
  { name: "Purple", value: "#9f7aea" },
  { name: "Pink", value: "#ed64a6" },
];

const TaskModal = ({ task, isEdit = false, onClose, onTaskAdded }) => {
  const { addTask, updateTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "open",
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().substr(0, 10)
      : "",
    color: task?.color || "#4299e1",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      tempErrors.title = "Title is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        if (isEdit) {
          await updateTask(task._id, formData);
        } else {
          await addTask(formData);
        }

        setIsSubmitting(false);

        if (onTaskAdded) {
          onTaskAdded();
        } else {
          onClose();
        }
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error saving task:", error);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      >
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-800">
            {isEdit ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            aria-label="Close"
          >
            <span className="text-xl">×</span>
          </button>
        </header>

        <div className="overflow-y-auto flex-grow">
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 space-y-4 sm:space-y-6"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-800
                  ${errors.title ? "border-red-400" : "border-gray-200"}
                  focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300
                `}
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Add details about this task..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={new Date().toISOString().substr(0, 10)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 appearance-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 appearance-none"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex items-center space-x-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleColorSelect(color.value)}
                    className={`
                      w-8 h-8 rounded-full transition-all
                      ${
                        formData.color === color.value
                          ? "ring-2 ring-offset-2 ring-gray-600 transform scale-110"
                          : "hover:scale-110 hover:shadow-md"
                      }
                    `}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting
                  ? isEdit
                    ? "Saving..."
                    : "Creating..."
                  : isEdit
                  ? "Save Changes"
                  : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
