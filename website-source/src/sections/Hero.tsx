import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { siteConfig } from '@data/portfolio.ts'
import { Button } from '@components/ui/Button.tsx'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Mouse tilt physics for desktop
  const mouseX = useSpring(0, { stiffness: 90, damping: 24 })
  const mouseY = useSpring(0, { stiffness: 90, damping: 24 })

  // Check device capabilities and motion preference
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsDesktop(isFinePointer && !reducedMotion)
    setPrefersReducedMotion(reducedMotion)

    if (isFinePointer && !reducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window
        const normalizedX = (e.clientX / innerWidth) * 2 - 1
        const normalizedY = (e.clientY / innerHeight) * 2 - 1
        mouseX.set(normalizedX)
        mouseY.set(normalizedY)
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Scroll parallax bindings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Multi-plane parallax translations on scroll
  const bgScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  
  const textScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.4, 0])

  const portraitScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.03])

  const uiOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse tilt transforms
  const bgMouseX = useTransform(mouseX, [-1, 1], [-8, 8])
  const bgMouseY = useTransform(mouseY, [-1, 1], [-8, 8])

  const textMouseX = useTransform(mouseX, [-1, 1], [-12, 12])
  const textMouseY = useTransform(mouseY, [-1, 1], [-10, 10])

  const portraitMouseX = useTransform(mouseX, [-1, 1], [14, -14])
  const portraitMouseY = useTransform(mouseY, [-1, 1], [10, -10])

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-background flex flex-col justify-between pt-24 pb-8 md:pt-28 md:pb-12 border-b border-border/60"
      aria-label="Syed Hussain — Creative Direction & Video Editing"
    >
      {/* ── LAYER 1: Deep Architectural Background Plate ────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 origin-center"
        style={{
          y: prefersReducedMotion ? 0 : bgScrollY,
          scale: prefersReducedMotion ? 1 : bgScale,
        }}
      >
        <motion.div
          className="h-full w-full"
          style={{
            x: isDesktop ? bgMouseX : 0,
            y: isDesktop ? bgMouseY : 0,
          }}
        >
          <img
            src="/images/profile/mahi-bg-depth.jpg"
            alt=""
            role="presentation"
            className="h-full w-full object-cover object-center opacity-30 filter brightness-75 contrast-125 saturate-50"
            loading="eager"
            decoding="async"
          />
          {/* Subtle edge-blending gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
        </motion.div>
      </motion.div>

      {/* ── TOP BAR: Header Meta & Live Availability ───────────────────────────── */}
      <motion.div
        className="relative z-30 container-site flex items-center justify-between"
        style={{ opacity: prefersReducedMotion ? 1 : uiOpacity }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className="font-body text-label font-medium uppercase tracking-[0.25em] text-text-secondary">
            Creative Direction
          </span>
          <span className="text-border text-xs hidden sm:inline">•</span>
          <span className="hidden sm:inline font-body text-label uppercase tracking-[0.2em] text-text-secondary">
            Video & Strategy
          </span>
        </div>

        <div className="flex items-center gap-2 bg-surface/80 backdrop-blur-md px-3.5 py-1.5 border border-border/80">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" aria-hidden="true" />
          <span className="font-body text-label font-medium uppercase tracking-[0.18em] text-text-primary">
            {siteConfig.availability}
          </span>
        </div>
      </motion.div>

      {/* ── CENTERSTAGE: Typographic Monument + Foreground Portrait ─────────────── */}
      <div className="relative z-10 flex-1 flex items-center container-site py-8 md:py-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-10 md:gap-8">
          {/* ── LEFT COLUMN: Headlines, Copy & Action Buttons ─────────────────── */}
          <div className="md:col-span-7 flex flex-col justify-center relative z-20">
            <motion.div
              className="select-none"
              style={{
                y: prefersReducedMotion ? 0 : textScrollY,
                opacity: prefersReducedMotion ? 1 : textOpacity,
              }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <motion.div
                style={{
                  x: isDesktop ? textMouseX : 0,
                  y: isDesktop ? textMouseY : 0,
                }}
              >
                {/* Primary Headline */}
                <h1 className="font-heading font-bold text-[clamp(2.4rem,5.5vw,5.25rem)] tracking-tight text-text-primary uppercase leading-[0.96] text-balance">
                  Your ideas deserve more than just good{' '}
                  <span className="text-text-secondary/70">execution</span>
                  <span className="text-accent">.</span>
                </h1>

                {/* Supporting Headline */}
                <h2 className="mt-4 md:mt-6 font-heading font-semibold text-[clamp(1.35rem,2.6vw,2.4rem)] tracking-tight text-text-primary/95 text-balance">
                  They deserve the right{' '}
                  <span className="text-accent underline decoration-accent/40 underline-offset-8">
                    creative direction
                  </span>
                  .
                </h2>
              </motion.div>
            </motion.div>

            {/* Introduction Copy & Action Buttons */}
            <motion.div
              className="relative z-30 mt-7 md:mt-9 max-w-xl"
              style={{ opacity: prefersReducedMotion ? 1 : uiOpacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <p className="font-body text-body-md md:text-body-lg text-text-primary/90 leading-relaxed max-w-lg">
                I help businesses bring their brands to life through video, creative strategy and digital solutions — from the first idea to complete execution.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button as="a" href="#work" variant="primary" size="lg" className="group">
                  <span>View My Work</span>
                  <ArrowDownRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Button>
                <Button as="a" href="#contact" variant="outline" size="lg" className="group">
                  <span>Let's Talk</span>
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Isolated Foreground Portrait Cutout ──────────────── */}
          <motion.div
            className="md:col-span-5 pointer-events-none relative z-10 flex items-end justify-center md:justify-end"
            style={{
              y: prefersReducedMotion ? 0 : portraitScrollY,
              scale: prefersReducedMotion ? 1 : portraitScale,
            }}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <motion.div
              className="flex items-end justify-center"
              style={{
                x: isDesktop ? portraitMouseX : 0,
                y: isDesktop ? portraitMouseY : 0,
              }}
            >
              <img
                src="/images/profile/mahi-cutout.png"
                alt="Syed Hussain — Creative Director"
                className="h-[320px] sm:h-[380px] md:h-[440px] lg:h-[540px] xl:h-[620px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.92)] filter contrast-[1.04]"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM META BAR ────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-30 container-site"
        style={{ opacity: prefersReducedMotion ? 1 : uiOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
      >
        <div className="pt-4 border-t border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              'VIDEO EDITING',
              'CREATIVE CONSULTATION',
              'BRAND EXPERIENCE',
              'DIGITAL SOLUTIONS',
            ].map((pillar) => (
              <span
                key={pillar}
                className="font-body text-label uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors cursor-default"
              >
                {pillar}
              </span>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-text-secondary font-body text-label uppercase tracking-[0.2em]">
            <span>Explore the work</span>
            <span className="w-4 h-px bg-text-secondary" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
