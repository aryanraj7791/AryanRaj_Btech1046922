import React from 'react';
import { useDrag } from 'react-dnd';
import { format } from 'date-fns';

const TaskCard = ({ task, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-md mb-3 cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          ×
        </button>
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>
      <div className="mt-2 flex flex-col space-y-1 text-xs text-gray-500">
        <span>Due: {formatDate(task.due_date)}</span>
        <span>Created: {formatDate(task.created_at || task.createdAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;
