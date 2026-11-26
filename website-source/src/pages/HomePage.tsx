import { Hero } from '@sections/Hero.tsx'
import { SelectedWork } from '@sections/SelectedWork.tsx'
import { VisualDesignArchive } from '@components/visualArchive/VisualDesignArchive.tsx'
import { Services } from '@sections/Services.tsx'
import { AdvertisingCaseStudies } from '@sections/AdvertisingCaseStudies.tsx'
import { MyApproach } from '@sections/MyApproach.tsx'
import { AboutMe } from '@sections/AboutMe.tsx'
import { Contact } from '@sections/Contact.tsx'
import { useSeoMeta } from '@hooks/useSeoMeta.ts'

export function HomePage() {
  useSeoMeta({
    title: 'Creative Director & Video Editor — Premium Video, Reels & Creative Services',
    description:
      'Syed Hussain — video editing, short-form content, creative consultation and full digital project management for UK businesses. One creative vision, a complete team behind the execution.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Syed Hussain — Creative Direction & Video Editing',
      description:
        'Premium video editing, short-form reels, creative consultation, content production and digital project management for UK brands.',
      areaServed: 'United Kingdom',
      serviceType: [
        'Video Editing',
        'Short-Form Content',
        'Creative Consultation',
        'Content Production',
        'Social Media Management',
        'Digital Advertising',
      ],
    },
  })

  return (
    <>
      {/* SECTION 1 — HERO (CINEMATIC EDITORIAL PARALLAX) */}
      <Hero />

      {/* SECTION 2 — SELECTED WORK (INTERACTIVE PORTFOLIO GALLERY) */}
      <SelectedWork />

      {/* SECTION 3 — VISUAL DESIGN ARCHIVE */}
      <VisualDesignArchive />

      {/* SECTION 4 — SERVICES & CAPABILITIES (3 DISTINCT GROUPS) */}
      <Services />

      {/* SECTION 5 — ADVERTISING CASE STUDIES & VERIFIED RESULTS */}
      <AdvertisingCaseStudies />

      {/* SECTION 6 — WORKING PROCESS (5 STAGES) */}
      <MyApproach />

      {/* SECTION 7 — ABOUT ME */}
      <AboutMe />

      {/* SECTION 8 — CONTACT */}
      <Contact />
    </>
  )
}
