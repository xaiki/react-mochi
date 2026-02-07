export function MochiCounter({
  count,
  ariaLabel = 'Cantidad',
}: {
  count: number
  ariaLabel?: string
}) {
  return (
    <div className="mochi-pane-headerCount" aria-label={ariaLabel}>
      {count}
    </div>
  )
}

