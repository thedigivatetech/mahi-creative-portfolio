/**
 * animation.ts — Shared Framer Motion variants and helpers.
 *
 * All animation props are gated behind `useReducedMotion()` in each component.
 * Import `useMotion` to get pre-checked variants that collapse to no-ops when
 * the user prefers reduced motion.
 */

import { useReducedMotion, type Variants } from 'framer-motion'

// ── Shared easing ──────────────────────────────────────────────────────────────
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_OUT: [number, number, number, number] = [0, 0, 0.3, 1]

// ── Reusable variant sets ──────────────────────────────────────────────────────

/** Fade up — used for single elements that reveal on mount or scroll */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
}

/** Fade in — no movement, just opacity */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

/** Stagger container — parent controls children delay */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

/** Stagger child — used inside staggerContainerVariants */
export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_EXPO },
  },
}

/** Slide in from left */
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
}

/** Page transition — for route-level AnimatePresence wrapping */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_EXPO },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
}

// ── Hook — returns reduced variants when motion is not preferred ───────────────

type MotionVariants = {
  fadeUp: Variants
  fadeIn: Variants
  staggerContainer: Variants
  staggerChild: Variants
  slideInLeft: Variants
  page: Variants
  /** Whether reduced motion is preferred — use to conditionally skip whileHover / whileTap */
  reduced: boolean
  /** Tap scale — pass spread to motion elements: {...m.tap} */
  tap: { whileTap?: { scale: number } }
  /** Hover scale — pass spread to motion elements: {...m.hover} */
  hover: { whileHover?: { scale: number; boxShadow?: string } }
}


const IDENTITY_VARIANTS: Variants = {
  hidden: {},
  visible: {},
}

/**
 * useMotion — returns either real or no-op motion variants depending on the
 * user's `prefers-reduced-motion` media query.
 *
 * Usage:
 *   const m = useMotion()
 *   <motion.div variants={m.fadeUp} initial="hidden" animate="visible" />
 *   <motion.button {...m.tap}>Click me</motion.button>
 */
export function useMotion(): MotionVariants {
  const reduced = useReducedMotion() ?? false

  if (reduced) {
    return {
      fadeUp: IDENTITY_VARIANTS,
      fadeIn: IDENTITY_VARIANTS,
      staggerContainer: IDENTITY_VARIANTS,
      staggerChild: IDENTITY_VARIANTS,
      slideInLeft: IDENTITY_VARIANTS,
      page: { initial: {}, animate: {}, exit: {} },
      reduced: true,
      tap: {},
      hover: {},
    }
  }

  return {
    fadeUp: fadeUpVariants,
    fadeIn: fadeInVariants,
    staggerContainer: staggerContainerVariants,
    staggerChild: staggerChildVariants,
    slideInLeft: slideInLeftVariants,
    page: pageVariants,
    reduced: false,
    tap: { whileTap: { scale: 0.96 } },
    hover: { whileHover: { scale: 1.02 } },
  }
}
