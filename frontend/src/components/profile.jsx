import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import Navbar from "./shares/Navbar";
import ApplyJobTable from "./ApplyedJobTable";
import Footer from "./Footer";
import axios from "axios";

import { USER_API_END_POINT } from "@/utils/uri";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname,
        role: user.role,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.profile.bio,
        file: user.profile.resume,
        skills: user.profile.skills.join(", "),
        profilePhoto: user.profile.profilePhoto,
      });
    }
  }, [user]);

  if (!user || !formData) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleProfileImageChange = (e) => {
    const profilePhoto = e.target.files[0];
    setFormData({ ...formData, profilePhoto });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("fullname", formData.fullname);
    submissionData.append("email", formData.email);
    submissionData.append("phoneNumber", formData.phoneNumber);
    submissionData.append("bio", formData.bio);
    submissionData.append("skills", formData.skills);
    if (formData.file) {
      submissionData.append("file", formData.file);
    }
    if (formData.profilePhoto) {
      submissionData.append("profilePhoto", formData.profilePhoto);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200 && res.data.success) {
        const updatedUser = res.data.user;
        if (setUser) {
          setUser(updatedUser);
        }
        alert(res.data.message);
      } else {
        alert(res.data.message || "Something went wrong!");
      }
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Server error occurred");
      } else {
        alert("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 shadow-2xl rounded-3xl p-6 mt-8">
        <div className="flex items-center space-x-4">
          <img
            src={user.profile.profilePhoto || "https://github.com/shadcn.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 transition-all duration-300 hover:scale-105"
          />
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {formData.fullname}
            </h2>
            <p className="text-gray-600 capitalize text-lg">{formData.role}</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <input
            type="file"
            name="file"
            accept="image/*, .jpg"
            onChange={handleProfileImageChange}
            className="block w-full mt-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {["fullname", "email", "phoneNumber"].map((field) => (
            <div key={field} className="group">
              <label className="text-sm font-medium text-gray-600 capitalize">
                {field}
              </label>
              {isEditing ? (
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-lg p-2 mt-2 bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800">{user[field]}</p>
              )}
            </div>
          ))}
          <div>
            <label htmlFor="">Bio</label>
            {isEditing ? (
              <input
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-2 mt-2 bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{formData.bio}</p>
            )}
          </div>

          <div className="group">
            <label className="text-sm font-medium text-gray-600">Skills</label>
            {isEditing ? (
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Comma-separated skills"
                className="w-full border-2 border-gray-300 rounded-lg p-2 mt-2 bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">
                {formData.skills.length > 0
                  ? formData.skills
                  : "No skills listed"}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-600">
              Upload Resume
            </label>
            {isEditing ? (
              <>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="block w-full mt-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.resumeOriginalname && (
                  <p className="mt-1 text-sm text-gray-500">
                    Current: {formData.resumeOriginalname}
                  </p>
                )}
              </>
            ) : user.profile.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Resume
                Current: {user.profile.resumeOriginalname}
              </a>
            ) : (
              <p className="text-gray-500">No resume uploaded</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-right">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <ApplyJobTable />
      <Footer />
    </>
  );
};

export default Profile;

