import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, siteConfig } from '@data/portfolio.ts'
import { cn } from '@hooks/cn.ts'

/** IDs of sections to track for active nav highlight */
const SECTION_IDS = navLinks.map((l) => l.href.replace('#', ''))

export function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeSection,  setActiveSection]  = useState<string>('')

  /* ── Scroll: solid background ─────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active section via IntersectionObserver ─────────────────────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  /* ── Close menu on route/hash change ─────────────────────────────────── */
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  /* ── Lock body scroll when menu open ─────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || menuOpen
          ? 'bg-background/96 backdrop-blur-md border-b border-border'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      {/* ── Main bar ──────────────────────────────────────────────────────── */}
      <nav
        className="container-site flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <a
          href="#top"
          className="font-heading font-semibold text-sm tracking-tight text-text-primary hover:text-accent transition-colors duration-200 whitespace-nowrap"
          aria-label={`${siteConfig.name} — back to top`}
          onClick={() => setMenuOpen(false)}
        >
          {siteConfig.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7 xl:gap-8" role="list">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative font-body text-body-sm transition-colors duration-200 py-1 whitespace-nowrap',
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 font-body text-body-sm font-semibold bg-accent text-[#111315] px-5 py-2.5 hover:bg-accent/90 active:bg-accent/80 transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Start a project
        </a>

        {/* Mobile / Tablet menu toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <div className="w-6 flex flex-col gap-[5px]" aria-hidden="true">
            <span
              className={cn(
                'block h-px bg-current origin-center transition-all duration-300',
                menuOpen ? 'rotate-45 translate-y-[8px]' : ''
              )}
            />
            <span
              className={cn(
                'block h-px bg-current transition-all duration-300',
                menuOpen ? 'opacity-0 scale-x-0' : ''
              )}
            />
            <span
              className={cn(
                'block h-px bg-current origin-center transition-all duration-300',
                menuOpen ? '-rotate-45 -translate-y-[8px]' : ''
              )}
            />
          </div>
        </button>
      </nav>
    </header>

      {/* ── Mobile / Tablet full-screen menu (rendered outside header so backdrop-blur doesn't trap fixed positioning) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 bg-[#111315] z-40 flex flex-col overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="container-site flex flex-col pt-8 pb-12 flex-1" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1 flex-1" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  >
                    <a
                      href={link.href}
                      className="block font-heading font-bold text-display-md text-text-primary hover:text-accent transition-colors duration-200 py-3 border-b border-border"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile bottom: CTA + email */}
              <motion.div
                className="mt-auto flex flex-col gap-4 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <a
                  href="#contact"
                  className="inline-flex justify-center items-center font-body text-body-md font-semibold bg-accent text-[#111315] px-6 py-4 hover:bg-accent/90 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a project
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-body text-body-sm text-text-secondary hover:text-accent transition-colors duration-200 text-center"
                >
                  {siteConfig.email}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
