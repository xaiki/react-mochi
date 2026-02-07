import * as React from 'react'
import './MochiContactRow.css'
import { cn } from './cn'

/** Use for the main name/text in a contact row. */
export function MochiContactName({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <span className={cn('mochi-contact-name', className)}>{children}</span>
}

/** Use for secondary text (e.g. subtitle) in a contact row. */
export function MochiContactSub({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <span className={cn('mochi-contact-sub', className)}>{children}</span>
}

function MochiContactRowInner({
  onClick,
  avatar,
  status,
  children,
  compact,
  className,
  buttonClassName,
  buttonAriaLabel,
  selected,
}: {
  onClick?: () => void
  avatar: React.ReactNode
  status?: React.ReactNode
  children?: React.ReactNode
  compact?: boolean
  className?: string
  buttonClassName?: string
  buttonAriaLabel?: string
  /** When true, applies selected state styling. */
  selected?: boolean
}) {
  return (
    <li className={cn('mochi-contact-row', compact && 'mochi-contact-row--compact', className)}>
      <button
        type="button"
        className={cn('mochi-contact-btn', compact && 'mochi-contact-btn--compact', selected && 'mochi-list-item-selected', buttonClassName)}
        onClick={onClick}
        aria-label={buttonAriaLabel}
      >
        <span className="mochi-contact-row__avatar" aria-hidden="true">
          {avatar}
        </span>
        {children ? <span className="min-w-0 flex-1 text-left">{children}</span> : null}
        {status ? (
          <span className="mochi-contact-row__status" aria-hidden="true">
            {status}
          </span>
        ) : null}
      </button>
    </li>
  )
}

export const MochiContactRow = React.memo(MochiContactRowInner)

