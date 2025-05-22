import { USER_API_END_POINT } from "@/utils/uri";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    profilePhoto: null, // Changed from 'file' to 'profilePhoto'
  });
  const [error, setError] = useState(null); // Added to display errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file, // Changed from 'file' to 'profilePhoto'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const submissionData = new FormData();
    submissionData.append("fullname", formData.fullname);
    submissionData.append("email", formData.email);
    submissionData.append("password", formData.password);
    submissionData.append("phoneNumber", formData.phoneNumber);
    submissionData.append("role", formData.role);

    if (formData.profilePhoto) {
      submissionData.append("profilePhoto", formData.profilePhoto); // Changed from 'file' to 'profilePhoto'
    }

    try {
      console.log("Your Sign Up data:", formData);
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.status === 201 && res.data.success) {
        console.log("Message:", res.data.message);
        alert(res.data.message);
        navigate("/signin");
      } else {
        alert(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to sign up");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Link to={"/"}>
        <button className="fixed top-5 left-5 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition cursor-pointer">
          🏠 Home
        </button>
      </Link>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create Account
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a role</option>
            <option value="student">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Profile Image</label>
          <input
            accept="image/*"
            type="file"
            name="profilePhoto" // Changed from 'file' to 'profilePhoto'
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-300 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
      <h2 className="text-center text-sm text-gray-600 mt-4">
        I have an account?{" "}
        <Link
          to="/signin"
          className="text-blue-600 hover:underline font-medium transition duration-200"
        >
          Sign In
        </Link>
      </h2>
    </div>
  );
};

export default Signup;
