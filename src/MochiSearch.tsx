import { MochiInput } from './MochiInput'

export function MochiSearch({
  value,
  onChange,
  placeholder = 'Search',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="mochi-pane-searchRow">
      <div className="mochi-pane-search">
        <MochiInput
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputClassName="pr-8"
        />
        <span className="mochi-pane-searchIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
              className="stroke-current"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.2 16.2 21 21"
              className="stroke-current"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

