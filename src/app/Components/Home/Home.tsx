import { Navbar } from '../../../components/navbar1'
import Banner from './Banner/Banner'
import CTA from './CTA/CTA'
import Demo from './Demo/Demo'
import Features from './Features/Features'
import HowItWorks from './HowItWorks/HowItWorks'
import Packages from './Packages/Packages'
import Technology from './Technology/Technology'

export default function Home() {
  return (
    <div>
      <div className=''>
        <Navbar />
      </div>
      <Banner />
      <Features />
      <HowItWorks />
      <Demo />
      <Packages />
      <Technology />
      <CTA />
    </div>
  )
}
