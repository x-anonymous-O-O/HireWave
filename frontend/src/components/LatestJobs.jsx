import React from 'react';
import LatestJobCart from './LatestJobCart';
const latestJobs = [
    {
      title: "Frontend Intern",
      company: "TechNova",
      location: "Remote",
      type: "Internship",
      posted: "2 days ago",
    },
   
  ];

  const randomJobs = [1,2,3,4,5,6]
  
  const LatestJobs = () => {
    return (
      <section className="py-10 px-4 sm:px-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            <span className="text-indigo-600">
            Latest </span>
            Job Listings
        </h2>
  
     <LatestJobCart />

      </section>
    );
  };
  
  export default LatestJobs;
  