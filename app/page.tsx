import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contrast from './components/Contrast'
import Philosophy from './components/Philosophy'
import Worlds from './components/Worlds'
import Waitlist from './components/Waitlist'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Contrast />
        <Philosophy />
        <Worlds />
        <Waitlist />
      </main>
    </>
  )
}
