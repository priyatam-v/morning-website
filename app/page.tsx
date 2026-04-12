import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contrast from './components/Contrast'
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
        {/* spacer: keeps hero fully visible while cards animate (2×100vh),
            cards change at 40vh intervals so 3 cards = 80vh, rest is buffer */}
        <div style={{ height: '200vh', background: 'transparent' }} />

        <main>
          <Contrast />
          <Philosophy />
          <Worlds />
          <Waitlist />
        </main>
        <Footer />
      </div>
    </>
  )
}
