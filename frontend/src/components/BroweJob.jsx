import React, { useContext, useEffect } from "react";
import Navbar from "./shares/Navbar";
import Job from "./Job";
import Footer from "./Footer";
import { JobContext } from "./context/jobContext";

const BrowseJob = () => {
  const { jobs, setSearchQuery } = useContext(JobContext);

  // Clear search when leaving the page
  // useEffect(() => {
  //   return () => {
  //     setSearchQuery(""); // Reset search query when navigating away
  //   };
  // }, [setSearchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
          Search Results ({jobs.length})
        </h1>
        <div className="w-full max-h-[80vh] overflow-y-scroll pr-2">
          <Job />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseJob;
