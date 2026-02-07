import * as React from 'react'
import { cn } from './cn'
import { MochiPopover } from './MochiAutocomplete'
import './MochiAutocomplete.css'

export function MochiFormCol({
  children,
  className,
  side,
}: {
  children: React.ReactNode
  className?: string
  side?: 'left' | 'right'
}) {
  return (
    <div className={cn('mochi-form-col', side === 'left' && 'mochi-form-col--left', side === 'right' && 'mochi-form-col--right', className)}>
      {children}
    </div>
  )
}

export function MochiFormSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mochi-form-section', className)}>{children}</div>
}

export function MochiFormSectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mochi-form-sectionTitle', className)}>{children}</div>
}

export function MochiFormRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mochi-form-row', className)}>{children}</div>
}

export function MochiFormLabel({
  main,
  sub,
  className,
}: {
  main: React.ReactNode
  sub?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mochi-form-rowLabel', className)}>
      <div className="mochi-form-rowLabelMain">{main}</div>
      {sub != null ? <div className="mochi-form-rowLabelSub">{sub}</div> : null}
    </div>
  )
}

export function MochiFormControl({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={cn('mochi-form-rowControl', className)} style={style}>
      {children}
    </div>
  )
}

function getOptionsFromChildren(children: React.ReactNode): Array<{ value: string; label: React.ReactNode }> {
  const options: Array<{ value: string; label: React.ReactNode }> = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === 'option') {
      const p = child.props as { value?: string; children?: React.ReactNode }
      options.push({ value: String(p.value ?? ''), label: p.children ?? '' })
    }
  })
  return options
}

export type MochiSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'placeholder'> & {
  children: React.ReactNode
  placeholder?: string
}

export const MochiSelect = React.forwardRef<HTMLSelectElement, MochiSelectProps>(function MochiSelect(
  { children, className, value, onChange, disabled, placeholder, id, ...props },
  ref,
) {
  const options = React.useMemo(() => getOptionsFromChildren(children), [children])
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  const selectedValue = value != null ? String(value) : props.defaultValue != null ? String(props.defaultValue) : ''
  const selectedOption = options.find((o) => o.value === selectedValue)
  const selectedLabel = selectedOption ? selectedOption.label : ''

  const selectValue = React.useCallback(
    (value: string) => {
      const syntheticEvent = { target: { value } } as React.ChangeEvent<HTMLSelectElement>
      onChange?.(syntheticEvent)
      setOpen(false)
    },
    [onChange],
  )

  React.useEffect(() => {
    if (!open) return
    const idx = options.findIndex((o) => o.value === selectedValue)
    setActiveIndex(idx >= 0 ? idx : 0)
  }, [open, options, selectedValue])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(options.length - 1, i + 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(0, i - 1))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[activeIndex]
      if (opt) selectValue(opt.value)
    }
  }

  React.useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (popoverRef.current?.contains(t) || triggerRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick, true)
    return () => document.removeEventListener('mousedown', onDocClick, true)
  }, [open])

  return (
    <div className={cn('mochi-select', className)} data-open={open ? 'true' : 'false'}>
      <div
        ref={triggerRef}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={id ? `${id}-listbox` : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={cn('mochi-input-decorator', 'mochi-select-trigger', disabled && 'mochi-disabled')}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="mochi-select-triggerLabel">
          {selectedLabel || placeholder || ''}
        </span>
      </div>
      {open ? (
        <MochiPopover
          ref={popoverRef}
          dir="below"
          nub={{ left: 24 }}
          role="listbox"
          id={id ? `${id}-listbox` : undefined}
          className="mochi-select-popover"
          style={{ left: 0, right: 0, top: '100%', marginTop: 4 }}
          onMouseDownCapture={(e) => e.preventDefault()}
        >
          {options.length === 0 ? (
            <div className="mochi-autocomplete-empty">No options</div>
          ) : (
            options.map((opt, idx) => (
              <button
                key={opt.value}
                type="button"
                className="mochi-autocomplete-item"
                data-active={idx === activeIndex ? 'true' : 'false'}
                role="option"
                aria-selected={idx === activeIndex}
                onMouseDown={(e) => {
                  e.preventDefault()
                  selectValue(opt.value)
                }}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <span className="mochi-autocomplete-itemTitle">{opt.label}</span>
              </button>
            ))
          )}
        </MochiPopover>
      ) : null}
    </div>
  )
})
