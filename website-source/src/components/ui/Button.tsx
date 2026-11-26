import { cn } from '@hooks/cn.ts'
import { useReducedMotion } from 'framer-motion'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
    href?: undefined
  }

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    as: 'a'
    href: string
    external?: boolean
  }

type ButtonProps = AsButton | AsAnchor

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent !text-[#111315] font-semibold hover:bg-accent/90 active:bg-accent/80',
  outline:
    'border border-border text-text-primary hover:border-text-secondary active:border-text-primary/60',
  ghost:
    'text-text-primary hover:text-accent',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body-sm',
  lg: 'px-8 py-4 text-body-md',
}

const base =
  'inline-flex items-center justify-center gap-2 font-body font-medium transition-colors duration-200 ease-expo-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40'

// Motion-safe tap scale — apply via CSS active pseudo-class to avoid type conflicts
const tapClass = 'active:scale-95 transition-transform'

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className, fullWidth, ...rest } = props
  const reduced = useReducedMotion()

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    !reduced && tapClass,
    fullWidth && 'w-full',
    className
  )

  if ((rest as AsAnchor).as === 'a') {
    const { as: _as, href, external, ...anchorRest } = rest as AsAnchor
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorRest}
      >
        {children}
      </a>
    )
  }

  const { as: _as, ...btnRest } = rest as AsButton
  return (
    <button className={classes} {...(btnRest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
