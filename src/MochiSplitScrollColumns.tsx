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
  /** CSS grid value for top row when orientation is 'vertical' (e.g. 'minmax(120px, 200px)') */
  topRow = 'minmax(120px, 200px)',
  gapPx = 28,
  orientation = 'horizontal',
}: {
  left: React.ReactNode
  right: React.ReactNode
  className?: string
  wrapClassName?: string
  leftClassName?: string
  rightClassName?: string
  /** CSS grid value for left column (e.g. 'minmax(320px, 420px)') */
  leftColumn?: string
  /** CSS grid value for top row when orientation is 'vertical' */
  topRow?: string
  gapPx?: number
  /** 'horizontal' = left | right, 'vertical' = top | bottom */
  orientation?: 'horizontal' | 'vertical'
}) {
  const isVertical = orientation === 'vertical'
  return (
    <div className={cn('mochi-splitScroll-wrap', isVertical && 'mochi-splitScroll-wrap--vertical', wrapClassName)}>
      <div
        className={cn('mochi-splitScroll', isVertical && 'mochi-splitScroll--vertical', className)}
        style={
          {
            ['--mochi-split-left' as string]: leftColumn,
            ['--mochi-split-top' as string]: topRow,
            ['--mochi-split-gap' as string]: `${gapPx}px`,
          } as React.CSSProperties
        }
      >
        <div className={cn('mochi-splitScroll-col', isVertical ? 'mochi-splitScroll-col--top' : 'mochi-splitScroll-col--left', leftClassName)}>{left}</div>
        <div className={cn('mochi-splitScroll-col', isVertical ? 'mochi-splitScroll-col--bottom' : 'mochi-splitScroll-col--right', rightClassName)}>{right}</div>
      </div>
    </div>
  )
}
