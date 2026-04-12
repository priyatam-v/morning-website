import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Worlds from './components/Worlds'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero is position:fixed at z-index:1. It never moves. */}
      <Hero />

      {/* Everything here is z-index:2 and scrolls on top of the fixed hero.
          The spacer creates the scroll distance that drives the card animations. */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* spacer: keeps hero fully visible during card cycling.
            scrollTo(innerHeight) from the last card lands exactly here. */}
        <div style={{ height: '100vh', background: 'transparent' }} />

        <main>
          <Philosophy />
          <Worlds />
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Waitlist />
            <Footer />
          </div>
        </main>
      </div>
    </>
  )
}
