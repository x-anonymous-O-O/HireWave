import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/uri";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query

  // Function to fetch jobs based on search query
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `${JOB_API_END_POINT}/get?keyword=${searchQuery}`, 
        { withCredentials: true }
      );
      setJobs(res.data.jobs); // Set fetched jobs in state
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // Re-fetch jobs when search query changes
  useEffect(() => {
    fetchJobs(); 
  }, [searchQuery]);

  return (
    <JobContext.Provider
      value={{ jobs, setJobs, fetchJobs, setSearchQuery, searchQuery }}
    >
      {children}
    </JobContext.Provider>
  );
};
