import * as React from 'react'
import { cn } from './cn'

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

export function MochiSelect({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select className={cn('mochi-select', className)} {...props}>
      {children}
    </select>
  )
}
