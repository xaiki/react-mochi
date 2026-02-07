import './MochiRadio.css'
import { cn } from './cn'

export type MochiRadioState = 'unchecked' | 'checked' | 'mixed'

export function MochiRadio({
  state,
  onToggle,
  ariaLabel,
  disabled = false,
  className,
  variant = 'default',
}: {
  state: MochiRadioState
  onToggle: () => void
  ariaLabel: string
  disabled?: boolean
  className?: string
  /** 'group' shows a stack/group icon when checked (for ALL / metaevents). */
  variant?: 'default' | 'group'
}) {
  const ariaChecked: boolean | 'mixed' = state === 'mixed' ? 'mixed' : state === 'checked'
  return (
    <button
      type="button"
      className={cn('mochi-radio', variant === 'group' && 'mochi-radio--group', className)}
      role="checkbox"
      aria-checked={ariaChecked}
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : 'false'}
      data-state={state}
      data-variant={variant}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return
        onToggle()
      }}
    >
      <span className="mochi-radioIcon" aria-hidden="true" />
    </button>
  )
}

