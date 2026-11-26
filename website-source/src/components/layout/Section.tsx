import { cn } from '@hooks/cn.ts'
import { useReducedMotion, motion, type HTMLMotionProps } from 'framer-motion'
import { useInView } from '@hooks/useInView.ts'
import type { ReactNode } from 'react'

interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'ref'> {
  children: ReactNode
  id?: string
  className?: string
  /**
   * noPad — removes default vertical padding
   * (use when the section itself controls its own padding)
   */
  noPad?: boolean
  /**
   * noReveal — skips the scroll-triggered entrance animation
   * (use for sections that should appear immediately, e.g. hero)
   */
  noReveal?: boolean
}

/**
 * Section — semantic <section> wrapper with consistent vertical rhythm
 * and an optional scroll-triggered fade-up entrance.
 * Respects prefers-reduced-motion automatically.
 */
export function Section({
  children,
  id,
  className,
  noPad = false,
  noReveal = false,
  ...rest
}: SectionProps) {
  const { ref, inView } = useInView(0.1)
  const reduced = useReducedMotion()
  const shouldAnimate = !noReveal && !reduced

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn(!noPad && 'section-y', className)}
      initial={shouldAnimate ? { opacity: 0, y: 28 } : false}
      animate={shouldAnimate ? (inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }) : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
