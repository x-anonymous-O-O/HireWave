import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "./context/jobContext";

const Job = () => {
  const navigate = useNavigate()
  const { jobs } = useContext(JobContext)
 
  return (
    
    <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto  ">
      {
      jobs.map((job, index) =>{
        return (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 w-80 p-5 mt-3"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-3">
            <img
              src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg"
              alt="Company Logo"
              className="w-8 h-8 object-cover rounded-full"
            />
            {job.title}
          </h3>

          {/* <p className="text-gray-600 text-sm">{job.company.name}</p> */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>{job.location}</span>
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <div className="mt-2 text-xs text-indigo-500">{job.position}</div>
            <span className="text-green-600 font-medium text-sm">
              ₹{job.salary.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-4 mt-4">
            
              <button onClick={() => navigate(`/jobDescription/${job._id}`)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                Details
              </button>
         

            <Link to="/saveJob">
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-100 font-medium py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                Save For Later
              </button>
            </Link>
          </div>
        </div>
      )}
    )
      }
    </div>
  );
};

export default Job;
