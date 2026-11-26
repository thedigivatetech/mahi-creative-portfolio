import { motion } from 'framer-motion'
import { approachSteps } from '@data/portfolio.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'
import { UserCheck, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function MyApproach() {
  return (
    <Section id="process" className="border-b border-border/80 bg-surface/30 relative overflow-hidden">
      {/* Anchor alias support for #approach */}
      <div id="approach" className="absolute -top-24 left-0 w-0 h-0" />

      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Working Process"
          heading="A clear, collaborative five-stage path."
          subtext="From initial alignment to final deployment, you collaborate directly with me. No account handlers, no telephone games — just direct creative leadership."
        />

        {/* ── Direct Partnership Banner ──────────────────────────────────────── */}
        <div className="mt-12 p-6 sm:p-8 border border-border bg-background flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <UserCheck size={20} />
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold text-text-primary">
                Direct Founder Communication Across All Stages
              </h4>
              <p className="mt-0.5 font-body text-body-sm text-text-secondary">
                I am your single point of contact from discovery to optimization, ensuring your vision is never compromised or diluted.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-surface px-4 py-2 border border-border shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-xs font-semibold text-text-primary uppercase tracking-wider">
              5 Dedicated Stages
            </span>
          </div>
        </div>

        {/* ── 5-Stage Editorial Timeline ─────────────────────────────────────── */}
        <div className="mt-12 space-y-6">
          {approachSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-8 sm:p-10 border border-border bg-surface hover:border-accent/60 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Step indicator & stage name */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-heading font-bold text-3xl sm:text-4xl text-accent">
                      {step.step}
                    </span>
                    <span className="w-10 h-px bg-border group-hover:w-16 group-hover:bg-accent transition-all duration-300" />
                    <span className="font-body text-[11px] font-semibold tracking-widest uppercase text-text-secondary bg-background px-2.5 py-1 border border-border">
                      {step.who}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2 font-body text-xs sm:text-sm text-accent font-medium leading-snug">
                    {step.subtitle}
                  </p>
                </div>

                {/* Narrative description */}
                <div className="lg:col-span-5">
                  <p className="font-body text-body-md text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Actionable deliverables / milestones */}
                <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-8">
                  <span className="font-body text-[11px] uppercase tracking-widest text-text-secondary block mb-3">
                    Stage Focus & Output
                  </span>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 font-body text-xs text-text-primary/90"
                      >
                        <CheckCircle2 size={13} className="text-accent mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Accountability Guarantee Callout ────────────────────────────────── */}
        <div className="mt-12 p-8 border border-border bg-background flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-border bg-surface flex items-center justify-center text-accent shrink-0 mt-1">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="font-body text-label uppercase tracking-widest text-accent block mb-1">
                Zero Bureaucracy Commitment
              </span>
              <h4 className="font-heading text-xl font-bold text-text-primary">
                Every asset personally reviewed before delivery.
              </h4>
              <p className="mt-1 font-body text-body-sm text-text-secondary max-w-xl">
                Whether you hire me for a single video edit or coordinate an entire multi-platform campaign, you never have to chase multiple freelancers.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 font-body text-body-sm font-semibold hover:bg-accent/90 shrink-0 transition-colors"
          >
            <span>Start Stage 01: Discover</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </Container>
    </Section>
  )
}
