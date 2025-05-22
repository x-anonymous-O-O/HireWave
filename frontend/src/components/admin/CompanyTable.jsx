import React, { useContext, useEffect, useState } from "react";
import { CompnayContext } from "../context/companiesContext";
import axios from "axios";

const CompanyTable = () => {
  //import axios from 'axios';
  const [ companies, setCompanies ] = useState([]);
const fetchCompanies = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/v1/company/get', { withCredentials: true });
    setCompanies(res.data.companies);
    console.log('Companies:', res.data.companies);
  } catch (error) {
    console.error('Error:', error.response?.data?.message || error.message);
  }
};
useEffect(() => {
  fetchCompanies();
}, []);
  return (
    <div className="w-[85%] mx-auto mt-10 font-sans">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Company Table</h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map((company, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 text-center transition"
              >
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center h-full">
                    <img
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      className="w-10 h-10 rounded-full border border-gray-200 shadow-sm"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {company.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{new Date(company.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4  space-x-3">
                  <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyTable;
