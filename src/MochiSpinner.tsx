import { cn } from './cn'
import './MochiControls.css'

export type MochiSpinnerProps = {
  size?: 'default' | 'large'
  tone?: 'dark' | 'light'
  center?: boolean
  /** When true, wrap the spinner in a flex container (flex justify-center items-center). Use wrapperClassName for padding/margin. */
  block?: boolean
  /** Extra classes for the wrapper when block is true (e.g. "px-6 py-4", "mt-2", "min-h-[200px]"). */
  wrapperClassName?: string
  className?: string
}

const DEFAULT_SIZE = 52
const LARGE_WIDTH = 260
const LARGE_HEIGHT = 83
const CX = 26
const CY = 26

export function MochiSpinner({
  size = 'default',
  tone = 'dark',
  center = false,
  block = false,
  wrapperClassName,
  className,
}: MochiSpinnerProps) {
  const isLarge = size === 'large'
  const viewBox = isLarge ? `0 0 ${LARGE_WIDTH} ${LARGE_HEIGHT}` : `0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`

  const spinner = (
    <span
      className={cn(
        'mochi-spinner',
        isLarge && 'mochi-large',
        tone === 'light' && 'mochi-light',
        center && 'mochi-spinner-center',
        className,
      )}
      aria-label="Cargando"
      role="status"
    >
      <svg
        className="mochi-spinner-svg"
        viewBox={viewBox}
        width={isLarge ? undefined : DEFAULT_SIZE}
        height={isLarge ? undefined : DEFAULT_SIZE}
        aria-hidden
      >
        <g className="mochi-spinner-squash">
          {isLarge ? (
            <g transform={`translate(${LARGE_WIDTH / 2}, ${LARGE_HEIGHT / 2}) scale(2.5) translate(-${CX}, -${CY})`}>
              <rect
                className="mochi-spinner-shape"
                x={0}
                y={0}
                width={DEFAULT_SIZE}
                height={DEFAULT_SIZE}
              />
            </g>
          ) : (
            <rect
              className="mochi-spinner-shape"
              x={0}
              y={0}
              width={DEFAULT_SIZE}
              height={DEFAULT_SIZE}
            />
          )}
        </g>
      </svg>
    </span>
  )
  if (block) {
    return (
      <div className={cn('flex justify-center items-center', wrapperClassName)}>
        {spinner}
      </div>
    )
  }
  return spinner
}
