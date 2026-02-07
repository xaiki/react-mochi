import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './MochiPane.css'
import './MochiSplitDivider.css'
import { cn } from './cn'
import { MochiCounter } from './MochiCounter'
import { MochiSearch } from './MochiSearch'
import { MochiSplitScrollColumns } from './MochiSplitScrollColumns'

type MochiPanePersistence = Record<string, boolean | undefined>

function storageKey(persistKey: string) {
  return `mochiPaneState:${persistKey}`
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  const out: React.ReactNode[] = []
  React.Children.forEach(children, (child) => {
    if (child == null) return
    if (Array.isArray(child)) {
      out.push(...flattenChildren(child))
      return
    }
    if (React.isValidElement(child) && child.type === React.Fragment) {
      const frag = child as React.ReactElement<Record<string, unknown>>
      out.push(...flattenChildren(frag.props.children as React.ReactNode))
      return
    }
    out.push(child)
  })
  return out
}

export function MochiPaneStack({
  children,
  className,
  ariaLabel,
  as: As = 'div',
  retractable = false,
  persistKey = 'app',
  collapsedWidth = 68,
}: {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  as?: React.ElementType
  retractable?: boolean
  persistKey?: string
  collapsedWidth?: number
}) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const [manual, setManual] = React.useState<MochiPanePersistence>({})

  React.useEffect(() => {
    if (!retractable) return
    const parsed = safeJsonParse<MochiPanePersistence>(localStorage.getItem(storageKey(persistKey)))
    setManual(parsed || {})
  }, [persistKey, retractable])

  React.useEffect(() => {
    if (!retractable) return
    const el = ref.current
    if (!el) return

    const update = () => setContainerWidth(el.getBoundingClientRect().width)
    update()

    const ro = new ResizeObserver(() => update())
    ro.observe(el)
    return () => ro.disconnect()
  }, [retractable])

  const setManualCollapsed = React.useCallback(
    (paneId: string, collapsed: boolean) => {
      setManual((prev) => {
        const next = { ...prev, [paneId]: collapsed }
        localStorage.setItem(storageKey(persistKey), JSON.stringify(next))
        return next
      })
    },
    [persistKey],
  )

  const isNarrow = typeof window !== 'undefined' ? window.matchMedia('(max-width: 820px)').matches : false

  const flat = flattenChildren(children)
  const panes = flat
    .map((n, idx) => ({ node: n, idx }))
    .filter(({ node }) => React.isValidElement(node) && (node.type as { __MOCHI_PANE?: boolean })?.__MOCHI_PANE === true) as Array<{
    node: React.ReactElement<Record<string, unknown>>
    idx: number
  }>

  // Even when not retractable (or on narrow viewports where we stack vertically),
  // still inject `depth`/`isMain` so CSS can style overlaps consistently.
  if (!retractable || isNarrow || panes.length === 0) {
    if (panes.length === 0) {
      return (
        <As ref={ref as React.Ref<HTMLElement>} className={cn('mochi-pane-stack', className)} aria-label={ariaLabel}>
          {children}
        </As>
      )
    }

    const injected: React.ReactNode[] = []
    const mainIndex = Math.max(0, panes.length - 1)
    let paneCursor = 0

    for (const n of flat) {
      if (!React.isValidElement(n) || (n.type as { __MOCHI_PANE?: boolean })?.__MOCHI_PANE !== true) {
        injected.push(n)
        continue
      }

      const el = n as React.ReactElement<Record<string, unknown>>
      const depth = Math.max(0, mainIndex - paneCursor)
      const isMain = paneCursor === mainIndex
      const paneId = String(el.props.paneId || `pane-${paneCursor}`)

      injected.push(
        React.cloneElement(el, {
          key: paneId,
          paneId,
          isMain,
          depth,
          stackIndex: paneCursor,
          stackSize: panes.length,
        }),
      )
      paneCursor++
    }

    return (
      <As ref={ref as React.Ref<HTMLElement>} className={cn('mochi-pane-stack', className)} aria-label={ariaLabel}>
        {injected}
      </As>
    )
  }

  const gap = 12

  const meta = panes.map((p, i) => {
    const props = p.node.props as Record<string, unknown>
    const paneId = String(props.paneId || `pane-${i}`)
    const label = String(props.label || props.ariaLabel || paneId)
    const className = String(props.className || '')
    const isIconbar = className.includes('mochi-pane--iconbar')
    const preferredWidth =
      Number(props.preferredWidth) ||
      (isIconbar
        ? 76
        : className.includes('mochi-pane--menu')
          ? 320
          : className.includes('mochi-pane--panel')
            ? 420
            : className.includes('mochi-pane--wide')
              ? 560
              : 640)
    const minExpandedWidth =
      Number(props.minExpandedWidth) || (isIconbar ? 76 : className.includes('mochi-pane--menu') ? 240 : 360)
    const collapsible = props.collapsible !== false
    return { paneId, label, preferredWidth, minExpandedWidth, collapsible, index: i }
  })

  const defaultCollapsed = meta.map((m, i) => (m.collapsible ? i !== meta.length - 1 : false))
  const collapsed = meta.map((m, i) => {
    const manualValue = manual[m.paneId]
    // Ignore persisted collapse state for panes that are no longer collapsible.
    if (m.collapsible && typeof manualValue === 'boolean') return Boolean(manualValue)
    return defaultCollapsed[i]
  })

  // Mochi UX: the RIGHTMOST pane is always the main one.
  // If the user tried to collapse it, force it open so it can take the remaining space.
  const mainIndex = Math.max(0, collapsed.length - 1)
  collapsed[mainIndex] = false

  // Auto-collapse from the left until the main pane can have its minimum width.
  const fixedWidth = (c: boolean, i: number) => (c ? collapsedWidth : i === mainIndex ? 0 : meta[i].preferredWidth)
  const fixedMin = () => {
    const fixed = collapsed.reduce((sum, c, i) => sum + fixedWidth(c, i), 0)
    return fixed + Math.max(0, collapsed.length - 1) * gap
  }

  const minMain = meta[mainIndex]?.minExpandedWidth ?? 360
  while (containerWidth > 0 && containerWidth - fixedMin() < minMain) {
    // Collapse the leftmost expanded, collapsible pane (excluding main)
    const toCollapse = collapsed.findIndex((c, i) => !c && i !== mainIndex && meta[i].collapsible)
    if (toCollapse < 0) break
    collapsed[toCollapse] = true
  }

  const injected: React.ReactNode[] = []
  let paneCursor = 0
  for (const n of flat) {
    if (!React.isValidElement(n) || (n.type as { __MOCHI_PANE?: boolean })?.__MOCHI_PANE !== true) {
      injected.push(n)
      continue
    }
    const el = n as React.ReactElement<Record<string, unknown>>
    const m = meta[paneCursor]
    const isCollapsed = Boolean(collapsed[paneCursor])
    const isMain = paneCursor === mainIndex && !isCollapsed
    const depth = Math.max(0, mainIndex - paneCursor)

    const style: React.CSSProperties = {
      ...(el.props.style || {}),
      // Used by CSS for smooth sizing.
      ['--mochi-pane-collapsed-width' as string]: `${collapsedWidth}px`,
      ['--mochi-pane-preferred-width' as string]: `${m.preferredWidth}px`,
      ['--mochi-pane-min-width' as string]: `${m.minExpandedWidth}px`,
    }

    injected.push(
      React.cloneElement(el, {
        key: m.paneId,
        paneId: m.paneId,
        label: m.label,
        collapsible: m.collapsible,
        collapsed: isCollapsed,
        isMain,
        depth,
        stackIndex: paneCursor,
        stackSize: meta.length,
        onToggleCollapsed:
          m.collapsible === false
            ? undefined
            : () => {
                setManualCollapsed(m.paneId, !isCollapsed)
              },
        style,
      }),
    )
    paneCursor++
  }

  return (
    <As ref={ref as React.Ref<HTMLElement>} className={cn('mochi-pane-stack', className)} aria-label={ariaLabel}>
      {injected}
    </As>
  )
}

type MochiPaneSearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export type MochiPaneVariant = 'wide' | 'panel' | 'default'
export type MochiPaneScrollVariant = 'split' | 'content'

type MochiPaneBaseProps = {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  style?: React.CSSProperties
  header?: React.ReactNode
  scrollClassName?: string
  scrollContent?: boolean
  as?: React.ElementType
  scrollAs?: React.ElementType
  paneId?: string
  label?: string
  collapsible?: boolean
  collapsed?: boolean
  isMain?: boolean
  depth?: number
  onToggleCollapsed?: () => void
  stackIndex?: number
  stackSize?: number
  showClose?: boolean
  closeAriaLabel?: string
  onClose?: () => void
  /** When set and this pane is not the main one, clicking the pane navigates to this path. */
  pathWhenActive?: string
  /** When true, shows a vertical divider line in the pane (e.g. for split-detail layouts). */
  splitDivider?: boolean
  /** Pane layout variant: 'wide' (detail/form), 'panel' (narrow panel), 'default'. */
  variant?: MochiPaneVariant
  /** Scroll area variant: 'split' (two-column scroll), 'content' (single scroll). */
  scrollVariant?: MochiPaneScrollVariant
  /** When scrollVariant is 'split': 'horizontal' = left | right, 'vertical' = top | bottom. */
  splitOrientation?: 'horizontal' | 'vertical'
}

type MochiPaneHeaderProps = {
  title: string
  titleVariant?: 'h1' | 'h2'
  count?: number
  right?: React.ReactNode
  search?: MochiPaneSearchProps
}

export function MochiPane(props: MochiPaneBaseProps & Partial<MochiPaneHeaderProps>) {
  const {
    children,
    className,
    ariaLabel,
    style,
    header,
    scrollClassName,
    scrollContent = true,
    as: As = 'section',
    scrollAs: ScrollAs = 'div',
    paneId,
    collapsed = false,
    isMain = false,
    depth = 0,
    pathWhenActive,
    splitDivider = false,
    variant,
    scrollVariant,
    splitOrientation = 'horizontal',
  } = props

  const derivedClassName = cn(
    variant === 'wide' && 'mochi-pane--wide',
    variant === 'panel' && 'mochi-pane--panel',
    className,
  )
  const derivedScrollClassName = cn(
    scrollVariant === 'split' && 'mochi-pane-scroll--split',
    scrollClassName,
  )

  const location = useLocation()
  const navigate = useNavigate()

  const softNavigate = React.useCallback((to: string) => {
    const href = String(to || '').trim() || '/'
    try {
      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) {
        window.location.href = url.href
        return
      }
      window.history.pushState({}, '', url.pathname + url.search + url.hash)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } catch {
      try {
        window.location.href = href
      } catch {
        // ignore
      }
    }
  }, [])

  const wantsClose =
    props.showClose ??
    (() => {
      // Show on all panes except the first one (typically the iconbar/menu).
      const idx = Number(props.stackIndex ?? NaN)
      if (Number.isFinite(idx)) return idx > 0
      // Fallback for panes rendered outside MochiPaneStack.
      return Boolean(paneId)
    })()

  const onClose = React.useCallback(() => {
    if (props.onClose) return props.onClose()
    // Default behavior: go "up one segment" (prevents back-navigation into confirm/sign flows,
    // while keeping `/loans/:id/sign` -> `/loans/:id`).
    try {
      const path = String(window.location?.pathname || '/')
      const parts = path.split('/').filter(Boolean)
      // If there's only one segment (e.g. "/loans"), close to "/".
      // Otherwise pop only the last segment ("/loans/123/sign" -> "/loans/123").
      const next = parts.length <= 1 ? '/' : `/${parts.slice(0, -1).join('/')}`
      softNavigate(next)
    } catch {
      try {
        if (typeof window !== 'undefined' && window.history) window.history.back()
      } catch {
        // ignore
      }
    }
  }, [props, softNavigate])

  const closeNode =
    wantsClose && !collapsed ? (
      <button
        type="button"
        className="mochi-pane-close"
        aria-label={props.closeAriaLabel || 'Cerrar'}
        title={props.closeAriaLabel || 'Cerrar'}
        onClick={onClose}
      >
        ×
      </button>
    ) : null

  const childList = React.Children.toArray(children).filter((c) => c != null)
  const wantsSplitScroll = scrollContent === false && (scrollVariant === 'split' || String(derivedScrollClassName || '').includes('mochi-pane-scroll--split'))
  const splitSearchNode =
    wantsSplitScroll && props.search ? (
      <div className="mochi-pane-splitSearch">
        <MochiSearch value={props.search.value} onChange={props.search.onChange} placeholder={props.search.placeholder} />
      </div>
    ) : null

  const effectiveChildren =
    wantsSplitScroll && childList.length >= 2 ? (
      <MochiSplitScrollColumns
        orientation={splitOrientation}
        left={
          <>
            {splitSearchNode}
            {childList[0]}
          </>
        }
        right={<>{childList.slice(1)}</>}
      />
    ) : (
      children
    )

  const headerNode =
    header ??
    (props.title ? (
      <div className="mochi-pane-header mochi-pane-header--list mochi-pane-header--ref">
        <div className="mochi-pane-headerTopRow">
          <div
            className={cn(
              'mochi-pane-title',
              (props.titleVariant ?? 'h1') === 'h2' ? 'mochi-pane-title--h2' : 'mochi-pane-title--h1',
            )}
          >
            {props.title}
          </div>
          {typeof props.count === 'number' || props.right ? (
            <div className="inline-flex items-end gap-3">
              {typeof props.count === 'number' ? <MochiCounter count={props.count} /> : null}
              {props.right ? props.right : null}
            </div>
          ) : null}
        </div>
        {/* In split panes, the search lives in the left column so the right column can start higher. */}
        {!wantsSplitScroll && props.search ? (
          <MochiSearch value={props.search.value} onChange={props.search.onChange} placeholder={props.search.placeholder} />
        ) : null}
      </div>
    ) : null)

  const hasHeader = Boolean(headerNode)

  const onPaneSurfaceClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isMain || !pathWhenActive) return
      const target = e.target as HTMLElement
      const surface = e.currentTarget
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-no-pane-nav]')
      if (interactive && interactive !== surface) return
      e.preventDefault()
      // Already on this path: do not navigate (would drop search/hash, e.g. /logs?range=1W)
      if (location.pathname === pathWhenActive) return
      navigate(pathWhenActive)
    },
    [isMain, pathWhenActive, navigate, location.pathname],
  )

  return (
    <As
      className={cn('mochi-pane', splitDivider && 'mochi-pane--splitDivider', derivedClassName)}
      aria-label={ariaLabel}
      style={{ ...(style || {}), zIndex: 10 - (Number(depth) || 0) }}
      data-pane-id={paneId}
      data-collapsed={collapsed ? 'true' : 'false'}
      data-main={isMain ? 'true' : 'false'}
      data-depth={String(depth)}
    >
      <div
        className={cn('mochi-pane-surface', isMain && 'mochi-pane-surface--main-pointer-through')}
        onClick={!isMain && pathWhenActive ? onPaneSurfaceClick : undefined}
        role={!isMain && pathWhenActive ? 'button' : undefined}
        tabIndex={!isMain && pathWhenActive ? 0 : undefined}
        onKeyDown={
          !isMain && pathWhenActive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Only handle when the pane surface has focus (not a child button/input/link)
                  if (e.target !== e.currentTarget) return
                  e.preventDefault()
                  navigate(pathWhenActive)
                }
              }
            : undefined
        }
      >
        {headerNode}
        {closeNode}
        <div className={cn('mochi-pane-body', !hasHeader && 'mochi-pane-body--noHeader')}>
          <div className="mochi-scrollfade-top" aria-hidden="true" />
          <div className="mochi-scrollfade-bottom" aria-hidden="true" />
          <ScrollAs className={cn('mochi-pane-scroll', scrollContent && 'mochi-pane-scroll--content', derivedScrollClassName)}>
            {effectiveChildren}
          </ScrollAs>
        </div>
      </div>
    </As>
  )
}

;(MochiPane as { __MOCHI_PANE?: boolean }).__MOCHI_PANE = true

