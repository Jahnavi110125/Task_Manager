// TaskItem.jsx
import React from 'react';

function TaskItem({ task, onDelete, onStatusChange }) {
  const { id, title, description, priority, status } = task;
  const handleStatusChange = (e) => {
    onStatusChange(task.id, e.target.value);
  };
  return (
    <div className='taskItem'>

        <h4>{title}</h4>
      {description && <p>{description}</p>}
      <p><strong>Priority:</strong> {priority}</p>
      <p><strong>Status:</strong> {status}</p>
      <div className="taskItemButtons">
        <button onClick={() => onDelete(id)}>Delete</button>
        <div>
            <label>Status</label>
            <select value={task.status} onChange={handleStatusChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
      </div>      
    </div>
  );
}

export default TaskItem;
