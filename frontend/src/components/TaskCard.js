import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { format } from 'date-fns';

const TaskCard = ({ task, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      <div className="mb-3">
        <p className={`text-gray-600 text-sm break-words ${isExpanded ? '' : 'line-clamp-3'}`}>
          {task.description}
        </p>
        {task.description && task.description.length > 100 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-blue-600 hover:text-blue-800 text-xs mt-1"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      <div className="mt-2 flex flex-col space-y-1 text-xs text-gray-500">
        <span>Due: {formatDate(task.due_date)}</span>
        <span>Created: {formatDate(task.created_at || task.createdAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;