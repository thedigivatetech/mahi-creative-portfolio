import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  advertisingCaseStudies,
  type AdvertisingCaseStudy,
  type ResultType,
} from '@data/advertisingCaseStudies.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'
import {
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  X,
  Target,
  Sparkles,
  ExternalLink,
  Layers,
  Clock,
  Wallet,
  Users,
} from 'lucide-react'

export function AdvertisingCaseStudies() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | ResultType>('all')
  const [activeModalStudy, setActiveModalStudy] = useState<AdvertisingCaseStudy | null>(null)

  const filteredStudies =
    selectedFilter === 'all'
      ? advertisingCaseStudies
      : advertisingCaseStudies.filter((cs) => cs.resultType === selectedFilter)

  const filterTabs = [
    { id: 'all', label: 'All Campaigns', count: advertisingCaseStudies.length },
    {
      id: 'paid',
      label: 'Paid Advertising',
      count: advertisingCaseStudies.filter((cs) => cs.resultType === 'paid').length,
    },
    {
      id: 'organic',
      label: 'Organic Content',
      count: advertisingCaseStudies.filter((cs) => cs.resultType === 'organic').length,
    },
    {
      id: 'combined',
      label: 'Combined Outcomes',
      count: advertisingCaseStudies.filter((cs) => cs.resultType === 'combined').length,
    },
  ]

  const getResultBadgeStyle = (type: ResultType) => {
    switch (type) {
      case 'paid':
        return 'bg-accent/15 border-accent text-accent'
      case 'organic':
        return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
      case 'combined':
        return 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
      default:
        return 'bg-surface border-border text-text-secondary'
    }
  }

  return (
    <Section id="results" className="border-b border-border/80 bg-background relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-accent/2 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Verified Campaign Case Studies"
          heading="Strategy, execution & commercial impact."
          subtext="Creative direction designed for commercial outcomes. Every study unpacks the real business challenge, creative strategy, targeted execution, and verified advertising metrics."
        />

        {/* ── Top-Level Key Metrics Banner ───────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 sm:p-8 border border-border bg-surface flex flex-col justify-between group hover:border-accent/40 transition-colors">
            <span className="font-heading font-bold text-3xl sm:text-5xl text-accent tracking-tight">
              4.2×
            </span>
            <div className="mt-4 pt-4 border-t border-border">
              <span className="font-heading text-sm font-bold text-text-primary block">
                E-Commerce ROAS
              </span>
              <span className="font-body text-xs text-text-secondary mt-0.5 block">
                Meta & TikTok Paid Social Funnel
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 border border-border bg-surface flex flex-col justify-between group hover:border-accent/40 transition-colors">
            <span className="font-heading font-bold text-3xl sm:text-5xl text-text-primary group-hover:text-accent transition-colors tracking-tight">
              580K+
            </span>
            <div className="mt-4 pt-4 border-t border-border">
              <span className="font-heading text-sm font-bold text-text-primary block">
                Verified Global Reach
              </span>
              <span className="font-body text-xs text-text-secondary mt-0.5 block">
                Luxury Fragrance Exhibition Showcase
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 border border-border bg-surface flex flex-col justify-between group hover:border-accent/40 transition-colors">
            <span className="font-heading font-bold text-3xl sm:text-5xl text-text-primary group-hover:text-accent transition-colors tracking-tight">
              +34%
            </span>
            <div className="mt-4 pt-4 border-t border-border">
              <span className="font-heading text-sm font-bold text-text-primary block">
                Click-Through Uplift
              </span>
              <span className="font-body text-xs text-text-secondary mt-0.5 block">
                Regional QSR Promotional Suite
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 border border-border bg-surface flex flex-col justify-between group hover:border-accent/40 transition-colors">
            <span className="font-heading font-bold text-3xl sm:text-5xl text-text-primary group-hover:text-accent transition-colors tracking-tight">
              2.8×
            </span>
            <div className="mt-4 pt-4 border-t border-border">
              <span className="font-heading text-sm font-bold text-text-primary block">
                Investor Inflow Lift
              </span>
              <span className="font-body text-xs text-text-secondary mt-0.5 block">
                Commercial Real Estate Launch
              </span>
            </div>
          </div>
        </div>

        {/* ── Interactive Category Filtering Tabs ─────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-border pb-4">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as 'all' | ResultType)}
                className={`relative px-4 py-2 font-body text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-accent text-background font-semibold border-accent shadow-sm'
                    : 'bg-surface/60 text-text-secondary border-border hover:text-text-primary hover:border-text-secondary/50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`ml-2 text-xs px-1.5 py-0.2 ${
                    isActive ? 'bg-background/20 text-background' : 'bg-background text-text-secondary'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Case Study Cards Grid ───────────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="border border-border bg-surface flex flex-col justify-between hover:border-accent/50 transition-all duration-300 group"
            >
              {/* Media Preview & Thumbnail */}
              <div className="relative aspect-[16/10] bg-background overflow-hidden border-b border-border">
                <img
                  src={study.thumbnail}
                  alt={study.title}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Badge overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className={`font-body text-[10px] uppercase tracking-widest px-2.5 py-1 border font-semibold ${getResultBadgeStyle(
                      study.resultType
                    )}`}
                  >
                    {study.resultBadge}
                  </span>
                  <span className="font-heading text-xs font-bold text-accent bg-background/90 px-2 py-0.5 border border-border">
                    {study.duration}
                  </span>
                </div>

                {/* Client & Industry Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="font-body text-[11px] text-accent uppercase tracking-wider block">
                    {study.client}
                  </span>
                  <span className="font-body text-xs text-text-secondary">
                    {study.industry}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                    {study.title}
                  </h3>

                  <p className="mt-3 font-body text-xs text-text-secondary line-clamp-3 leading-relaxed">
                    <span className="text-text-primary font-medium">Challenge: </span>
                    {study.businessChallenge}
                  </p>

                  {/* Primary Verified Metrics Strip */}
                  <div className="mt-5 grid grid-cols-2 gap-2 pt-4 border-t border-border">
                    {study.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="bg-background p-2.5 border border-border">
                        <span className="font-heading font-bold text-lg text-accent block leading-none">
                          {m.value}
                        </span>
                        <span className="font-body text-[10px] uppercase tracking-wider text-text-secondary mt-1 block line-clamp-1">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {study.platforms.slice(0, 1).map((p) => (
                      <span
                        key={p}
                        className="font-body text-[10px] text-text-secondary bg-background px-2 py-0.5 border border-border line-clamp-1"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalStudy(study)}
                    className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    <span>Full Case Study</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Verification Policy Notice ──────────────────────────────────────── */}
        <div className="mt-12 p-6 sm:p-8 border border-border/80 bg-surface/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-accent shrink-0 mt-0.5">
              <BarChart3 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-accent" />
                <span className="font-heading text-xs font-semibold uppercase tracking-wider text-text-primary">
                  Data Authenticity Commitment
                </span>
              </div>
              <p className="mt-1 font-body text-xs sm:text-body-sm text-text-secondary max-w-2xl leading-relaxed">
                All metrics are derived from live advertising platform analytics (Meta Ads Manager, TikTok Ads, Google Search & Analytics). We never fabricate statistics, fill empty templates, or present unverified projections.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-background px-5 py-2.5 font-body text-xs sm:text-body-sm font-semibold hover:bg-accent/90 transition-colors shrink-0 shadow-sm"
          >
            <TrendingUp size={14} />
            <span>Discuss Campaign Strategy</span>
          </a>
        </div>
      </Container>

      {/* ── 12-Point Detailed Case Study Modal / Viewer ─────────────────────── */}
      <AnimatePresence>
        {activeModalStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalStudy(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeModalStudy.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-border bg-background/80 backdrop-blur flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span
                      className={`font-body text-[10px] uppercase tracking-widest px-2.5 py-0.5 border font-semibold ${getResultBadgeStyle(
                        activeModalStudy.resultType
                      )}`}
                    >
                      {activeModalStudy.resultBadge}
                    </span>
                    <span className="text-text-secondary text-xs">•</span>
                    <span className="font-heading text-xs font-semibold text-accent">
                      {activeModalStudy.client}
                    </span>
                    <span className="text-text-secondary text-xs">•</span>
                    <span className="font-body text-xs text-text-secondary">
                      {activeModalStudy.industry}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                    {activeModalStudy.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="w-10 h-10 border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent transition-colors shrink-0"
                  aria-label="Close Case Study"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Body: Complete 12-Point Structure */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
                {/* 10. Verified Performance Metrics (Top Prominence) */}
                <div>
                  <span className="font-body text-[11px] uppercase tracking-widest text-accent block mb-3">
                    10. Verified Performance Metrics
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeModalStudy.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-4 bg-background border border-border flex flex-col justify-between"
                      >
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-accent block">
                          {m.value}
                        </span>
                        <div className="mt-2 pt-2 border-t border-border/60">
                          <span className="font-heading text-xs font-bold text-text-primary block leading-tight">
                            {m.label}
                          </span>
                          {m.subtext && (
                            <span className="font-body text-[10px] text-text-secondary mt-0.5 block leading-tight">
                              {m.subtext}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaign Meta Strip: Duration, Budget, Platforms */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-background border border-border">
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="font-body text-[10px] uppercase tracking-wider text-text-secondary block">
                        6. Campaign Duration
                      </span>
                      <span className="font-heading text-xs font-bold text-text-primary mt-0.5 block">
                        {activeModalStudy.duration}
                      </span>
                    </div>
                  </div>

                  {activeModalStudy.budget && (
                    <div className="flex items-start gap-3">
                      <Wallet size={16} className="text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-body text-[10px] uppercase tracking-wider text-text-secondary block">
                          7. Advertising Budget
                        </span>
                        <span className="font-heading text-xs font-bold text-text-primary mt-0.5 block">
                          {activeModalStudy.budget}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Layers size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="font-body text-[10px] uppercase tracking-wider text-text-secondary block">
                        5. Advertising Platforms
                      </span>
                      <span className="font-heading text-xs font-bold text-text-primary mt-0.5 block">
                        {activeModalStudy.platforms.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2 & 3: Challenge and Objective */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 border border-border bg-surface/50">
                    <span className="font-body text-[11px] uppercase tracking-widest text-text-secondary block mb-2">
                      2. Business Challenge
                    </span>
                    <p className="font-body text-xs sm:text-body-sm text-text-secondary leading-relaxed">
                      {activeModalStudy.businessChallenge}
                    </p>
                  </div>

                  <div className="p-5 border border-border bg-surface/50">
                    <span className="font-body text-[11px] uppercase tracking-widest text-accent block mb-2">
                      3. Campaign Objective
                    </span>
                    <p className="font-body text-xs sm:text-body-sm text-text-secondary leading-relaxed">
                      {activeModalStudy.campaignObjective}
                    </p>
                  </div>
                </div>

                {/* 4 & 8: Strategy and Creative Execution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 border border-border bg-background">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={14} className="text-accent" />
                      <span className="font-body text-[11px] uppercase tracking-widest text-text-primary font-semibold">
                        4. Strategy & Approach
                      </span>
                    </div>
                    <p className="font-body text-xs sm:text-body-sm text-text-secondary leading-relaxed">
                      {activeModalStudy.strategyApproach}
                    </p>
                  </div>

                  <div className="p-5 border border-border bg-background">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-accent" />
                      <span className="font-body text-[11px] uppercase tracking-widest text-text-primary font-semibold">
                        8. Creative Execution
                      </span>
                    </div>
                    <p className="font-body text-xs sm:text-body-sm text-text-secondary leading-relaxed">
                      {activeModalStudy.creativeExecution}
                    </p>
                  </div>
                </div>

                {/* 9: Audience & Targeting */}
                <div className="p-5 border border-border bg-surface/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={14} className="text-accent" />
                    <span className="font-body text-[11px] uppercase tracking-widest text-text-secondary">
                      9. Audience & Targeting Approach
                    </span>
                  </div>
                  <p className="font-body text-xs sm:text-body-sm text-text-secondary leading-relaxed">
                    {activeModalStudy.audienceTargeting}
                  </p>
                </div>

                {/* 11: Key Findings */}
                <div className="p-5 border border-border bg-background">
                  <span className="font-body text-[11px] uppercase tracking-widest text-accent block mb-3">
                    11. Key Strategic Findings
                  </span>
                  <ul className="space-y-2">
                    {activeModalStudy.keyFindings.map((finding) => (
                      <li key={finding} className="flex items-start gap-2.5 font-body text-xs text-text-primary/90">
                        <CheckCircle2 size={13} className="text-accent mt-0.5 shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 12: My Contribution */}
                <div className="p-5 border-2 border-accent/40 bg-surface">
                  <span className="font-body text-[11px] uppercase tracking-widest text-accent block mb-1">
                    12. My Direct Contribution
                  </span>
                  <p className="font-heading text-sm font-semibold text-text-primary leading-relaxed">
                    {activeModalStudy.myContribution}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-border bg-background flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-body text-xs text-text-secondary">
                  Want similar advertising performance for your brand?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveModalStudy(null)}
                    className="flex-1 sm:flex-none px-4 py-2 border border-border text-text-secondary font-body text-xs hover:text-text-primary hover:border-text-secondary transition-colors"
                  >
                    Close
                  </button>

                  <a
                    href="#contact"
                    onClick={() => setActiveModalStudy(null)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-accent text-background px-5 py-2 font-body text-xs font-semibold hover:bg-accent/90 transition-colors"
                  >
                    <span>Enquire About Campaigns</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  )
}
