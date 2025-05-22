import React, { useState } from "react";

const FilterComponent = () => {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    // notify parent
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6 w-[20%] max-w-xs mx-auto">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter Jobs</h2>
    
    <div className="flex flex-col gap-4">
      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="e.g. New York"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      {/* Industry */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
        <select
          name="industry"
          value={filters.industry}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select industry</option>
          <option value="tech">Technology</option>
          <option value="finance">Finance</option>
          <option value="health">Healthcare</option>
          <option value="education">Education</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
  
      {/* Salary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
        <select
          name="salary"
          value={filters.salary}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select range</option>
          <option value="0-50000">0 - 50,000</option>
          <option value="50000-100000">50,000 - 100,000</option>
          <option value="100000-150000">100,000 - 150,000</option>
          <option value="150000+">150,000+</option>
        </select>
      </div>
    </div>
  </div>
  

  );
};

export default FilterComponent;
