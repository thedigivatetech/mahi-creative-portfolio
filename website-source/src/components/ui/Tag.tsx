import { cn } from '@hooks/cn.ts'
import type { HTMLAttributes, ReactNode } from 'react'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

/** Inline pill tag — service categories, deliverables, project types */
export function Tag({ children, className, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-body text-label font-medium px-3 py-1 border border-border text-text-secondary tracking-wide uppercase',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
