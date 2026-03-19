import { useState } from 'react'
import AboutModal from '../components/AboutModal'
import ContactModal from '../components/ContactModal'
import DynamicSection from '../components/DynamicSection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'

function HomePage({ siteData }) {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const openContact = () => setIsContactOpen(true)
  const closeContact = () => setIsContactOpen(false)
  const openAbout = () => setIsAboutOpen(true)
  const closeAbout = () => setIsAboutOpen(false)

  const openAboutFromContact = () => {
    setIsContactOpen(false)
    setTimeout(() => setIsAboutOpen(true), 160)
  }

  return (
    <div className="min-h-screen bg-page text-slate-900">
      <Header
        companyName={siteData.companyName}
        logo={siteData.logo}
        onContactOpen={openContact}
      />

      <main>
        <HeroSection hero={siteData.hero} />

        <section className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {siteData.homeSections.map((section, index) => (
            <DynamicSection key={section.id} section={section} reverse={index % 2 === 1} />
          ))}
        </section>
      </main>

      <Footer footer={siteData.footer} onAboutOpen={openAbout} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={closeContact}
        contact={siteData.contact}
        footer={siteData.footer}
        onAboutOpen={openAboutFromContact}
      />

      <AboutModal isOpen={isAboutOpen} onClose={closeAbout} about={siteData.about} />
    </div>
  )
}

export default HomePage
