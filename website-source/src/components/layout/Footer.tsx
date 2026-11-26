import { siteConfig, navLinks } from '@data/portfolio.ts'
import { Divider } from '@components/ui/Divider.tsx'
import { Container } from '@components/layout/Container.tsx'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border" role="contentinfo">
      <Container className="py-12 md:py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16">
          {/* Brand block */}
          <div className="flex flex-col gap-3 max-w-xs">
            <a
              href="#top"
              className="font-heading font-semibold text-sm text-text-primary hover:text-accent transition-colors duration-200 w-fit"
            >
              {siteConfig.name}
            </a>
            <p className="font-body text-body-sm text-text-secondary leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="font-body text-body-sm text-text-secondary">
              {siteConfig.location}
            </p>
          </div>

          {/* Nav + contact columns */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 md:gap-24">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <span className="font-body text-label uppercase tracking-[0.2em] text-text-secondary mb-1">
                Navigation
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-200 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <span className="font-body text-label uppercase tracking-[0.2em] text-text-secondary mb-1">
                Get in touch
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-body text-body-sm text-text-secondary hover:text-accent transition-colors duration-200 w-fit"
              >
                {siteConfig.email}
              </a>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft"
                  aria-hidden="true"
                />
                <span className="font-body text-body-sm text-text-secondary">
                  {siteConfig.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-body-sm text-text-secondary">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-body text-body-sm text-text-secondary">
            UK-based independent creative professional
          </p>
        </div>
      </Container>
    </footer>
  )
}
