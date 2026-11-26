import { Container } from '@components/layout/Container.tsx'
import { Button } from '@components/ui/Button.tsx'

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24">
      <Container className="text-center">
        <span className="font-heading font-bold text-display-xl text-accent block leading-none">
          404
        </span>
        <h1 className="mt-4 font-heading font-bold text-display-sm text-text-primary">
          Page Not Found
        </h1>
        <p className="mt-3 font-body text-body-md text-text-secondary max-w-sm mx-auto">
          The page or case study you requested does not exist or has been relocated.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button as="a" href="/" variant="primary">
            Return Home
          </Button>
        </div>
      </Container>
    </div>
  )
}
