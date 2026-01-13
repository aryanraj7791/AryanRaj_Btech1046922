import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onDrop, onDelete }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 border-blue-300';
      case 'completed':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[280px] mx-2 rounded-lg border-2 p-4 ${
        isOver ? 'bg-opacity-80' : ''
      } ${getStatusColor(status)}`}
    >
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        {getStatusLabel(status)} ({tasks.length})
      </h2>
      <div className="space-y-3 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={onDelete} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No tasks in this column
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
