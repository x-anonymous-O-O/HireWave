import React, { useContext, useEffect } from 'react'
import Navbar from './shares/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel '
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'
const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  console.log(user);
  
  useEffect(() => { 
    if (user && user.role === 'recruiter') {
      navigate('/admin/companies')
    }
  }, [])

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  )
}

export default Home
