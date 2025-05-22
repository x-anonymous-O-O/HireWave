import React, { useEffect, useState } from "react";
import axios from "axios";
import { APPLY_API_END_POINT, JOB_API_END_POINT } from "@/utils/uri";
import Navbar from "../shares/Navbar";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, {
          withCredentials: true,
        });
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = async (job) => {
    setSelectedJob(job);
    try {
      const res = await axios.get(`${APPLY_API_END_POINT}/${job._id}/getApplicant`, {
        withCredentials: true,
      });
      setApplicants(res.data.job.applications || []);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      await axios.patch(
        `${APPLY_API_END_POINT}/status/${applicationId}/update`,
        { status: newStatus },
        { withCredentials: true }
      );
      alert(`Applicant ${newStatus}.`);
      setStatusUpdate((prev) => ({
        ...prev,
        [applicationId]: newStatus,
      }));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleRemoveJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        if (selectedJob?._id === jobId) {
          setSelectedJob(null);
          setApplicants([]);
        }
        alert("Job removed successfully.");
      }
    } catch (err) {
      console.error("Error removing job:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Employer Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Posted Jobs</h3>
            {jobs.map((job) => (
              <div
                key={job._id}
                className="p-4 mb-4 bg-white shadow-sm rounded border cursor-pointer hover:shadow-md transition"
                onClick={() => handleJobClick(job)}
              >
                <h4 className="text-lg font-bold">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="text-xs text-gray-500">
                  Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {selectedJob && (
            <div className="bg-white p-6 rounded shadow-sm border overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Applicants for: {selectedJob.title}
                </h3>
                <button
                  onClick={() => handleRemoveJob(selectedJob._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove Job
                </button>
              </div>
              {applicants.length === 0 ? (
                <p className="text-gray-500">No applicants yet.</p>
              ) : (
                <div className="space-y-6">
                  {applicants.map((app) => (
                    <div
                      key={app._id}
                      className="border rounded p-4 shadow-sm bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-medium">
                            {app.applicant?.fullname || "Unnamed Applicant"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {app.applicant?.email || "No email provided"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {app.applicant?.phoneNumber || "No phone provided"}
                          </p>
                        </div>
                        <div className="space-x-2">
                          {statusUpdate[app._id] || app.status !== "pending" ? (
                            <span
                              className={`inline-block px-4 py-2 rounded ${
                                (statusUpdate[app._id] || app.status) === "accepted"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {(statusUpdate[app._id] || app.status) === "accepted"
                                ? "Accepted"
                                : "Rejected"}
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(app._id, "accepted")}
                                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(app._id, "rejected")}
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {app.applicant?.profile?.bio && (
                        <p className="mt-2 text-sm text-gray-700 italic">
                          {app.applicant.profile.bio}
                        </p>
                      )}

                      {app.applicant?.profile?.skills?.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium text-sm">Skills:</p>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {app.applicant.profile.skills.map((skill, idx) => (
                              <li key={idx}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {app.applicant?.profile?.resume && (
                        <div className="mt-4">
                          <a
                            href={app.applicant.profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            View Resume
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerDashboard;





