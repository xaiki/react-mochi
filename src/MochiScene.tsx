import * as React from 'react'
import './MochiScene.css'
import { cn } from './cn'

export function MochiHeader({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn('mochi-header', className)}>
      <div className="mochi-header-content">{title}</div>
    </div>
  )
}

export function MochiSubheader({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn('mochi-subheader', className)}>
      <div className="mochi-subheader-content">{text}</div>
    </div>
  )
}

export function MochiGroupbox({
  title,
  headerRight,
  actions,
  children,
  className,
}: {
  title?: string
  headerRight?: React.ReactNode
  /** Rendered at bottom right of the groupbox */
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mochi-groupbox', className)}>
      {title || headerRight ? (
        <div className="mochi-groupbox-header">
          <span className="mochi-groupbox-title">{title ?? ''}</span>
          {headerRight ? <span className="mochi-groupbox-headerRight">{headerRight}</span> : null}
        </div>
      ) : null}
      <div className="mochi-groupbox-body">{children}</div>
      {actions ? <div className="mochi-groupbox-actions">{actions}</div> : null}
    </div>
  )
}

