import React from "react";
import Navbar from "./shares/Navbar";

import Job from "./job";
import FilterComponent from "./Filter";


const Jobs = () => {
  return (
    <div>
      <Navbar />

      {/* Layout container */}
      <div className="flex max-w-7xl mx-auto px-4 py-8 gap-6">
        {/* Left: Filter (20%) */}
        <FilterComponent />

        {/* Right: Job List (80%) */}
        <div className="w-5/4 max-h-[80vh] overflow-y-scroll pr-2">
         
            <Job  />
        
        </div>
      </div>
    </div>
  );
};

export default Jobs;
