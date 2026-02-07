import * as React from 'react'
import './MochiInput.css'
import { cn } from './cn'

export type MochiInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputClassName?: string
}

export const MochiInput = React.forwardRef<HTMLInputElement, MochiInputProps>(
  ({ className, inputClassName, type, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const setRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
      },
      [ref],
    )
    return (
      <div
        className={cn('mochi-input-decorator', 'w-full', className)}
        onClick={() => inputRef.current?.focus()}
        role="presentation"
      >
        <input type={type} className={cn('w-full', inputClassName)} ref={setRef} {...props} />
      </div>
    )
  },
)
MochiInput.displayName = 'MochiInput'
