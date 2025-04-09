// Progress.jsx
import React from 'react';

function Progress({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'Completed').length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className='progressTasks'>
      <p><strong>Total Tasks:</strong> {total}</p>
      <p><strong>Completed:</strong> {completed}</p>
      <p><strong>Progress:</strong> {percentage}%</p>
    </div>
  );
}

export default Progress;
