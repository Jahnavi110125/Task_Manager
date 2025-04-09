// App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import Pagination from './Pagination';
import Progress from './Progress';
import FilterBar from './FilterBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const [filters, setFilters] = useState({
    priority: 'All',
    status: 'All',
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
    setCurrentPage(1); // Go back to first page after adding
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
    setCurrentPage(1);
  };

  const applyFilters = (taskList) => {
    return taskList.filter((task) => {
      const priorityMatch = filters.priority === 'All' || task.priority === filters.priority;
      const statusMatch = filters.status === 'All' || task.status === filters.status;
      return priorityMatch && statusMatch;
    });
  };

  const filteredTasks = applyFilters(tasks);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };  

  return (
    <>
       <h1>Task Manager App</h1>

    <div className='whole'>
      <div className="taskOperations">
        <TaskForm onAdd={addTask} />
      </div>
      <div className='taskDisplay'>
        <h3>Display Tasks</h3>
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <Progress tasks={filteredTasks} />
      <hr />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div className="taskList">
      {currentTasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        currentTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={deleteTask}  onStatusChange={handleStatusChange} />
        ))
      )}
      </div>
      </div>
    </div>
    </>
  );
}

export default App;
