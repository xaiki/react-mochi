import './MochiControls.css'
import { cn } from './cn'

export type MochiCheckboxProps = {
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
  'aria-label'?: string
}

export function MochiCheckbox({
  checked,
  disabled,
  onCheckedChange,
  className,
  ...props
}: MochiCheckboxProps) {
  return (
    <button
      type="button"
      className={cn('mochi-checkbox', disabled && 'disabled', className)}
      aria-checked={checked}
      role="checkbox"
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      {...props}
    />
  )
}
