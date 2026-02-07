import { MochiStatusPillDot } from './MochiStatusPill'
import './MochiContactAvatar.css'

function stackWidthPx(chipCount: number): number {
  const n = Math.max(1, Math.min(6, Number(chipCount) || 1))
  return 16 * (n - 1) + 30
}

function toInitials(source: string): string {
  const base = String(source || '').trim()
  if (!base) return '—'
  const parts = base.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : parts[0]?.[1]) ?? ''
  const out = (first + last).toUpperCase()
  return out || base.slice(0, 2).toUpperCase()
}

export type ContactInput = string | { name?: string; dni?: string; fallback?: string }

function contactToInitials(c: ContactInput): string {
  if (typeof c === 'string') return toInitials(c)
  const text = (c.name ?? c.dni ?? c.fallback ?? '').trim() || '—'
  return toInitials(text)
}

/** Convention: contacts[0]=creditor, contacts[1]=debtor, contacts[2..]=observers (max 2 chips shown, then +N). */
const MAX_OBSERVER_CHIPS = 2

function resolveContacts(contacts: ContactInput[]) {
  const creditor = contactToInitials(contacts[0] ?? '')
  const debtor = contactToInitials(contacts[1] ?? '')
  const observers = contacts.slice(2).map(contactToInitials)
  const observerChips = observers.slice(0, MAX_OBSERVER_CHIPS)
  const observerMore = Math.max(0, observers.length - MAX_OBSERVER_CHIPS)
  return { creditor, debtor, observerChips, observerMore }
}

export type MochiContactAvatarProps = {
  /** Status for the first chip (status pill dot). */
  status: string
  /** Ordered: [creditor, debtor, ...observers]. Each item is string or { name?, dni?, fallback? }; component derives initials. */
  contacts: ContactInput[]
  /** Optional trailing dot. Pass true to use `status` for data-status, or a string for custom data-status. */
  dot?: boolean
  className?: string
  /** Override aria-hidden on the stack (default true). */
  ariaHidden?: boolean
}

export function MochiContactAvatar({
  status,
  contacts = [],
  dot,
  className,
  ariaHidden = true,
}: MochiContactAvatarProps) {
  const { creditor, debtor, observerChips, observerMore } = resolveContacts(contacts)
  const chipCount = 2 + observerChips.length + (observerMore > 0 ? 1 : 0)
  const widthPx = stackWidthPx(chipCount)
  

  return (
    <span
      className={className ? `mochi-contact-avatarStack ${className}` : 'mochi-contact-avatarStack'}
      style={{ ['--mochi-avatarStack-width' as string]: `${widthPx}px` }}
      aria-hidden={ariaHidden}
    >
      <span className="mochi-contact-avatarChip mochi-contact-avatarChip--status">
        <MochiStatusPillDot status={status} label={status} />
      </span>
      <span className="mochi-contact-avatarChip mochi-contact-avatarChip--creditor">{creditor}</span>
      <span className="mochi-contact-avatarChip mochi-contact-avatarChip--debtor">{debtor}</span>
      {observerChips.map((txt, idx) => (
        <span key={idx} className="mochi-contact-avatarChip mochi-contact-avatarChip--observer" data-obs-idx={String(idx)}>
          {txt}
        </span>
      ))}
      {observerMore > 0 ? (
        <span className="mochi-contact-avatarChip mochi-contact-avatarChip--observerMore">+{observerMore}</span>
      ) : null}
      {dot ? (
        <span className="mochi-contact-dot mochi-contact-dot--inline" data-status={status} />
      ) : null}
    </span>
  )
}
