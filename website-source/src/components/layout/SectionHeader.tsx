import { cn } from '@hooks/cn.ts'
import { useInView } from '@hooks/useInView.ts'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  label?: string
  heading: ReactNode
  subtext?: string
  align?: 'left' | 'center'
  headingAs?: 'h1' | 'h2' | 'h3'
  className?: string
  /**
   * action — optional element placed to the right of the label row
   * (e.g. "View all →" link)
   */
  action?: ReactNode
}

/**
 * SectionHeader — consistent label + heading + optional subtext.
 * Scroll-triggered entrance animation via useInView.
 */
export function SectionHeader({
  label,
  heading,
  subtext,
  align = 'left',
  headingAs: Heading = 'h2',
  className,
  action,
}: SectionHeaderProps) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {/* Label row */}
      {(label || action) && (
        <motion.div
          className={cn(
            'flex items-center',
            action ? 'justify-between' : 'justify-start'
          )}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {label && (
            <span className="font-body text-label font-medium uppercase tracking-[0.2em] text-text-secondary">
              {label}
            </span>
          )}
          {action && <div className="ml-auto">{action}</div>}
        </motion.div>
      )}

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
      >
        <Heading
          className={cn(
            'font-heading font-bold text-display-md text-text-primary',
            align === 'center' && 'text-balance'
          )}
        >
          {heading}
        </Heading>
      </motion.div>

      {/* Subtext */}
      {subtext && (
        <motion.p
          className={cn(
            'font-body text-body-lg text-text-secondary max-w-prose-tight',
            align === 'center' && 'mx-auto'
          )}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  )
}
