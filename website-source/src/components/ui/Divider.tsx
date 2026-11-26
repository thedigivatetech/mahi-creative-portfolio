import { cn } from '@hooks/cn.ts'
import type { HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: boolean
}

export function Divider({ vertical = false, className, ...rest }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      className={cn(
        'shrink-0 bg-border',
        vertical ? 'w-px self-stretch' : 'h-px w-full',
        className
      )}
      {...rest}
    />
  )
}
