import * as React from 'react'
import './MochiContactList.css'
import { cn } from './cn'
import { MochiList } from './MochiList'

export function MochiContactList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <MochiList className={cn('mochi-contact-list', className)}>{children}</MochiList>
}

