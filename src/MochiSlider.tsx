import * as React from 'react'
import { cn } from './cn'
import './MochiSlider.css'

export type MochiSliderProps = {
  value: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  onChange: (value: number) => void
  onChanging?: (value: number) => void
  valueLabel?: (value: number) => string
  /** When provided, ticks are drawn at each data point with these labels below the track */
  tickLabels?: string[]
}

export function MochiSlider({
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
  onChange,
  onChanging,
  valueLabel,
  tickLabels,
}: MochiSliderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const knobRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [popupLeftPx, setPopupLeftPx] = React.useState(0)
  const [popupTopPx, setPopupTopPx] = React.useState(0)

  const effectiveMax = Math.max(min, max)
  const range = effectiveMax - min
  const percent =
    range <= 0 ? 0 : Math.min(1, Math.max(0, (value - min) / range))
  const knobLeft = `${percent * 100}%`
  const inputMax = range <= 0 ? min : effectiveMax

  const displayLabel = valueLabel ? valueLabel(value) : String(Math.round(value))

  // Tip position inside bubble: left edge at 0%, right edge at 100%
  const popupWidth = 62
  const popupHeight = 37
  const triangleHalfWidth = 8
  const tipMin = triangleHalfWidth
  const tipMax = popupWidth - triangleHalfWidth
  const tipX = tipMin + percent * (tipMax - tipMin)
  const atLeft = percent <= 0.05
  const atRight = percent >= 0.95
  const bubbleRadius = 10
  const radiusBl = atLeft ? 0 : bubbleRadius
  const radiusBr = atRight ? 0 : bubbleRadius

  const hasTicks = tickLabels != null && tickLabels.length > 0
  const tickCount = hasTicks ? tickLabels.length : 0
  const tickPercent = (i: number) =>
    tickCount <= 1 ? 50 : (i / (tickCount - 1)) * 100

  // Position gota above the knob so the tip points at the handler
  const updatePopupPosition = React.useCallback(() => {
    const container = containerRef.current
    const knob = knobRef.current
    if (!container || !knob) return
    const cb = container.getBoundingClientRect()
    const kb = knob.getBoundingClientRect()
    const gap = 6
    const leftPx = kb.left - cb.left + kb.width / 2 - tipX
    const topPx = kb.top - cb.top - popupHeight - gap
    setPopupLeftPx(Math.max(0, Math.min(leftPx, cb.width - popupWidth)))
    setPopupTopPx(topPx)
  }, [tipX])

  React.useLayoutEffect(() => {
    updatePopupPosition()
  }, [percent, tipX, updatePopupPosition])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(updatePopupPosition)
    ro.observe(container)
    return () => ro.disconnect()
  }, [updatePopupPosition])

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value)
      onChanging?.(v)
      onChange(v)
    },
    [onChange, onChanging],
  )

  const handleInput = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const v = Number((e.target as HTMLInputElement).value)
      onChanging?.(v)
    },
    [onChanging],
  )

  const handlePointerDown = React.useCallback(() => {
    if (disabled) return
    setIsDragging(true)
  }, [disabled])

  const handlePointerUp = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  React.useEffect(() => {
    if (!isDragging) return
    const onUp = () => setIsDragging(false)
    window.addEventListener('pointerup', onUp)
    return () => window.removeEventListener('pointerup', onUp)
  }, [isDragging])

  // Gota only visible when user has clicked/dragging the handler
  React.useEffect(() => {
    if (!isDragging) return
    const id = requestAnimationFrame(updatePopupPosition)
    return () => cancelAnimationFrame(id)
  }, [isDragging, updatePopupPosition])

  return (
    <div
      ref={containerRef}
      className={cn(
        'mochi-slider',
        isDragging && 'mochi-slider--show-popup',
        isDragging && 'mochi-slider--dragging',
        disabled && 'mochi-slider--disabled',
        className,
      )}
      role="group"
      aria-label="Slider"
    >
      {/* ProgressBar: track + filled bar + optional ticks */}
      <div className={cn('mochi-slider-track-wrap', hasTicks && 'mochi-slider--with-ticks')}>
        <div className="mochi-progress-bar">
          <div
            className="mochi-progress-bar-bar"
            style={{ width: `${percent * 100}%` }}
            aria-hidden
          />
          {hasTicks &&
            tickLabels.map((_, i) => (
              <div
                key={i}
                className="mochi-slider-tick"
                style={{ left: `${tickPercent(i)}%` }}
                aria-hidden
              />
            ))}
        </div>
        {hasTicks && (
          <div className="mochi-slider-tick-labels" aria-hidden>
            {tickLabels.map((label, i) => (
              <span
                key={i}
                className={cn('mochi-slider-tick-label', !label && 'mochi-slider-tick-label--empty')}
                style={{ left: `${tickPercent(i)}%` }}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tap area (mochi-slider-taparea) */}
      <div className="mochi-slider-taparea">
        <input
          type="range"
          min={min}
          max={inputMax}
          step={step}
          value={range <= 0 ? min : value}
          disabled={disabled}
          onChange={handleInputChange}
          onInput={handleInput}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          aria-valuemin={min}
          aria-valuemax={inputMax}
          aria-valuenow={value}
          aria-valuetext={displayLabel}
        />
      </div>

      {/* Knob (Slider.less: left inPercent%, margin -8px -9px) */}
      <div
        ref={knobRef}
        className={cn('mochi-slider-knob', isDragging && 'active')}
        style={{ left: knobLeft }}
        aria-hidden
      />

      {/* Gota: tip follows handler (left=left, right=right) */}
      <div
        className="mochi-slider-popup"
        style={{
          left: `${popupLeftPx}px`,
          top: `${popupTopPx}px`,
          ['--gota-tip-left' as string]: `${tipX - triangleHalfWidth}px`,
          ['--gota-radius-bl' as string]: `${radiusBl}px`,
          ['--gota-radius-br' as string]: `${radiusBr}px`,
        }}
        role="tooltip"
      >
        <span className="mochi-slider-popup-label">{displayLabel}</span>
      </div>
    </div>
  )
}
