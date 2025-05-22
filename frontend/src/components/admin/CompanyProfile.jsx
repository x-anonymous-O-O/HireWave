import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from "@/utils/uri"; // Update this if needed
import CreateJobForm from './CreateJobForm';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = ({ companyID }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyID}`, {
          withCredentials: true,
        });
        setCompany(res.data.company);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    

    if (companyID) {
      fetchCompany();
    }
  }, [companyID]); // <<== Corrected here

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!company) {
    return <p>No company found. Please create one first.</p>;
  }

  const handleEdit=()=>{
    navigate(`/admin/companies/${companyID}`);
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={company.logo || '/default-logo.png'}
          alt="Company Logo"
          className="w-24 h-24 rounded-full border"
        />
        <h3 className="text-2xl font-bold text-gray-800">{company.name}</h3>
        <p className="text-gray-600">
          Created on: {new Date(company.createdAt).toLocaleDateString()}
        </p>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleEdit}>
          Edit Company
        </button>
      </div>
      <CreateJobForm 
        companyId={company._id} 
        createdBy={company.userId} 
      />
    </div>
  );
};

export default CompanyProfile;


