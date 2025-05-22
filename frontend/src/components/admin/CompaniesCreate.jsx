import React, { useState } from 'react';
import Navbar from '../shares/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/uri';

const CompaniesCreate = () => {
  const [company, setCompany] = useState({ companyName: '' });
  const [companyExists, setCompanyExists] = useState(false);
  const navigate = useNavigate();

  const createCompany = async () => {
    try {
      const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName: company.companyName }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      console.log(response);

      if (response.status === 201 && response.data.success) {
        alert(response.data.message);
        const id = response.data.company._id;
        console.log(response.data.company._id);
        navigate(`/admin/companies/${id}`);
      }
    } catch (error) {
      console.error(error.response?.data);
      if (error.response?.status === 409) {
        setCompanyExists(true);
      }
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleInputChange = (e) => {
    setCompany({ ...company, companyName: e.target.value });
    if (companyExists) setCompanyExists(false); // reset if user changes input
  };

  return (
    <>
      <Navbar />
      <div className="w-[65%] mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create a New Company</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={(e) => { e.preventDefault(); createCompany(); }}>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-600 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                value={company.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {companyExists && (
                <p className="text-red-600 text-sm mt-2">Company already exists!</p>
              )}
            </div>
            <div className="mb-4 flex justify-center">
              <button
                type="submit"
                className={`w-full py-3 text-white rounded-md transition duration-200 ${
                  companyExists ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={companyExists}
              >
                Create Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompaniesCreate;
