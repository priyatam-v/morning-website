import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contrast from './components/Contrast'
import CardExperience from './components/CardExperience'
import Philosophy from './components/Philosophy'
import Worlds from './components/Worlds'
import Waitlist from './components/Waitlist'
import SectionScroller from './components/SectionScroller'

export default function Home() {
  const sections = [
    <Hero key="hero" />,
    <Contrast key="contrast" />,
    <CardExperience key="card" />,
    <Philosophy key="philosophy" />,
    <Worlds key="worlds" />,
    <Waitlist key="waitlist" />,
  ]

  return (
    <>
      <Navbar />
      <SectionScroller sections={sections} />
    </>
  )
}