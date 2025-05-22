import React, { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaBuilding } from "react-icons/fa";
import Navbar from "./shares/Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { JobContext } from "./context/jobContext";
import axios from "axios";
import { APPLY_API_END_POINT } from "@/utils/uri";
import { UserContext } from "./context/UserContext";

const JobDescription = ({ job }) => {
  const { user } = useContext(UserContext);
  const userId = user?._id;
  const { id } = useParams();
  const { jobs } = useContext(JobContext);
  const jobDescription = jobs.find((j) => j._id === id);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (jobDescription && user) {
      const alreadyApplied = jobDescription.applications?.some(
        (a) => a.applicant === userId
      );
      setIsApplied(alreadyApplied || false);
    }
  }, [jobDescription, user, userId]);

  const handleApply = async () => {
    try {
      const res = await axios.get(`${APPLY_API_END_POINT}/apply/${id}`, {
        withCredentials: true,
      });
      
      if(res.data.success) {
        setIsApplied(true); 
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 transition hover:shadow-lg">
          {/* Job Title + Company */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {jobDescription.title}
            </h1>
            <div className="flex items-center text-gray-600 mt-1">
              <FaBuilding className="mr-2 text-blue-500" />
              <span className="text-lg">{jobDescription.company.name}</span>
            </div>
          </div>

          {/* Job Info */}
          <div className="flex flex-wrap gap-6 text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{jobDescription.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-500" />
              <span>{jobDescription.jobType}</span>
            </div>
            <div className="text-sm text-gray-400 ml-auto">
              Posted 2 days ago
            </div>
          </div>

          <div className="flex items-center justify-between mt-1 text-4xl text-gray-500">
            <div className="mt-2 text-2xl text-indigo-500">
              {jobDescription.position}
            </div>

            <span className="text-green-600 font-medium text-2xl">
              ₹{jobDescription.salary.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-xl">
            Experience: {jobDescription.experienceLevel} Years
          </div>

          {/* About */}
          <div className="mb-6 mt-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              About the Role
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {jobDescription.description}
            </p>
          </div>

          {/* Requirements */}
          {jobDescription.requirement?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Requirements
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {jobDescription.requirement.map((req, index) => (
                  <li key={index}>{	req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply CTA */}
          <div className="text-center mt-8">
            {user?.role === "student" && (
              <>
                {isApplied ? (
                  <button className="bg-gray-600 text-white text-base font-medium px-6 py-3 rounded-lg shadow transition-all duration-200">
                    Already Applied
                  </button>
                ) : (
                  <button
                    onClick={handleApply}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-base cursor-pointer font-medium px-6 py-3 rounded-lg shadow transition-all duration-200"
                  >
                    Apply Now
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDescription;
