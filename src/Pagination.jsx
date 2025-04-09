// Pagination.jsx
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='pagination'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &larr;
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
       &rarr;
      </button>
    </div>
  );
}

export default Pagination;
