import * as React from 'react'
import './MochiList.css'
import { cn } from './cn'

/** Scrollable list pane container. Ref is forwarded to the outer div (e.g. for popover bounds). */
export const MochiListPane = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; footer?: React.ReactNode; className?: string }
>(function MochiListPane({ children, footer, className }, ref) {
  return (
    <div ref={ref} className={cn('mochi-listPane', className)}>
      <div className="mochi-listPane-scroll">{children}</div>
      {footer ?? null}
    </div>
  )
})

export function MochiList({
  children,
  className,
  as: As = 'ul',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  return <As className={cn('mochi-list', className)}>{children}</As>
}

export function MochiListItemRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn('mochi-list-item-row', className)}>{children}</li>
}

export function MochiListItemLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mochi-list-item-label', className)}>{children}</div>
}

export function MochiListItemCaption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mochi-list-item-caption', className)}>{children}</div>
}

export function MochiListFooter({
  children,
  className,
  variant,
}: {
  children: React.ReactNode
  className?: string
  /** 'flat' removes top border for use under lists. */
  variant?: 'flat' | 'default'
}) {
  return (
    <div className={cn('mochi-list-footer', variant === 'flat' && 'mochi-list-footer--flat', className)} aria-label="Acciones">
      {children}
    </div>
  )
}

