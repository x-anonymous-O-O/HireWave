import React, { useEffect, useState } from 'react';
import Navbar from '../shares/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CompanyProfile from './CompanyProfile';
import { COMPANY_API_END_POINT } from '@/utils/uri';

const Companies = () => {
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
      console.log('Company Data:', res.data); // To inspect the response structure
      if (res.data?.company) {
        setCompany(res.data.company); // Set the company data correctly
      } else {
        console.log('No company found for this user');
      }
    } catch (error) {
      console.error('Error fetching company:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-[85%] mx-auto mt-8 font-sans">
        <h2 className="text-2xl font-semibold mb-6">Company</h2>

        {!company ? (
          <div className="flex justify-center">
            <button
              className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-lg"
              onClick={() => navigate('/admin/companies/create')}
            >
              Create Your Company
            </button>
          </div>
        ) : (
          <CompanyProfile companyID={company._id}/>
        )}
      </div>
    </>
  );
};

export default Companies;

