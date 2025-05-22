import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { JobContext } from "./context/jobContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState(""); // This is the local search query in HeroSection
  const { setSearchQuery } = useContext(JobContext); // Set search query in context
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setSearchQuery(query); // Set search query in context
    navigate("/browse"); // Navigate to browse page with search query
  };

  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-indigo-100 py-20 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Kickstart Your Career as a{" "}
          <span className="text-indigo-600">Student</span>
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          Discover internships, part-time jobs, and entry-level opportunities
          tailored just for students like you.
        </p>
        {/* Search Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <input
            onChange={(e) => setQuery(e.target.value)} // Update local query state
            type="text"
            placeholder="Search jobs, companies..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <Button
            onClick={searchJobHandler} // Perform the search and navigate
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
          >
            <Search size={18} />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
