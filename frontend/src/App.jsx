import './App.css'
import 'keen-slider/keen-slider.min.css';

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Home from './components/Home';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import BroweJob from './components/BroweJob';


import { UserContext } from './components/context/UserContext'
import Profile from './components/profile';
import JobDescription from './components/JobDescription';
import { JobProvider } from './components/context/jobContext';
import Companies from './components/admin/Companies';
import CompaniesCreate from './components/admin/CompaniesCreate';
import CompanySetup from './components/admin/CompanySetup';
import RecruiterJobs from './components/admin/EmployerDashboard';
import EmployerDashboard from './components/admin/EmployerDashboard';

function App() {

  const [user, setUser] = useState(); 
  
  
  return (
    <>
    <JobProvider>
    <BrowserRouter>
    <Routes>
  <Route path='/' element={<Home />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path='/jobs' element={<Jobs />} />
  <Route path='/browse' element={<BroweJob />} />
  <Route path='/profile/update' element={<Profile />} />
  <Route path='/jobDescription/:id' element={<JobDescription />} />

  <Route path='/admin/jobs' element={<EmployerDashboard/>} />
  <Route path='/admin/companies' element={<Companies />} />        
  <Route path='/admin/companies/create' element={<CompaniesCreate />} />
  <Route path='/admin/companies/:id' element={<CompanySetup />} /> 
</Routes>
    </BrowserRouter>
    </JobProvider>
    </>
  )
}

export default App;
