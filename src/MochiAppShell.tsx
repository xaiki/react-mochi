import * as React from 'react'
import './MochiAppShell.css'
import { cn } from './cn'

export function MochiAppShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mochi-appshell', className)}>{children}</div>
}

export function MochiTopbar({
  title,
  subtitle,
  right,
  ariaLabel = 'Encabezado',
}: {
  title: string
  subtitle?: string
  right?: React.ReactNode
  ariaLabel?: string
}) {
  return (
    <header className="mochi-topbar" aria-label={ariaLabel}>
      <div className="min-w-0">
        <div className="mochi-topbar-title">{title}</div>
        {subtitle ? <div className="mochi-topbar-subtitle">{subtitle}</div> : null}
      </div>
      {right ? <div className="mochi-topbar-user">{right}</div> : null}
    </header>
  )
}

export function MochiTopbarUserMeta({
  name,
  sub,
}: {
  name: string
  sub?: string
}) {
  return (
    <div className="mochi-topbar-user-meta">
      <div className="mochi-topbar-user-name">{name}</div>
      {sub ? <div className="mochi-topbar-user-sub">{sub}</div> : null}
    </div>
  )
}

export function MochiTopbarHint({ text }: { text: string }) {
  return <div className="mochi-topbar-user-sub">{text}</div>
}

export function MochiMenuNav({ children }: { children: React.ReactNode }) {
  return <div className="mochi-menu-nav">{children}</div>
}

