import * as React from 'react'
import { MochiPane } from './MochiPane'
import { MochiListPane } from './MochiList'
import { MochiCard, MochiCardContent, MochiCardHeader, MochiCardTitle } from './MochiCard'

export type MochiSplitTabLayoutSearch = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export type MochiSplitTabLayoutLeft = {
  title: string
  subtitle?: React.ReactNode
  info?: React.ReactNode
  search?: MochiSplitTabLayoutSearch
  filterBar?: React.ReactNode
  list: React.ReactNode
  footer?: React.ReactNode
}

export type MochiSplitTabLayoutWidget = {
  id: string
  title?: string
  order?: number
  children: React.ReactNode
}

export type MochiSplitTabLayoutProps = {
  paneId: string
  pathWhenActive: string
  ariaLabel: string
  label: string
  left: MochiSplitTabLayoutLeft
  /** When undefined or empty widgets, only left column is shown (no split). */
  right?: {
    widgets: MochiSplitTabLayoutWidget[]
  }
  /** Pass-through to MochiPane (e.g. count for header) */
  count?: number
  /** Pass-through to MochiPane (right slot in header) */
  rightHeader?: React.ReactNode
  className?: string
  gapPx?: number
  /** Ref for the list pane container (e.g. for popover bounds). */
  listPaneRef?: React.RefObject<HTMLDivElement | null>
}

const defaultOrder = (a: MochiSplitTabLayoutWidget, b: MochiSplitTabLayoutWidget) => {
  const oA = a.order ?? 0
  const oB = b.order ?? 0
  if (oA !== oB) return oA - oB
  return a.id.localeCompare(b.id)
}

export function MochiSplitTabLayout({
  paneId,
  pathWhenActive,
  ariaLabel,
  label,
  left,
  right,
  count,
  rightHeader,
  className,
  gapPx = 28,
  listPaneRef,
}: MochiSplitTabLayoutProps) {
  const sortedWidgets = React.useMemo(
    () => (right?.widgets?.length ? [...right.widgets].sort(defaultOrder) : []),
    [right],
  )
  const hasRight = sortedWidgets.length > 0

  const leftContent = (
    <>
      {left.subtitle ? (
        <div className="text-sm text-muted-foreground mb-2 px-0">{left.subtitle}</div>
      ) : null}
      {left.info ? (
        <div className="text-xs text-muted-foreground mb-3 px-0">{left.info}</div>
      ) : null}
      {left.filterBar ? <div className="flex items-center justify-between gap-3 mb-2">{left.filterBar}</div> : null}
      <MochiListPane ref={listPaneRef} footer={left.footer}>
        {left.list}
      </MochiListPane>
    </>
  )

  const rightContent = hasRight ? (
    <div className="space-y-4" style={{ ['--mochi-split-gap' as string]: gapPx ? `${gapPx}px` : undefined }}>
      {sortedWidgets.map((w) =>
        w.title ? (
          <MochiCard key={w.id}>
            <MochiCardHeader className="pb-2">
              <MochiCardTitle className="text-base">{w.title}</MochiCardTitle>
            </MochiCardHeader>
            <MochiCardContent>{w.children}</MochiCardContent>
          </MochiCard>
        ) : (
          <div key={w.id}>{w.children}</div>
        ),
      )}
    </div>
  ) : null

  return (
    <MochiPane
      className={className}
      ariaLabel={ariaLabel}
      paneId={paneId}
      label={label}
      pathWhenActive={pathWhenActive}
      title={left.title}
      count={count}
      right={rightHeader}
      search={left.search}
      scrollContent={!hasRight}
      scrollVariant={hasRight ? 'split' : undefined}
    >
      {leftContent}
      {rightContent}
    </MochiPane>
  )
}
