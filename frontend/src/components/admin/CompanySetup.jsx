import { COMPANY_API_END_POINT } from "@/utils/uri";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [company,setCompany]=useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${params.id}`, {
          withCredentials: true,
        });
        setCompany(res.data.company);
      } catch (error) {
        console.error(error);
      } 
    };

    

    if (params.id) {
      fetchCompany();
    }
  }, [params.id]);

  const [input, setInput] = useState({
    name:"",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
  if (company) {
    setInput({
      name: company.name || "",
    });
  }
}, [company]);

  const [isSaving, setIsSaving] = useState(false); // <-- added state for saving animation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Start saving
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert(res.data.message);
      setInput({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
      });
      navigate('/admin/companies');
    } catch (err) {
      console.error(err);
      alert("Failed to update company");
    } finally {
      setIsSaving(false); // Stop saving no matter what
    }
  };

  return (
    <div className="w-[70%] mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Company Setup
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={input.name}
              placeholder="Enter company name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter company description"
              name="description"
              onChange={handleChange}
              value={input.description}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              placeholder="https://company.com"
              name="website"
              onChange={handleChange}
              value={input.website}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="City, Country"
              name="location"
              onChange={handleChange}
              value={input.location}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>

          {/* Logo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo (JPG)
            </label>
            <input
              type="file"
              name="file"
              onChange={handleLogoChange}
              accept=".jpg,.jpeg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isSaving}
            />
            <p className="text-sm text-gray-500 mt-1">
              Only JPG files are accepted.
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-3 rounded-md text-white transition duration-200 
                ${isSaving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isSaving ? "Saving..." : "Save Company Info"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

