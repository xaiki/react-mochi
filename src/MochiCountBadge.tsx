import './MochiCountBadge.css'

export function MochiCountBadge({ count, ariaLabel = 'Cantidad' }: { count: number; ariaLabel?: string }) {
  const n = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0
  return (
    <span className="mochi-countBadge" aria-label={ariaLabel}>
      {n}
    </span>
  )
}

