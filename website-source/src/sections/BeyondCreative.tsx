import { motion } from 'framer-motion'
import { teamCapabilities } from '@data/portfolio.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'
import { Globe, Users, Cpu, ShieldCheck, Sparkles, Database } from 'lucide-react'

const iconMap = [Globe, Users, Sparkles, Cpu, Database]

export function BeyondCreative() {
  return (
    <Section id="beyond-creative" className="border-b border-border/80 bg-surface/30">
      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Extended Delivery Capacity"
          heading="Beyond creative: The power of a full-scale execution team."
          subtext="I maintain complete creative oversight and single-point accountability, while my trusted network of technical and commercial specialists executes your wider digital footprint."
        />

        {/* ── Visual Framework of the Dual Model ────────────────────────────── */}
        <div className="mt-12 p-8 border border-border bg-surface grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-8">
            <span className="font-body text-label uppercase tracking-widest text-accent block mb-2">
              The Founder Model
            </span>
            <h3 className="font-heading text-2xl font-bold text-text-primary">
              One Creative Vision.
            </h3>
            <p className="mt-2 font-body text-body-sm text-text-secondary leading-relaxed">
              You work directly with me for creative direction, video editing, brand strategy, and project oversight. No junior account handlers, no diluted intent, no bureaucratic agency layers.
            </p>
          </div>

          <div>
            <span className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
              The Delivery Architecture
            </span>
            <h3 className="font-heading text-2xl font-bold text-text-primary">
              A Complete Team Behind Execution.
            </h3>
            <p className="mt-2 font-body text-body-sm text-text-secondary leading-relaxed">
              When your business requires full-stack engineering, performance advertising, custom automation, or enterprise software, my vetted specialist team executes seamlessly under my direction.
            </p>
          </div>
        </div>

        {/* ── 5 Core Capabilities Grid ───────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamCapabilities.map((item, index) => {
            const Icon = iconMap[index % iconMap.length]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-8 border border-border bg-surface flex flex-col justify-between hover:border-text-secondary/60 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-bold text-sm text-accent">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h4 className="font-heading text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>

                  <p className="font-body text-xs text-accent/80 font-medium tracking-wide mb-3">
                    {item.lead}
                  </p>

                  <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <span className="font-body text-[11px] uppercase tracking-widest text-text-secondary/70 block mb-2">
                    Specialist Scope
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.scope.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs text-text-primary/80 bg-background px-2.5 py-1 border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Guarantee / Oversight Box */}
          <div className="p-8 border border-border bg-background flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 border border-accent/40 bg-accent/10 flex items-center justify-center text-accent mb-6">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-heading text-xl font-bold text-text-primary">
                Coordinated Oversight Guarantee
              </h4>
              <p className="mt-3 font-body text-body-sm text-text-secondary leading-relaxed">
                You never have to manage separate freelancers, agencies, or contractors. Every deliverable passes through my creative and technical review before delivery.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <span className="font-heading text-xs tracking-wider text-accent uppercase">
                Single Point of Contact
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
