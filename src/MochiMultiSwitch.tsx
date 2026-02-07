import * as React from 'react'
import { cn } from './cn'

export type MochiMultiSwitchOption<T extends string = string> = {
  value: T
  label: React.ReactNode
  disabled?: boolean
  ariaLabel?: string
}

export function MochiMultiSwitch<T extends string = string>({
  value,
  onValueChange,
  options,
  ariaLabel = 'Selector',
  className,
}: {
  value: T
  onValueChange: (next: T) => void
  options: Array<MochiMultiSwitchOption<T>>
  ariaLabel?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        // Same visual style as `ui/tabs.tsx` (Proyecciones/What-if).
        'inline-flex h-12 items-center justify-center rounded-[24px] bg-background/60 px-2 py-1 text-muted-foreground',
        'border border-border shadow-sm',
        className,
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((opt) => {
        const active = opt.value === value
        const a11y =
          opt.ariaLabel ||
          (typeof opt.label === 'string' ? opt.label : '') ||
          String(opt.value)
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={a11y}
            disabled={opt.disabled}
            className={cn(
              // Same visual style as `TabsTrigger`.
              'inline-flex items-center justify-center whitespace-nowrap rounded-[18px] px-4 py-2 text-sm font-semibold italic transition-all',
              active
                ? 'bg-white text-foreground shadow-sm'
                : 'bg-transparent text-muted-foreground hover:bg-white/60 hover:text-foreground',
              opt.disabled && 'opacity-50 pointer-events-none',
            )}
            onClick={() => onValueChange(opt.value)}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

