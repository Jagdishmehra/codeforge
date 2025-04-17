import React from 'react';

const SortDropdown = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Showing 1–10 of 60 results</span>
      </div>
      <div>
        <label htmlFor="sort" className="sr-only">
          Sort By
        </label>
        <select
          id="sort"
          onChange={handleSortChange}
          className="text-sm border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="latest">Latest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;