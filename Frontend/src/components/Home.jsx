import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import HeroSection from './HeroSection'
function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <h1>Home</h1>

      <Footer/>
    </div>
  )
}

export default Home
