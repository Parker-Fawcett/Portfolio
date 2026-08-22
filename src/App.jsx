import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBand from './components/StatsBand'
import Experience from './components/Experience'
import CaseStudies from './components/CaseStudies'
import DataSpotlight from './components/DataSpotlight'
import SignOff from './components/SignOff'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBand />
      <Experience />
      <CaseStudies />
      <DataSpotlight />
      <div style={{ background: 'var(--ink)', marginTop: 48 }}>
        <SignOff />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
