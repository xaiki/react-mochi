import './MochiStatusPill.css'
import { cn } from './cn'

export type MochiStatusPillProps = {
  /** Used to pick colors via CSS selectors (data-status). */
  status: string
  /** Display label for the pill (e.g. "FALTA FIRMA", "Firmado"). */
  label: string
  /** Optional counter bubble (e.g. firmas faltantes). */
  count?: number | null
  /** Optional dot inside the full pill (before label). */
  dot?: boolean
  compact?: boolean
  className?: string
  ariaLabel?: string
  dataStatus?: string
  showCount?: boolean
}

export function MochiStatusPillFull({
  label,
  count,
  dot = false,
  dataStatus,
  status,
  showCount = false,
  className,
}: MochiStatusPillProps) {
  const ds = dataStatus ?? String(status || '').toUpperCase()
  return (
    <span className={cn('mochi-pill-full mochi-status-pill', className)} aria-hidden="true" data-status={ds}>
      {dot ? <span className="mochi-status-pillDot mochi-contact-dot" data-status={ds} aria-hidden="true" /> : null}
      {label}
      {showCount ? <span className="mochi-status-pillCount">{count}</span> : null}
    </span>
  )
}

export function MochiStatusPillCompact({ dataStatus, status, count, showCount, className }: MochiStatusPillProps) {
  const ds = dataStatus ?? String(status || '').toUpperCase()
  const safeCount = typeof count === 'number' && Number.isFinite(count) ? count : 0
  return (
    <span className={cn('mochi-pill-compact', className)} aria-hidden="true">
      <span className="mochi-pill-dot mochi-contact-dot" data-status={ds} />
      <span className={cn('mochi-status-pillCount', !showCount && 'mochi-status-pillCount--ghost')}>
        {showCount ? safeCount : 0}
      </span>
    </span>
  )
}

export function MochiStatusPillDot({ dataStatus, status, className }: MochiStatusPillProps) {
  const ds = dataStatus ?? String(status || '').toUpperCase()
  return (
    <span className={cn('mochi-pill-dot mochi-contact-dot', className)} aria-hidden="true" data-status={ds} />
  )
}

/**
 * Mochi status pill with responsive fallback:
 * - full: pill with label (+ optional count bubble)
 * - compact: colored dot (+ optional count bubble)
 *
 * The switch is CSS-driven via container queries (`.mochi-pill*` rules).
 */
export function MochiStatusPill({ status, label, count, dot = false, compact = false, className, ariaLabel }: MochiStatusPillProps) {
  const dataStatus = String(status || '').toUpperCase()
  const n = typeof count === 'number' && Number.isFinite(count) ? count : null
  const showCount = n != null && n > 0

  const a11y = ariaLabel ?? (showCount ? `${label} (${n})` : label)

  return (
    <span className={cn('mochi-pill', className)} role="status" aria-label={a11y} data-status={dataStatus}>
      {compact ? (
        <MochiStatusPillCompact status={status} label={label} count={count} dataStatus={dataStatus} showCount={showCount} />
      ) : (
        <MochiStatusPillFull
          status={status}
          label={label}
          count={count}
          dot={dot}
          dataStatus={dataStatus}
          showCount={showCount}
        />
      )}
    </span>
  )
}

