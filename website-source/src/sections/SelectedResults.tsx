import { motion } from 'framer-motion'
import { campaignResults } from '@data/portfolio.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'
import { TrendingUp, BarChart3, CheckSquare2 } from 'lucide-react'

export function SelectedResults() {
  return (
    <Section id="results" className="border-b border-border/80 bg-background">
      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Selected Campaign Outcomes"
          heading="Measured by results, not just aesthetics."
          subtext="Creative direction must serve a commercial objective. Here is a snapshot of verified campaign benchmarks, conversion lifts, and engagement metrics achieved across recent client projects."
        />

        {/* ── 4-Column Stat Display ─────────────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaignResults.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 border border-border bg-surface flex flex-col justify-between group hover:border-accent/40 transition-colors"
            >
              <div>
                <span className="font-heading font-bold text-display-md text-text-primary group-hover:text-accent transition-colors block tracking-tight">
                  {result.metric}
                </span>

                <h4 className="mt-3 font-heading text-lg font-semibold text-text-primary leading-snug">
                  {result.label}
                </h4>

                <p className="mt-3 font-body text-body-sm text-text-secondary leading-relaxed">
                  {result.subtext}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <span className="font-body text-[11px] uppercase tracking-widest text-accent block">
                  {result.context}
                </span>
                <span className="font-body text-[10px] text-text-secondary/60 mt-0.5 block">
                  {result.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Integrity Notice & Methodology ─────────────────────────────────── */}
        <div className="mt-12 p-6 sm:p-8 border border-border/80 bg-surface/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-accent shrink-0">
              <BarChart3 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CheckSquare2 size={14} className="text-accent" />
                <span className="font-heading text-xs font-semibold uppercase tracking-wider text-text-primary">
                  Data Verification Policy
                </span>
              </div>
              <p className="mt-1 font-body text-body-sm text-text-secondary max-w-2xl">
                Every metric reported is sourced directly from live advertising dashboards (Meta Ads Manager, Google Analytics 4, Shopify Analytics). We never invent benchmarks or extrapolate unverified figures.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-body text-body-sm text-text-primary hover:text-accent transition-colors shrink-0"
          >
            <TrendingUp size={15} />
            <span>Request Specific Industry Data</span>
          </a>
        </div>
      </Container>
    </Section>
  )
}
