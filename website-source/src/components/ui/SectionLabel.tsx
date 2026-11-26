import { cn } from '@hooks/cn.ts'
import type { HTMLAttributes, ReactNode } from 'react'

interface SectionLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

/** Small all-caps tracking label for identifying sections and categories */
export function SectionLabel({ children, className, ...rest }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block font-body text-label font-medium uppercase tracking-[0.2em] text-text-secondary',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
