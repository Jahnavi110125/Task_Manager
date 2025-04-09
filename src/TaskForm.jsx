// TaskForm.jsx
import React, { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status,
    };

    onAdd(newTask);
    setTitle('');
    setDescription('');
    setPriority('Low');
    setStatus('Pending');
  };

  return (
    <form className='taskAddForm' onSubmit={handleSubmit}>
        <h3>Adding Task</h3>
    <div className="formElements">
    <label>Task Title</label>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Task Description</label>
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Task Priority</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <label>Task Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
