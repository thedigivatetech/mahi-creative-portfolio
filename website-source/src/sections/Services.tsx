import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { serviceGroups } from '@data/servicesData.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Users,
  Compass,
  ChevronRight,
} from 'lucide-react'

export function Services() {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id))
  }

  const group1 = serviceGroups[0]
  const group2 = serviceGroups[1]
  const group3 = serviceGroups[2]

  const heroServices = group1.services.filter((s) => s.isHeroService)
  const remainingGroup1Services = group1.services.filter((s) => !s.isHeroService)

  return (
    <Section id="services" className="border-b border-border/80 bg-background relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-accent/2 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Services & Capabilities"
          heading="Creative leadership. Complete execution."
          subtext="I lead every client relationship and creative project personally. When your vision requires wider digital scale, my vetted specialist team executes under my direct oversight."
        />

        {/* ── Dual Model & Flexible Engagement Statement ────────────────── */}
        <div className="mt-12 p-8 sm:p-10 border border-border bg-surface/80 relative shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/30 text-accent font-body text-label uppercase tracking-widest">
                <Compass size={12} />
                <span>Flexible Engagement Model</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Work with me on a focused craft, or engage full-scale delivery.
              </h3>
              <p className="font-body text-body-md text-text-secondary leading-relaxed max-w-2xl">
                You can engage me directly for a single specialized deliverable — such as high-impact video editing or an intensive creative consultation — or bring me in to direct and coordinate a multi-disciplinary branding, web, and technology rollout.
              </p>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-none border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Shield size={16} />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-text-primary uppercase tracking-wider">
                    Direct Point of Contact
                  </h4>
                  <p className="font-body text-xs text-text-secondary mt-1">
                    No account handlers or middlemen. You always speak directly with the creative director responsible for your brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* GROUP 1 — CREATIVE & CONTENT (STRONGEST VISUAL PROMINENCE)           */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="mt-20">
          {/* Group 1 Header Banner */}
          <div className="p-8 sm:p-10 border-2 border-accent/40 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="max-w-3xl relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-heading text-xs font-bold text-accent tracking-widest uppercase">
                  {group1.groupNumber}
                </span>
                <span className="text-text-secondary text-xs">•</span>
                <span className="font-body text-xs tracking-wider uppercase text-accent bg-accent/10 px-2.5 py-0.5 border border-accent/30 font-semibold">
                  {group1.badgeText}
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
                {group1.name}
              </h3>
              <p className="mt-3 font-body text-body-md text-text-secondary leading-relaxed">
                {group1.description}
              </p>
            </div>

            {/* Group 1 CTA */}
            <div className="shrink-0 relative z-10">
              <a
                href={group1.ctaHref}
                className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3.5 font-body text-body-sm font-semibold hover:bg-accent/90 transition-colors shadow-md"
              >
                <span>{group1.ctaLabel}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Three Featured Hero Specialisms: Video Editing, Creative Consultation, Content Production */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {heroServices.map((hero, i) => (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border-2 border-accent/50 bg-surface/90 relative flex flex-col justify-between group hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-xs font-bold text-accent px-2.5 py-1 bg-accent/15 border border-accent/40 tracking-wider uppercase">
                      Primary Core Specialism
                    </span>
                    <Sparkles size={16} className="text-accent" />
                  </div>

                  <h4 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                    {hero.title}
                  </h4>

                  <p className="mt-2 font-body text-xs text-accent font-medium tracking-wide">
                    {hero.lead}
                  </p>

                  <p className="mt-4 font-body text-body-sm text-text-secondary leading-relaxed">
                    {hero.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <span className="font-body text-[11px] uppercase tracking-widest text-text-secondary block mb-3">
                    Direct Deliverables
                  </span>
                  <ul className="space-y-2">
                    {hero.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-body text-xs text-text-primary/90"
                      >
                        <CheckCircle2 size={13} className="text-accent mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Group 1 Deliverables: Short-Form Reels, Commercial Video, Photo Editing, Graphic Design, Content Strategy */}
          <div className="mt-8 pt-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-body text-label uppercase tracking-widest text-text-secondary">
                Additional Creative & Design Deliverables
              </span>
              <span className="font-body text-xs text-accent font-medium">
                Personally Directed & Executed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {remainingGroup1Services.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 border border-border bg-surface/60 hover:border-text-secondary/70 hover:bg-surface transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="font-heading text-[10px] text-accent tracking-wider uppercase block mb-1">
                      Creative Craft
                    </span>
                    <h5 className="font-heading text-base font-bold text-text-primary group-hover:text-accent transition-colors">
                      {sub.title}
                    </h5>
                    <p className="mt-2 font-body text-[11px] text-text-secondary leading-relaxed line-clamp-3">
                      {sub.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60">
                    <ul className="space-y-1">
                      {sub.deliverables.slice(0, 2).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-1.5 font-body text-[11px] text-text-primary/80 line-clamp-1"
                        >
                          <span className="w-1 h-1 bg-accent rounded-full mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* EXTENDED TEAM DELIVERY BRIDGE                                        */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="mt-24 p-8 border border-border bg-surface/40 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 border border-border bg-background flex items-center justify-center text-accent shrink-0 mt-0.5">
                <Users size={22} />
              </div>
              <div>
                <span className="font-body text-label uppercase tracking-widest text-accent block mb-1">
                  Beyond Creative — Extended Capacity
                </span>
                <h4 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                  Scale your digital presence without managing multiple agencies.
                </h4>
                <p className="mt-1 font-body text-body-sm text-text-secondary max-w-2xl leading-relaxed">
                  When your project requires websites, advertising infrastructure, automation, or software, my vetted specialist team executes under my direct creative guidance and technical oversight.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-background px-4 py-2 border border-border">
                <Shield size={14} className="text-accent" />
                <span className="font-body text-xs text-text-primary font-medium">
                  Single Point of Accountability
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* GROUP 2 — BRAND & DIGITAL MANAGEMENT (EXTENDED TEAM CAPABILITY)       */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="mt-16">
          {/* Group 2 Header */}
          <div className="p-8 border border-border bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-heading text-xs font-bold text-accent tracking-widest uppercase">
                  {group2.groupNumber}
                </span>
                <span className="text-text-secondary text-xs">•</span>
                <span className="font-body text-xs tracking-wider uppercase text-text-secondary bg-background px-2.5 py-0.5 border border-border">
                  {group2.badgeText}
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                {group2.name}
              </h3>
              <p className="mt-2 font-body text-body-sm text-text-secondary leading-relaxed">
                {group2.description}
              </p>
            </div>

            {/* Group 2 CTA */}
            <div className="shrink-0">
              <a
                href={group2.ctaHref}
                className="inline-flex items-center gap-2 bg-background border border-border text-text-primary hover:border-accent hover:text-accent px-5 py-3 font-body text-body-sm font-semibold transition-colors"
              >
                <span>{group2.ctaLabel}</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Group 2 Cards Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group2.services.map((item, idx) => {
              const isExpanded = expandedServiceId === item.id

              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-7 border border-border bg-surface flex flex-col justify-between hover:border-text-secondary/70 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-heading text-xs font-bold text-accent">
                        0{idx + 1}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="font-body text-[10px] text-text-secondary bg-background px-2 py-0.5 border border-border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>

                    <p className="mt-1 font-body text-xs text-accent/90 font-medium">
                      {item.lead}
                    </p>

                    <p className="mt-3 font-body text-body-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between text-left font-body text-xs text-text-primary/90 hover:text-accent transition-colors"
                    >
                      <span className="uppercase tracking-wider font-semibold text-[11px]">
                        {isExpanded ? 'Hide Deliverables' : 'View Deliverables'}
                      </span>
                      <ChevronRight
                        size={14}
                        className={`transform transition-transform ${
                          isExpanded ? 'rotate-90 text-accent' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-3 pt-3 border-t border-border/60"
                        >
                          <ul className="space-y-1.5">
                            {item.deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-2 font-body text-xs text-text-secondary"
                              >
                                <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* GROUP 3 — TECHNOLOGY & AUTOMATION (EXTENDED TEAM CAPABILITY)         */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="mt-20">
          {/* Group 3 Header */}
          <div className="p-8 border border-border bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-heading text-xs font-bold text-accent tracking-widest uppercase">
                  {group3.groupNumber}
                </span>
                <span className="text-text-secondary text-xs">•</span>
                <span className="font-body text-xs tracking-wider uppercase text-text-secondary bg-background px-2.5 py-0.5 border border-border">
                  {group3.badgeText}
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                {group3.name}
              </h3>
              <p className="mt-2 font-body text-body-sm text-text-secondary leading-relaxed">
                {group3.description}
              </p>
            </div>

            {/* Group 3 CTA */}
            <div className="shrink-0">
              <a
                href={group3.ctaHref}
                className="inline-flex items-center gap-2 bg-background border border-border text-text-primary hover:border-accent hover:text-accent px-5 py-3 font-body text-body-sm font-semibold transition-colors"
              >
                <span>{group3.ctaLabel}</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Group 3 Cards Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group3.services.map((item, idx) => {
              const isExpanded = expandedServiceId === item.id

              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-7 border border-border bg-surface flex flex-col justify-between hover:border-text-secondary/70 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-heading text-xs font-bold text-accent">
                        0{idx + 1}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="font-body text-[10px] text-text-secondary bg-background px-2 py-0.5 border border-border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>

                    <p className="mt-1 font-body text-xs text-accent/90 font-medium">
                      {item.lead}
                    </p>

                    <p className="mt-3 font-body text-body-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between text-left font-body text-xs text-text-primary/90 hover:text-accent transition-colors"
                    >
                      <span className="uppercase tracking-wider font-semibold text-[11px]">
                        {isExpanded ? 'Hide Deliverables' : 'View Deliverables'}
                      </span>
                      <ChevronRight
                        size={14}
                        className={`transform transition-transform ${
                          isExpanded ? 'rotate-90 text-accent' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-3 pt-3 border-t border-border/60"
                        >
                          <ul className="space-y-1.5">
                            {item.deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-2 font-body text-xs text-text-secondary"
                              >
                                <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Closing Coordination Callout Banner ─────────────────────────────── */}
        <div className="mt-20 p-8 sm:p-10 border border-border bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-body text-label uppercase tracking-widest text-accent block mb-1">
              Coordinated Multi-Disciplinary Delivery
            </span>
            <h4 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
              Have a complex project spanning video, branding, web and automation?
            </h4>
            <p className="mt-2 font-body text-body-sm text-text-secondary max-w-xl leading-relaxed">
              We begin with a strategic conversation with me to define the creative vision, followed by coordinated execution with the specialist team.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3.5 font-body text-body-sm font-semibold hover:bg-accent/90 shrink-0 transition-colors shadow-md"
          >
            <span>Discuss A Multi-Service Project</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </Container>
    </Section>
  )
}
