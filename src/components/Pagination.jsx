import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50"
      >
        ◀
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === index + 1
              ? 'bg-green-600 text-white'
              : 'bg-white border border-green-600 text-green-600'
          } hover:bg-green-100`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50"
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;