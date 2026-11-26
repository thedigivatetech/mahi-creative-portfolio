import { motion } from 'framer-motion'
import { personalServices } from '@data/portfolio.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function WhatIDo() {
  return (
    <Section id="services" className="border-b border-border/80 bg-background">
      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Core Personal Specialisms"
          heading="What I do personally."
          subtext="I believe the most impactful creative work happens when the person consulting on the brand is directly involved in crafting the output. Here is what you hire me directly to deliver."
        />

        {/* ── Editorial Services Stack ──────────────────────────────────────── */}
        <div className="mt-16 divide-y divide-border border-y border-border">
          {personalServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              {/* Left Column: Number & Primary Title */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-heading font-bold text-lg text-accent">
                    {service.number}
                  </span>
                  <span className="font-body text-label uppercase tracking-widest text-text-secondary/70">
                    {service.highlight}
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 font-body text-body-sm text-text-secondary/90 italic">
                  {service.subtitle}
                </p>
              </div>

              {/* Middle Column: Detailed Scope & Narrative */}
              <div className="lg:col-span-4">
                <p className="font-body text-body-md text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right Column: Specific Deliverable Checklist */}
              <div className="lg:col-span-3 bg-surface/40 p-5 border border-border/60">
                <span className="font-body text-label uppercase tracking-widest text-text-secondary block mb-3">
                  Scope & Deliverables
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((deliv) => (
                    <li key={deliv} className="flex items-start gap-2 font-body text-body-sm text-text-primary/80">
                      <CheckCircle2 size={14} className="text-accent mt-1 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Commercial Entry Bridge ────────────────────────────────────────── */}
        <div className="mt-12 p-8 border border-border bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-body text-label uppercase tracking-widest text-accent block mb-1">
              Commercial Engagement Strategy
            </span>
            <h4 className="font-heading text-xl font-bold text-text-primary">
              Most clients begin with video editing or a strategic consultation.
            </h4>
            <p className="mt-1 font-body text-body-sm text-text-secondary max-w-xl">
              By working closely on your creative assets, I gain a deep understanding of your operational needs, creating natural opportunities to scale into complete branding, web, and marketing systems.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 font-body text-body-sm font-semibold hover:bg-accent/90 shrink-0 transition-colors"
          >
            <span>Book A Creative Consultation</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </Container>
    </Section>
  )
}
