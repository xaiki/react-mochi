import * as React from 'react'
import './MochiAutocomplete.css'
import { cn } from './cn'
import { MochiInput } from './MochiInput'

type Dir = 'below' | 'above' | 'left' | 'right'

export type MochiPopoverNub = {
  /** Horizontal position for above/below nubs. Number is px. */
  left?: number | string
  /** Vertical position for left/right nubs. Number is px. */
  top?: number | string
}

/** Generic Mochi-styled popover shell (nub, surface). Use MochiAutocompletePopover for the autocomplete dropdown. */
export const MochiPopover = React.forwardRef<
  HTMLDivElement,
  {
    className?: string
    surfaceClassName?: string
    role?: string
    id?: string
    dir?: Dir
    nub?: MochiPopoverNub
    style?: React.CSSProperties
    onMouseDownCapture?: React.MouseEventHandler<HTMLDivElement>
    children: React.ReactNode
  }
>(function MochiPopover(
  { className, surfaceClassName, role, id, dir = 'below', nub, style, onMouseDownCapture, children },
  ref,
) {
  const nubStyle: React.CSSProperties = {
    ...(style ?? null),
    ...(nub?.left != null ? ({ ['--mochi-nub-left' as string]: typeof nub.left === 'number' ? `${nub.left}px` : nub.left } as React.CSSProperties) : null),
    ...(nub?.top != null ? ({ ['--mochi-nub-top' as string]: typeof nub.top === 'number' ? `${nub.top}px` : nub.top } as React.CSSProperties) : null),
  }

  return (
    <div ref={ref} className={cn('mochi-autocomplete-popover', className)} role={role} id={id} data-dir={dir} style={nubStyle}>
      <div className={cn('mochi-autocomplete-popoverSurface', surfaceClassName)} onMouseDownCapture={onMouseDownCapture}>
        {children}
      </div>
    </div>
  )
})

/** Popover used for the autocomplete dropdown (list + footer). Same shell as MochiPopover. */
const MochiAutocompletePopover = MochiPopover

export type MochiAutocompleteProps<TItem> = {
  value: string
  onValueChange: (next: string) => void
  items: readonly TItem[]
  onSelect: (item: TItem) => void
  getItemKey: (item: TItem) => string
  getItemTitle: (item: TItem) => React.ReactNode
  getItemSub?: (item: TItem) => React.ReactNode
  placeholder?: string
  disabled?: boolean
  emptyText?: string
  className?: string
  popoverClassName?: string
  /** Optional extra content rendered inside the popover (below items). */
  footer?: React.ReactNode
  /** If true, choose direction automatically and align the "nub" via CSS vars. */
  autoDir?: boolean
  /** If true, the list is open by default so options are visible without focus/typing. */
  openListByDefault?: boolean
  /** If true, the dropdown opens above the input (e.g. when input is in a bottom footer). */
  openAbove?: boolean
  /** If true, focus the input when the component mounts. */
  autoFocus?: boolean
  /** If false, the list stays open after selecting an item. Default true. */
  closeOnSelect?: boolean
}

/**
 * Generic Mochi-styled autocomplete picker (`.mochi-autocomplete*`).
 *
 * Parent passes the query (`value`) and the filtered `items`.
 * This component handles open/close, keyboard navigation and selection.
 */
export function MochiAutocomplete<TItem>({
  value,
  onValueChange,
  items,
  onSelect,
  getItemKey,
  getItemTitle,
  getItemSub,
  placeholder,
  disabled,
  emptyText = 'Sin resultados.',
  className,
  popoverClassName,
  footer,
  autoDir = true,
  openListByDefault = false,
  openAbove = false,
  autoFocus = false,
  closeOnSelect = true,
}: MochiAutocompleteProps<TItem>) {
  const [open, setOpen] = React.useState(openListByDefault)
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const popoverRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!autoFocus) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [autoFocus])

  const shouldPreserveInputFocusOnMouseDown = (target: EventTarget | null) => {
    const el = target instanceof HTMLElement ? target : null
    if (!el) return false
    // Allow native focus for form controls that require it (notably <select>).
    if (el.closest('select, option, input, textarea')) return false
    return true
  }

  const selectAt = React.useCallback(
    (idx: number) => {
      const item = items[idx]
      if (!item) return
      onSelect(item)
      if (closeOnSelect) setOpen(false)
    },
    [items, onSelect, closeOnSelect],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true)
      setActive(0)
      return
    }

    if (!open) return

    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(items.length - 1, i + 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      selectAt(active)
    }
  }

  React.useEffect(() => {
    if (!open || !autoDir) return

    let raf = 0
    const update = () => {
      raf = 0
      const inputEl = inputRef.current
      const popEl = popoverRef.current
      if (!inputEl || !popEl) return

      if (openAbove) {
        popEl.setAttribute('data-dir', 'above')
        const inputRect = inputEl.getBoundingClientRect()
        const popRect = popEl.getBoundingClientRect()
        const nubW = 71
        const edgePad = 18
        const desiredLeft = inputRect.left + inputRect.width / 2 - nubW / 2
        const minLeft = popRect.left + edgePad
        const maxLeft = popRect.right - edgePad - nubW
        const clampedLeft = Math.min(maxLeft, Math.max(minLeft, desiredLeft))
        const relLeft = Math.round(clampedLeft - popRect.left)
        popEl.style.setProperty('--mochi-nub-left', `${relLeft}px`)
        popEl.style.removeProperty('--mochi-nub-top')
        return
      }

      const inputRect = inputEl.getBoundingClientRect()
      const popRect = popEl.getBoundingClientRect()

      const above = Math.max(0, inputRect.top)
      const below = Math.max(0, window.innerHeight - inputRect.bottom)
      const left = Math.max(0, inputRect.left)
      const right = Math.max(0, window.innerWidth - inputRect.right)

      const needV = popRect.height + 32 // popup + nub + gap
      const needH = popRect.width + 32

      let dir: Dir = 'below'
      if (below < needV && above >= needV) dir = 'above'
      else if (below < needV && above < needV) {
        if (right >= needH) dir = 'right'
        else if (left >= needH) dir = 'left'
        else dir = below >= above ? 'below' : 'above'
      }

      popEl.setAttribute('data-dir', dir)

      if (dir === 'below' || dir === 'above') {
        const nubW = 71
        const edgePad = 18
        const desiredLeft = inputRect.left + inputRect.width / 2 - nubW / 2
        const minLeft = popRect.left + edgePad
        const maxLeft = popRect.right - edgePad - nubW
        const clampedLeft = Math.min(maxLeft, Math.max(minLeft, desiredLeft))
        const relLeft = Math.round(clampedLeft - popRect.left)
        popEl.style.setProperty('--mochi-nub-left', `${relLeft}px`)
        popEl.style.removeProperty('--mochi-nub-top')
      } else {
        const nubH = 71
        const edgePad = 18
        const desiredTop = inputRect.top + inputRect.height / 2 - nubH / 2
        const minTop = popRect.top + edgePad
        const maxTop = popRect.bottom - edgePad - nubH
        const clampedTop = Math.min(maxTop, Math.max(minTop, desiredTop))
        const relTop = Math.round(clampedTop - popRect.top)
        popEl.style.setProperty('--mochi-nub-top', `${relTop}px`)
        popEl.style.removeProperty('--mochi-nub-left')
      }
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('resize', schedule)
    window.addEventListener('scroll', schedule, true)
    return () => {
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule, true)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [autoDir, open, openAbove])

  const listId = React.useId()

  return (
    <div className={cn('mochi-autocomplete', className)}>
      <MochiInput
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value)
          setOpen(true)
          setActive(0)
        }}
        onFocus={() => {
          setOpen(true)
          setActive(0)
        }}
        onBlur={() =>
          window.setTimeout(() => {
            // If the input becomes disabled (e.g. parent sets busy=true), browsers will blur it.
            // In that case, keep the popover open (it will close when parent re-enables + user blurs).
            if (disabled) return

            // Don't close if focus moved into the popover (e.g. select/button/link in footer)
            const pop = popoverRef.current
            const ae = document.activeElement
            if (pop && ae && pop.contains(ae)) return
            setOpen(false)
          }, 120)
        }
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-expanded={open ? 'true' : 'false'}
        aria-autocomplete="list"
        aria-controls={listId}
        disabled={disabled}
      />

      {open ? (
        <MochiAutocompletePopover
          ref={popoverRef}
          className={popoverClassName}
          role="listbox"
          id={listId}
          dir={openAbove ? 'above' : 'below'}
          onMouseDownCapture={(e) => {
            // Keep the input focused so the popover doesn't close when clicking
            // footer actions (e.g. "Generar invitación").
            if (shouldPreserveInputFocusOnMouseDown(e.target)) e.preventDefault()
          }}
        >
          {items.length ? (
            items.map((item, idx) => (
              <button
                key={getItemKey(item)}
                type="button"
                className="mochi-autocomplete-item"
                data-active={idx === active ? 'true' : 'false'}
                role="option"
                aria-selected={idx === active ? 'true' : 'false'}
                onMouseDown={(ev) => {
                  ev.preventDefault()
                  onSelect(item)
                  if (closeOnSelect) setOpen(false)
                }}
                onMouseEnter={() => setActive(idx)}
              >
                <span className="mochi-autocomplete-itemTitle">{getItemTitle(item)}</span>
                {getItemSub ? <span className="mochi-autocomplete-itemSub">{getItemSub(item)}</span> : null}
              </button>
            ))
          ) : footer ? null : (
            <div className="mochi-autocomplete-empty">{emptyText}</div>
          )}

          {footer ? (
            <div className={cn('mochi-autocomplete-footer', items.length ? null : 'mochi-autocomplete-footer--solo')}>
              {footer}
            </div>
          ) : null}
        </MochiAutocompletePopover>
      ) : null}
    </div>
  )
}

