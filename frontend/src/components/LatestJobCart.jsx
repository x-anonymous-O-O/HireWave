import React, { useContext } from "react";
import { JobContext } from "./context/jobContext";

const latestJobs = [
  {
    title: "Frontend Intern",
    company: "TechNova",
    location: "Remote",
    type: "Internship",
    position: "12 position",
    salary: "22LPA",
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Bangalore",
    type: "Part-Time",
    position: "12 position",
    salary: "22LPA",
  },
  {
    title: "Junior Backend Developer",
    company: "CodeCraft",
    location: "Hyderabad",
    type: "Full-Time",
    position: "12 position",
    salary: "22LPA",
  },
  {
    title: "Frontend Intern",
    company: "TechNova",
    location: "Remote",
    type: "Internship",
    position: "12 position",
    salary: "22LPA",
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Bangalore",
    type: "Part-Time",
    position: "21 position",
    salary: "22LPA",
  },
  {
    title: "Junior Backend Developer",
    company: "CodeCraft",
    location: "Hyderabad",
    type: "Full-Time",
    position: "12 position",
    salary: "22LPA",
  },
];
const LatestJobCart = () => {
  const { jobs } = useContext(JobContext);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {jobs.map((job, index) => {
          return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 p-5"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
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
          </div>)
        })}
      </div>
    </div>
  );
};

export default LatestJobCart;
