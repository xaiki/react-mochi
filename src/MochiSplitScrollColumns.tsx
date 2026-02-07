import * as React from 'react'
import './MochiSplitScrollColumns.css'
import { cn } from './cn'

export function MochiSplitScrollColumns({
  left,
  right,
  className,
  wrapClassName,
  leftClassName,
  rightClassName,
  leftColumn = 'minmax(320px, 420px)',
  gapPx = 28,
}: {
  left: React.ReactNode
  right: React.ReactNode
  className?: string
  wrapClassName?: string
  leftClassName?: string
  rightClassName?: string
  /** CSS grid value for left column (e.g. 'minmax(320px, 420px)') */
  leftColumn?: string
  gapPx?: number
}) {
  return (
    <div className={cn('mochi-splitScroll-wrap', wrapClassName)}>
      <div
        className={cn('mochi-splitScroll', className)}
        style={
          {
            ['--mochi-split-left' as string]: leftColumn,
            ['--mochi-split-gap' as string]: `${gapPx}px`,
          } as React.CSSProperties
        }
      >
        <div className={cn('mochi-splitScroll-col', 'mochi-splitScroll-col--left', leftClassName)}>{left}</div>
        <div className={cn('mochi-splitScroll-col', 'mochi-splitScroll-col--right', rightClassName)}>{right}</div>
      </div>
    </div>
  )
}
