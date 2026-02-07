import * as React from 'react'
import { cn } from './cn'

export function MochiWorkspace({
  children,
  className,
  ariaLabel = 'Workspace',
}: {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <div className={cn('mochi-workspace', className)} aria-label={ariaLabel}>
      {children}
    </div>
  )
}

