import { USER_API_END_POINT } from "@/utils/uri";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";




const Signin = () => {
  const {user, setUser} = useContext(UserContext)
  
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true 
      })    
      await setUser(res.data.user)
      if (res.data.success) {
        console.log(res.data.user);
        alert(res.data.message);
        navigate('/'); // ✅ use the hook
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Response:", error.response.data);
        alert(error.response.data.message || "Something went wrong");
      } else {
        console.error("Error:", error.message);
        alert("Network or client-side error");
      }
      
    }
    console.log("Your Sign in data : ", formData);
    
    // Add API call or Firebase logic here
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Link to={'/'}>
      <button
      className="fixed top-5 left-5 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover: hover:bg-blue-700 transition cursor-pointer"
    >
      🏠 Home
    </button>
      </Link>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Sign In
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a role</option>
            <option value="recruiter">Recruiter</option>
            <option value="student">Candidate</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-300 cursor-pointer"
        >
          Sign In
        </button>
      </form>
      <h2 className="text-center text-sm text-gray-600 mt-4">
        I have no account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline font-medium transition duration-200"
        >
          Sign Up
        </Link>
      </h2>
    </div>
  );
};

export default Signin;
