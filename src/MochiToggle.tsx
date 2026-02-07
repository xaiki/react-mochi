import './MochiToggle.css'
import { cn } from './cn'

export function MochiToggle({
  checked,
  onCheckedChange,
  ariaLabel,
  disabled = false,
  onLabel = 'SI',
  offLabel = 'NO',
  size = 'sm',
  variant = 'labels',
  className,
}: {
  checked: boolean
  onCheckedChange: (next: boolean) => void
  ariaLabel: string
  disabled?: boolean
  onLabel?: string
  offLabel?: string
  size?: 'sm' | 'md'
  /** 'labels' = SI/NO; 'switchOnly' = solo switch compacto sin texto */
  variant?: 'labels' | 'switchOnly'
  className?: string
}) {
  const state = checked ? 'on' : 'off'
  const isSwitchOnly = variant === 'switchOnly'
  return (
    <button
      type="button"
      className={cn(
        'mochi-toggle',
        size === 'md' && 'mochi-toggle--md',
        isSwitchOnly && 'mochi-toggle--switchOnly',
        className
      )}
      role="switch"
      aria-checked={checked ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : 'false'}
      data-state={state}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return
        onCheckedChange(!checked)
      }}
    >
      <span className="mochi-toggleTrack" aria-hidden="true">
        {!isSwitchOnly && (
          <span className="mochi-toggleLabels" aria-hidden="true">
            <span className="mochi-toggleLabel mochi-toggleLabel--on">{onLabel}</span>
            <span className="mochi-toggleLabel mochi-toggleLabel--off">{offLabel}</span>
          </span>
        )}
        <span className="mochi-toggleKnob" aria-hidden="true" />
      </span>
    </button>
  )
}

