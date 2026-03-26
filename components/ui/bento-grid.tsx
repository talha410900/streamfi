import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className?: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
  /** Optional accent stripe (e.g. primary left border) */
  featured?: boolean
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-min grid-cols-1 gap-5 md:grid-cols-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  featured,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow duration-300 hover:shadow-md",
      featured && "border-primary/25 ring-1 ring-primary/15",
      className
    )}
    {...props}
  >
    {/* Decorative layer — stays behind copy */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {background}
    </div>

    <div
      className={cn(
        "relative z-[2] mt-auto flex flex-col gap-3 border-t border-border/80 bg-card/95 p-5 backdrop-blur-[2px] dark:bg-card/90",
        featured && "border-primary/20"
      )}
    >
      <div className="flex gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/60 text-foreground shadow-sm",
            featured && "border-primary/30 bg-primary/10 text-primary"
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground md:text-base">
            {name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      <a
        href={href}
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        {cta}
        <ArrowRightIcon className="size-3.5 opacity-80" />
      </a>
    </div>
  </div>
)

export { BentoCard, BentoGrid }
