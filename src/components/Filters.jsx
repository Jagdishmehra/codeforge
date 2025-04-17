import React, { useState } from 'react';

const Filters = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onFilterChange({ categories: updatedCategories, priceRange });
  };

  const handlePriceChange = (event) => {
    const newPriceRange = [0, parseInt(event.target.value, 10)];
    setPriceRange(newPriceRange);
    onFilterChange({ categories: selectedCategories, priceRange: newPriceRange });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-base font-medium text-slate-800 mb-4">Product Categories</h3>

      <div className="mb-6">
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="mr-2 accent-green-600"
            />
            <label htmlFor={category} className="text-gray-700">
              {category} <span className="text-gray-500">(10)</span>
            </label>
          </div>
        ))}
      </div>

      <h3 className="text-base font-medium text-slate-800 mb-4">Filter by Price</h3>
      <div>
        <label className="block text-sm text-gray-600 mb-2">$0 - ${priceRange[1]}</label>
        <input
          type="range"
          min="0"
          max="2000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-green-600"
        />
      </div>
    </div>
  );
};

export default Filters;