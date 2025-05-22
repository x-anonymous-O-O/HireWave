import React, { useContext, useState } from 'react';
import axios from 'axios';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/uri";

const CreateJobForm = ({ companyId, createdBy }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirement: [],
    salary: "",
    location: "",
    jobType: "",
    position: "",
    experience: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'requirement') {
      setJobData({
        ...jobData,
        [name]: value.split(",").map((item) => item.trim()), // Converts comma-separated string to an array
      });
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, {
        ...jobData,
        companyId: companyId,
        created_by: createdBy,
      }, {
        withCredentials: true,
      });
      console.log("Job created: ", res);
      alert("Job created successfully");
    } catch (error) {
      console.error("Failed to create job:", error);
      alert("Failed to create job");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800">Create New Job</h3>
      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={jobData.title}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Enter job title"
          />
        </div>
        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={jobData.description}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Enter job description"
          />
        </div>
        {/* Job Requirement */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (comma separated)</label>
          <input
            type="text"
            name="requirement"
            onChange={handleChange}
            value={jobData.requirement.join(", ")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Enter job requirements"
          />
        </div>
        {/* Job Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            value={jobData.location}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Location"
          />
        </div>
        {/* Job Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
          <select
            name="jobType"
            onChange={handleChange}
            value={jobData.jobType}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        {/* Job Position */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <input
            type="number"
            name="position"
            onChange={handleChange}
            value={jobData.position}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Number of positions"
          />
        </div>
        {/* Job Experience */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Required (in years)</label>
          <input
            type="number"
            name="experience"
            onChange={handleChange}
            value={jobData.experience}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Experience (years)"
          />
        </div>
        {/* Salary */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
          <input
            type="number"
            name="salary"
            onChange={handleChange}
            value={jobData.salary}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Salary"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;

