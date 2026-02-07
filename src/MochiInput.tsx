import * as React from 'react'
import './MochiInput.css'
import { cn } from './cn'

export type MochiInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputClassName?: string
}

export const MochiInput = React.forwardRef<HTMLInputElement, MochiInputProps>(
  ({ className, inputClassName, type, ...props }, ref) => {
    return (
      <div className={cn('mochi-input-decorator', 'w-full', className)}>
        <input type={type} className={cn('w-full', inputClassName)} ref={ref} {...props} />
      </div>
    )
  },
)
MochiInput.displayName = 'MochiInput'
