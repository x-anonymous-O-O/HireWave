import { APPLY_API_END_POINT } from '@/utils/uri';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsBriefcase, BsBuilding, BsCalendarDate } from "react-icons/bs";


const ApplyJobTable = () => {
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${APPLY_API_END_POINT}/get`, {
          withCredentials: true,
      }); // adjust endpoint as needed
        const formatted = res.data.applications.map(app => ({
          date: app.createdAt,
          jobRole: app.job?.title,
          company: app.job?.company?.name,
          status: capitalize(app.status), // Capitalize for UI matching
        }));
        setApplications(formatted);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };
    fetchApplications();
  }, []);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };
  
  const statusDot = {
    Pending: "bg-yellow-500",
    Accepted: "bg-green-500",
    Rejected: "bg-red-500",
  };


  return (
    <div className="max-w-5xl mx-auto p-6">
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BsBriefcase /> Applied Jobs
        </h2>
        <p className="text-sm text-gray-500">
          {applications?.length} Total Applications
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800">
            <tr>
              <th className="px-6 py-3 font-semibold"> <BsCalendarDate className="inline mr-1" /> Date</th>
              <th className="px-6 py-3 font-semibold"><BsBriefcase className="inline mr-1" /> Job Role</th>
              <th className="px-6 py-3 font-semibold"><BsBuilding className="inline mr-1" /> Company</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications?.length > 0 ? (
              applications.map((app, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(app.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {app.jobRole}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{app.company}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium ${statusStyles[app.status]}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${statusDot[app.status]}`}></span>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No job applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default ApplyJobTable;
