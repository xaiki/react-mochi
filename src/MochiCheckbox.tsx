import './MochiCheckbox.css'
import { cn } from './cn'

export type MochiCheckboxProps = {
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
  'aria-label'?: string
  /** When true, renders indeterminate (dash) state; checked still controls aria-checked. */
  indeterminate?: boolean
}

export function MochiCheckbox({
  checked,
  disabled,
  onCheckedChange,
  className,
  indeterminate = false,
  ...props
}: MochiCheckboxProps) {
  const ariaChecked: boolean | 'mixed' = indeterminate ? 'mixed' : checked
  return (
    <button
      type="button"
      className={cn('mochi-checkbox', disabled && 'mochi-checkbox--disabled', className)}
      aria-checked={ariaChecked}
      role="checkbox"
      aria-disabled={disabled ? 'true' : 'false'}
      data-state={indeterminate ? 'mixed' : checked ? 'checked' : 'unchecked'}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      {...props}
    >
      <span className="mochi-checkboxIcon" aria-hidden="true" />
    </button>
  )
}
