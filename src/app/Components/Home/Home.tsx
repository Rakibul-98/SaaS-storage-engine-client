"use client"

import { useEffect, useState } from 'react'
import Banner from './Banner/Banner'
import CTA from './CTA/CTA'
import Demo from './Demo/Demo'
import Features from './Features/Features'
import Footer from './Footer/Footer'
import HowItWorks from './HowItWorks/HowItWorks'
import Packages from './Packages/Packages'
import Technology from './Technology/Technology'
import { ArrowUpToLine } from 'lucide-react'
import EnforcementLogic from './EnforcementLogic/EnforcementLogic'

export default function Home() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div className='relative'>
      <Banner />
      <Features />
      <HowItWorks />
      <Demo />
      <EnforcementLogic />
      <Packages />
      <Technology />
      <CTA />
      <Footer />

      <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
        <button
          onClick={scrollToTop}
          className='flex h-10 w-10 items-center justify-center  bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors cursor-pointer'
          aria-label="Go to top"
        >
          <ArrowUpToLine className='h-6 w-6' />
        </button>
      </div>
    </div>
  )
}