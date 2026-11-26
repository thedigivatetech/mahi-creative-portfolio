import { cn } from '@hooks/cn.ts'
import type { ElementType, ReactNode } from 'react'

type ContainerVariant = 'site' | 'narrow'

interface ContainerProps {
  children: ReactNode
  variant?: ContainerVariant
  as?: ElementType
  className?: string
}

/**
 * Container — responsive, max-width layout wrapper.
 *
 * variant="site"   → max-w-[1440px], full horizontal padding scale
 * variant="narrow" → max-w-[900px], used for text-heavy pages
 */
export function Container({
  children,
  variant = 'site',
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        variant === 'site'   && 'container-site',
        variant === 'narrow' && 'container-narrow',
        className
      )}
    >
      {children}
    </Tag>
  )
}
