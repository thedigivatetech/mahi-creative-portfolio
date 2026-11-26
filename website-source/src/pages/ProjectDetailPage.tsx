import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Target,
  Lightbulb,
  CheckCircle2,
  Share2,
} from 'lucide-react'
import { getProjectById, getRelatedProjects } from '@data/projectsData.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { Tag } from '@components/ui/Tag.tsx'
import { VideoPlayerWithControls } from '@components/gallery/VideoPlayerWithControls.tsx'
import { ImageGalleryViewer } from '@components/gallery/ImageGalleryViewer.tsx'
import { useSeoMeta } from '@hooks/useSeoMeta.ts'
import { useMotion } from '@lib/animation.ts'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = slug ? getProjectById(slug) : undefined
  const m = useMotion()

  // ── Dynamic SEO for each project page ──
  useSeoMeta(
    project
      ? {
          title: `${project.title} — ${project.category} Case Study`,
          description: project.description,
          ogImage: project.poster || project.thumbnail,
          ogType: 'article',
          jsonLd: project.mediaType === 'video'
            ? {
                '@context': 'https://schema.org',
                '@type': 'VideoObject',
                name: project.title,
                description: project.description,
                thumbnailUrl: project.poster || project.thumbnail,
                uploadDate: `${project.year}-01-01`,
                contentUrl: project.mediaUrl,
              }
            : {
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                name: project.title,
                description: project.description,
                image: project.thumbnail,
                dateCreated: project.year,
                creator: { '@type': 'Person', name: 'Syed Hussain' },
              },
        }
      : {}
  )

  if (!project) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center">
        <Container className="text-center">
          <span className="font-heading text-xs uppercase tracking-widest text-accent mb-2 block">
            404 / Case Study Not Found
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-text-primary">
            Project Record Not Located
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto text-sm leading-relaxed">
            The requested project identifier "{slug}" does not match an active case study in the portfolio database.
          </p>
          <div className="mt-8">
            <Link
              to="/#work"
              className="px-6 py-3 bg-accent text-background font-body text-sm font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Return to Work Gallery</span>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  const related = getRelatedProjects(project, 3)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Case study URL copied to clipboard!')
    }
  }

  return (
    <motion.div
      variants={m.page}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 md:pt-36 pb-24"
    >
      <Section noPad className="pb-16">
        <Container>
          {/* ── Top Navigation Bar ────────────────────────────────────────── */}
          <div className="flex items-center justify-between py-4 mb-8 border-b border-border">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-body text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={16} />
              <span>Back to Selected Work</span>
            </Link>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 border border-border text-xs text-text-secondary hover:text-text-primary hover:border-accent transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 size={13} />
              <span>Share Project</span>
            </button>
          </div>

          {/* ── Hero Details Header ───────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Tag>{project.category}</Tag>
              <span className="font-body text-xs text-text-secondary bg-surface px-2.5 py-1 border border-border">
                {project.industry}
              </span>
              <span className="font-heading text-xs text-accent bg-surface px-2.5 py-1 border border-border font-semibold">
                Client: {project.client}
              </span>
              <span className="font-mono text-xs text-text-secondary bg-surface px-2 py-1 border border-border">
                [{project.year}]
              </span>
            </div>

            <h1 className="font-heading font-bold text-display-md sm:text-display-lg text-text-primary leading-tight max-w-4xl">
              {project.title}
            </h1>

            <p className="mt-4 font-body text-body-lg text-text-secondary max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* ── Final Video or Image Gallery ─────────────────────────────── */}
          <div className="border border-border bg-surface mb-14 overflow-hidden">
            <div className="px-5 py-3 bg-background border-b border-border flex items-center justify-between">
              <span className="font-heading text-xs uppercase tracking-wider text-text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Featured Deliverables Presentation
              </span>
              <span className="font-mono text-xs text-accent">
                {project.mediaType === 'video' ? 'Interactive Video' : `${project.gallery?.length || 1} Creative Assets`}
              </span>
            </div>

            {project.mediaType === 'video' ? (
              <div className="bg-black flex items-center justify-center">
                <VideoPlayerWithControls
                  src={project.mediaUrl}
                  poster={project.thumbnail}
                  title={project.title}
                  autoPlay={false}
                  className="w-full aspect-video max-h-[640px]"
                />
              </div>
            ) : (
              <ImageGalleryViewer
                images={project.gallery && project.gallery.length > 0 ? project.gallery : [project.mediaUrl]}
                title={project.title}
              />
            )}
          </div>

          {/* ── Verified Performance Results (If Available) ───────────────── */}
          {project.verifiedResults && project.verifiedResults.length > 0 && (
            <div className="p-8 border border-accent/40 bg-accent/5 mb-14">
              <div className="flex items-center gap-2 text-accent mb-6">
                <TrendingUp size={20} />
                <span className="font-heading text-sm uppercase tracking-wider font-semibold">
                  Verified Performance Results
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.verifiedResults.map((res, i) => (
                  <div
                    key={i}
                    className="p-6 bg-surface border border-border flex flex-col justify-between"
                  >
                    <span className="font-heading text-stat text-accent font-bold">
                      {res.metric}
                    </span>
                    <div className="mt-2">
                      <span className="font-body text-body-md font-semibold text-text-primary block">
                        {res.label}
                      </span>
                      {res.context && (
                        <span className="font-body text-xs text-text-secondary mt-1 block">
                          {res.context}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Strategic 4-Pillar Breakdown ─────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="p-7 border border-border bg-surface/60">
              <div className="flex items-center gap-2 text-text-secondary mb-3">
                <Briefcase size={18} className="text-accent" />
                <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                  The Brief
                </span>
              </div>
              <p className="font-body text-body-md text-text-primary/90 leading-relaxed">
                {project.brief}
              </p>
            </div>

            <div className="p-7 border border-border bg-surface/60">
              <div className="flex items-center gap-2 text-text-secondary mb-3">
                <Target size={18} className="text-accent" />
                <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                  Strategic Objective
                </span>
              </div>
              <p className="font-body text-body-md text-text-primary/90 leading-relaxed">
                {project.projectObjective}
              </p>
            </div>

            <div className="p-7 border border-border bg-surface/60">
              <div className="flex items-center gap-2 text-text-secondary mb-3">
                <Lightbulb size={18} className="text-accent" />
                <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                  Creative Concept
                </span>
              </div>
              <p className="font-body text-body-md text-text-primary/90 leading-relaxed">
                {project.creativeConcept}
              </p>
            </div>

            <div className="p-7 border border-border bg-surface/60">
              <div className="flex items-center gap-2 text-text-secondary mb-3">
                <CheckCircle2 size={18} className="text-accent" />
                <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                  My Contribution
                </span>
              </div>
              <p className="font-body text-body-md text-text-primary/90 leading-relaxed">
                {project.myRole}
              </p>
            </div>
          </div>

          {/* ── Deliverables Scope ────────────────────────────────────────── */}
          <div className="p-8 border border-border bg-surface mb-14">
            <span className="font-heading text-xs uppercase tracking-wider text-text-secondary block mb-4">
              Project Deliverables & Specifications
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.deliverables.map((deliv) => (
                <div
                  key={deliv}
                  className="flex items-center gap-2.5 text-body-sm text-text-primary bg-background px-4 py-3 border border-border"
                >
                  <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Next Project / Related Projects ───────────────────────────── */}
          {related.length > 0 && (
            <div className="pt-10 border-t border-border mb-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-heading text-xs text-accent uppercase tracking-widest block mb-1">
                    Related Case Studies
                  </span>
                  <h3 className="font-heading text-xl font-bold text-text-primary">
                    Complementary Projects
                  </h3>
                </div>
                <Link
                  to="/#work"
                  className="font-body text-xs text-text-secondary hover:text-accent transition-colors"
                >
                  View All Works →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      navigate(`/work/${rel.id}`)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="group text-left border border-border bg-surface p-5 hover:border-accent transition-colors cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Tag>{rel.category}</Tag>
                        <span className="font-mono text-xs text-text-secondary">
                          [{rel.year}]
                        </span>
                      </div>
                      <h4 className="font-heading text-base font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-2 mt-2">
                        {rel.title}
                      </h4>
                      <p className="mt-2 font-body text-xs text-text-secondary line-clamp-2">
                        {rel.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs text-text-secondary group-hover:text-accent">
                      <span>Explore Case</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Call to Action Banner ─────────────────────────────────────── */}
          <div className="p-8 border border-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="font-heading text-xs uppercase tracking-widest text-accent font-semibold block mb-1">
                Commercial Commission
              </span>
              <h3 className="font-heading text-2xl font-bold text-text-primary">
                Have a project in mind for your brand?
              </h3>
              <p className="mt-1 font-body text-body-sm text-text-secondary">
                Let's discuss creative strategy, video production, or visual design tailored to your market.
              </p>
            </div>
            <a
              href="/#contact"
              className="px-6 py-3.5 bg-accent text-background font-body text-sm font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg active:scale-95"
            >
              <span>Start a Project Consultation</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </Container>
      </Section>
    </motion.div>
  )
}
