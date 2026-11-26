import { motion } from 'framer-motion'
import { siteConfig } from '@data/portfolio.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'
import {
  Lightbulb,
  TrendingUp,
  Video,
  Target,
  Users2,
  MessageSquare,
  MapPin,
  ArrowRight,
} from 'lucide-react'

const coreStrengths = [
  {
    icon: Lightbulb,
    title: 'Creative Thinking',
    description:
      'Unconventional visual concepts, storytelling hooks, and aesthetic clarity that capture genuine attention in crowded markets.',
  },
  {
    icon: TrendingUp,
    title: 'Practical Marketing Understanding',
    description:
      'Rooted in commercial reality: understanding consumer psychology, audience attention spans, retention rates, and conversion drivers.',
  },
  {
    icon: Video,
    title: 'Hands-on Content Production',
    description:
      'Deep craft in editing, rhythm, sound design, color grading, and typography. The person advising your brand is actively in the edit suite.',
  },
  {
    icon: Target,
    title: 'Business-Oriented Problem Solving',
    description:
      'Creative choices tied directly to business outcomes — generating inquiries, elevating brand perception, and moving merchandise.',
  },
  {
    icon: Users2,
    title: 'Coordinating Specialist Teams',
    description:
      'Vetted network of web developers, ad specialists, and automation engineers mobilized seamlessly under my direct creative guidance.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Client Communication',
    description:
      'Zero account handlers, zero miscommunication. You collaborate directly with the creative decision-maker from concept to delivery.',
  },
]

export function AboutMe() {
  return (
    <Section id="about" className="border-b border-border/80 bg-background relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Founder & Creative Director"
          heading="Independent creative leadership. Grounded in craft."
          subtext="I help businesses bridge the gap between ambitious creative vision and commercial execution — working directly with founders and marketing teams."
        />

        {/* ── Editorial Two-Column Biography ─────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Presentation Plate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative border border-border bg-surface overflow-hidden aspect-[3/4] shadow-2xl">
              <img
                src="/images/profile/mahi-portrait.jpg"
                alt="Syed Hussain — Creative Director & Video Editor"
                className="w-full h-full object-cover object-center filter contrast-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-heading font-bold text-2xl text-text-primary block">
                  {siteConfig.name}
                </span>
                <span className="font-body text-body-sm text-accent font-medium block">
                  Independent Creative & Digital Professional
                </span>
                <div className="flex items-center gap-2 mt-2 text-text-secondary font-body text-xs">
                  <MapPin size={13} className="text-accent" />
                  <span>{siteConfig.location}</span>
                </div>
              </div>
            </div>

            {/* Editorial Philosophy Tag Plate */}
            <div className="mt-4 p-5 border border-border bg-surface">
              <span className="font-body text-label uppercase tracking-widest text-accent block mb-1">
                Direct Partnership
              </span>
              <p className="font-heading text-sm text-text-primary font-medium leading-relaxed">
                “Every client relationship is personal. When we work together, I am your creative director, lead editor, and project partner.”
              </p>
            </div>
          </motion.div>

          {/* Right Column: Narrative Biography & Core Strengths Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 font-body text-body-md text-text-secondary leading-relaxed">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight leading-snug">
                I believe modern brands need creative partners who can think strategically and execute hands-on.
              </h3>
              <p>
                As an independent creative professional based in the United Kingdom, I help businesses bring their ideas to life through high-retention video editing, creative strategy, and digital systems.
              </p>
              <p>
                Too often, companies face a frustrating choice: hire large traditional agencies where work is diluted through layers of account executives, or juggle disconnected freelancers who lack strategic cohesion.
              </p>
              <p>
                My model is intentionally different. You collaborate with me directly for creative vision, content direction, and post-production craft. When your project expands into custom web development, paid ad campaigns, or business automation, I coordinate vetted specialist partners to deliver complete solutions with zero operational friction for you.
              </p>
            </div>

            {/* 6 Core Professional Capabilities Grid */}
            <div className="pt-6 border-t border-border">
              <span className="font-body text-label uppercase tracking-widest text-text-secondary block mb-4">
                Core Capabilities & Principles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreStrengths.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="p-4 bg-surface border border-border/80 flex flex-col justify-between hover:border-accent/50 transition-colors group"
                    >
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-7 h-7 rounded-none bg-background border border-border flex items-center justify-center text-accent group-hover:border-accent transition-colors">
                            <Icon size={14} />
                          </div>
                          <h4 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                            {item.title}
                          </h4>
                        </div>
                        <p className="font-body text-xs text-text-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Direct Connect Link */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 font-body text-body-sm font-semibold hover:bg-accent/90 transition-colors"
              >
                <span>Get In Touch With Mahi</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#process"
                className="font-body text-body-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4"
              >
                View Working Process
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
