import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  MochiRoot,
  Button,
  MochiAppShell,
  MochiMenuNav,
  MochiAutocomplete,
  MochiPopover,
  MochiInput,
  MochiCheckbox,
  MochiContactAvatar,
  MochiContactList,
  MochiContactRow,
  MochiContactName,
  MochiContactSub,
  MochiCountBadge,
  MochiCounter,
  MochiFormCol,
  MochiFormSection,
  MochiFormSectionTitle,
  MochiFormRow,
  MochiFormLabel,
  MochiFormControl,
  MochiSelect,
  MochiList,
  MochiListPane,
  MochiListItemRow,
  MochiListItemLabel,
  MochiListItemCaption,
  MochiListFooter,
  MochiMultiSwitch,
  MochiPane,
  MochiPaneStack,
  MochiRadio,
  MochiGroupbox,
  MochiSubheader,
  MochiSearch,
  MochiSlider,
  MochiSpinner,
  MochiSplitScrollColumns,
  MochiSplitTabLayout,
  MochiStatusPill,
  MochiStatusPillDot,
  MochiToggle,
  MochiWorkspace,
  MochiCard,
  MochiCardHeader,
  MochiCardTitle,
  MochiCardContent,
} from '@mochi/ui'

const SECTIONS = [
  { id: 'buttons', label: 'Button' },
  { id: 'forms', label: 'Forms' },
  { id: 'lists', label: 'Lists' },
  { id: 'layout', label: 'Layout' },
  { id: 'controls', label: 'Controls' },
  { id: 'shell', label: 'App shell' },
  { id: 'scene', label: 'Groupbox & Subheader' },
  { id: 'autocomplete', label: 'Autocomplete & Popover' },
  { id: 'contacts', label: 'Contact row & Avatar' },
  { id: 'pane', label: 'Pane & PaneStack' },
] as const

function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const current = location.pathname.slice(1) || SECTIONS[0].id
  return (
    <nav style={{ padding: '12px 0', borderRight: '1px solid var(--mochi-border, #ddd)', minWidth: 200, background: 'var(--mochi-bg-subtle, #f8f8f8)' }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--mochi-muted, #666)', padding: '8px 16px' }}>
        Components
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => navigate(`/${s.id}`)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                textAlign: 'left',
                border: 'none',
                background: current === s.id ? 'var(--mochi-bg, #fff)' : 'transparent',
                fontFamily: 'inherit',
                fontSize: 14,
                cursor: 'pointer',
                borderLeft: current === s.id ? '3px solid var(--mochi-accent, #333)' : '3px solid transparent',
              }}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SectionButtons() {
  return (
    <MochiGroupbox title="Button — variants">
      <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
        Variants: primary, secondary, ghost, destructive. Sizes: sm, md, lg. State: disabled.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
      </div>
    </MochiGroupbox>
  )
}

function SectionForms() {
  const [inputVal, setInputVal] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [radioState, setRadioState] = React.useState<'unchecked' | 'checked' | 'mixed'>('checked')
  const [toggleOn, setToggleOn] = React.useState(true)
  const [selectVal, setSelectVal] = React.useState('b')
  const [checkA, setCheckA] = React.useState(false)
  const [checkB, setCheckB] = React.useState(true)
  const [toggleDemoOn, setToggleDemoOn] = React.useState(true)
  const [toggleDemoOff, setToggleDemoOff] = React.useState(false)
  const [toggleSwitchOn, setToggleSwitchOn] = React.useState(true)
  const [toggleSwitchOff, setToggleSwitchOff] = React.useState(false)
  const [toggleMd, setToggleMd] = React.useState(false)
  const [exName, setExName] = React.useState('')
  const [exRole, setExRole] = React.useState('viewer')
  const [exNotify, setExNotify] = React.useState(true)
  const [exActive, setExActive] = React.useState(true)
  const [exSubmitted, setExSubmitted] = React.useState<{ name: string; role: string; notify: boolean; active: boolean } | null>(null)
  return (
    <>
      <MochiGroupbox title="Example form — try it">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          Fill the form and click Save to see values below.
        </p>
        <MochiFormSection>
          <MochiFormRow>
            <MochiFormLabel main="Name" />
            <MochiFormControl>
              <MochiInput value={exName} onChange={(e) => setExName(e.target.value)} placeholder="Your name" />
            </MochiFormControl>
          </MochiFormRow>
          <MochiFormRow>
            <MochiFormLabel main="Role" />
            <MochiFormControl>
              <MochiSelect value={exRole} onChange={(e) => setExRole(e.target.value)}>
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </MochiSelect>
            </MochiFormControl>
          </MochiFormRow>
          <MochiFormRow>
            <MochiFormLabel main="Notify me" />
            <MochiFormControl>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <MochiCheckbox checked={exNotify} onCheckedChange={setExNotify} aria-label="Notify" />
                <span style={{ fontSize: 13 }}>Email notifications</span>
              </span>
            </MochiFormControl>
          </MochiFormRow>
          <MochiFormRow>
            <MochiFormLabel main="Active" />
            <MochiFormControl>
              <MochiToggle checked={exActive} onCheckedChange={setExActive} ariaLabel="Active" />
            </MochiFormControl>
          </MochiFormRow>
          <MochiFormRow>
            <MochiFormCol side="left"><MochiFormLabel main="" /></MochiFormCol>
            <MochiFormCol side="right">
              <MochiFormControl>
                <Button variant="primary" onClick={() => setExSubmitted({ name: exName, role: exRole, notify: exNotify, active: exActive })}>Save</Button>
              </MochiFormControl>
            </MochiFormCol>
          </MochiFormRow>
        </MochiFormSection>
        {exSubmitted != null && (
          <div style={{ marginTop: 12, padding: 12, background: 'var(--mochi-bg-subtle, #f5f5f5)', borderRadius: 8, fontSize: 13 }}>
            <strong>Saved:</strong> name=&quot;{exSubmitted.name || '(empty)'}&quot;, role={exSubmitted.role}, notify={String(exSubmitted.notify)}, active={String(exSubmitted.active)}
          </div>
        )}
      </MochiGroupbox>
      <MochiGroupbox title="Forms — Input, Select, FormCol">
        <MochiFormSection>
          <MochiFormSectionTitle>Input & Select</MochiFormSectionTitle>
          <MochiFormRow>
            <MochiFormLabel main="Label" sub="Optional sub" />
            <MochiFormControl>
              <MochiInput value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="Type here" />
            </MochiFormControl>
          </MochiFormRow>
          <MochiFormRow>
            <MochiFormLabel main="Select" />
            <MochiFormControl>
              <MochiSelect value={selectVal} onChange={(e) => setSelectVal(e.target.value)}>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </MochiSelect>
            </MochiFormControl>
          </MochiFormRow>
          <MochiFormRow>
            <MochiFormCol side="left"><MochiFormLabel main="MochiFormCol left" /></MochiFormCol>
            <MochiFormCol side="right"><MochiFormControl><Button size="sm">Control</Button></MochiFormControl></MochiFormCol>
          </MochiFormRow>
        </MochiFormSection>
      </MochiGroupbox>
      <MochiGroupbox title="MochiCheckbox — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>States: unchecked, checked, indeterminate. Click to toggle.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MochiCheckbox checked={checkA} onCheckedChange={setCheckA} aria-label="Unchecked" />
            <span style={{ fontSize: 13 }}>Unchecked</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MochiCheckbox checked={checkB} onCheckedChange={setCheckB} aria-label="Checked" />
            <span style={{ fontSize: 13 }}>Checked</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MochiCheckbox checked={false} indeterminate onCheckedChange={() => {}} aria-label="Indeterminate" />
            <span style={{ fontSize: 13 }}>Indeterminate</span>
          </span>
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiRadio — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Variant: default, group. States: unchecked, checked, mixed. Click to toggle.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MochiRadio state="unchecked" onToggle={() => setRadioState('unchecked')} ariaLabel="Unchecked" />
            <span style={{ fontSize: 13 }}>Default unchecked</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MochiRadio state="checked" onToggle={() => setRadioState('checked')} ariaLabel="Checked" />
            <span style={{ fontSize: 13 }}>Default checked</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MochiRadio state="mixed" onToggle={() => setRadioState('mixed')} ariaLabel="Mixed" />
            <span style={{ fontSize: 13 }}>Mixed</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <MochiRadio state={radioState === 'checked' ? 'checked' : 'unchecked'} variant="group" onToggle={() => setRadioState(radioState === 'checked' ? 'unchecked' : 'checked')} ariaLabel="Group" />
            <span style={{ fontSize: 13 }}>Group (click to toggle)</span>
          </span>
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiToggle — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Variant: labels (SI/NO), switchOnly. State: on, off. Size: sm, md. Click to toggle.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiToggle checked={toggleDemoOn} onCheckedChange={setToggleDemoOn} ariaLabel="Labels on" />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Labels on</span>
          </span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiToggle checked={toggleDemoOff} onCheckedChange={setToggleDemoOff} ariaLabel="Labels off" />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Labels off</span>
          </span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiToggle checked={toggleSwitchOn} variant="switchOnly" onCheckedChange={setToggleSwitchOn} ariaLabel="Switch only on" />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Switch only on</span>
          </span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiToggle checked={toggleSwitchOff} variant="switchOnly" onCheckedChange={setToggleSwitchOff} ariaLabel="Switch only off" />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Switch only off</span>
          </span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiToggle checked={true} disabled onCheckedChange={() => {}} ariaLabel="Disabled" />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Disabled</span>
          </span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiToggle checked={toggleMd} size="md" onCheckedChange={setToggleMd} ariaLabel="Size md" />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Size md</span>
          </span>
        </div>
      </MochiGroupbox>
    </>
  )
}

function SectionLists() {
  return (
    <>
      <MochiGroupbox title="MochiList, MochiListPane, MochiListFooter — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          MochiListFooter: variant default (bordered) or flat. Rows can have label only or label + caption.
        </p>
        <MochiListPane
          footer={
            <MochiListFooter variant="flat">
              <Button variant="secondary">Action (footer variant=flat)</Button>
            </MochiListFooter>
          }
        >
          <MochiList>
            <MochiListItemRow>
              <MochiListItemLabel>Item one</MochiListItemLabel>
              <MochiListItemCaption>Caption</MochiListItemCaption>
            </MochiListItemRow>
            <MochiListItemRow>
              <MochiListItemLabel>Item two</MochiListItemLabel>
            </MochiListItemRow>
            <MochiListItemRow>
              <MochiListItemLabel>Item three</MochiListItemLabel>
            </MochiListItemRow>
          </MochiList>
        </MochiListPane>
      </MochiGroupbox>
    </>
  )
}

function SectionLayout() {
  return (
    <>
      <MochiGroupbox title="MochiWorkspace">
        <MochiWorkspace ariaLabel="Demo workspace">
          <div style={{ padding: 16, background: 'var(--mochi-bg-subtle, #f5f5f5)', borderRadius: 8 }}>Workspace content area</div>
        </MochiWorkspace>
      </MochiGroupbox>
      <MochiGroupbox title="MochiSplitScrollColumns (horizontal)">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)', minWidth: 720}}>
          Two columns (left | right) that scroll independently. Fixed height so list/detail areas scroll.
        </p>
        <div style={{ height: 340, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <MochiSplitScrollColumns
              orientation="horizontal"
              leftColumn="minmax(220px, 280px)"
              gapPx={16}
              left={
                <div className="mochi-splitScroll-toc" style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>List (scrolls)</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {Array.from({ length: 24 }, (_, i) => (
                      <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid hsl(var(--border))', fontSize: 14 }}>
                        Item {i + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              right={
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Detail (scrolls)</div>
                  {Array.from({ length: 8 }, (_, i) => (
                    <p key={i} style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.5 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                  ))}
                </div>
              }
            />
          </div>
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiSplitScrollColumns (vertical)">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          <code>orientation=&quot;vertical&quot;</code>: top | bottom. List on top, detail below. Phone-sized width.
        </p>
        <div style={{ width: 320, height: 320, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <MochiSplitScrollColumns
              orientation="vertical"
              topRow="minmax(100px, 140px)"
              gapPx={12}
              left={
                <div className="mochi-splitScroll-toc" style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>List</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <li key={i} style={{ padding: '6px 0', borderBottom: '1px solid hsl(var(--border))', fontSize: 13 }}>
                        Item {i + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              right={
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Detail</div>
                  {Array.from({ length: 4 }, (_, i) => (
                    <p key={i} style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.4 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  ))}
                </div>
              }
            />
          </div>
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiCard">
        <MochiCard>
          <MochiCardHeader>
            <MochiCardTitle>Card title</MochiCardTitle>
          </MochiCardHeader>
          <MochiCardContent>Card body content.</MochiCardContent>
        </MochiCard>
      </MochiGroupbox>
      <MochiGroupbox title="MochiSplitTabLayout (horizontal)">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          List on the left, detail cards on the right.
        </p>
        <div style={{ minHeight: 300, height: 320 }}>
          <MochiSplitTabLayout
            paneId="showcase-split-h"
            pathWhenActive="/layout"
            ariaLabel="Split layout horizontal"
            label="Split tab"
            orientation="horizontal"
            left={{
              title: 'Items',
              list: (
                <MochiList>
                  {Array.from({ length: 8 }, (_, i) => (
                    <MochiListItemRow key={i}>
                      <MochiListItemLabel>Row {i + 1}</MochiListItemLabel>
                    </MochiListItemRow>
                  ))}
                </MochiList>
              ),
            }}
            right={{
              widgets: [
                { id: 'w1', title: 'Detail', order: 0, children: <div style={{ padding: 12 }}>Select a row to see detail here.</div> },
                { id: 'w2', title: 'Summary', order: 1, children: <div style={{ padding: 12 }}>Second widget in the right column.</div> },
              ],
            }}
          />
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiSplitTabLayout (vertical)">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          <code>orientation=&quot;vertical&quot;</code>: list on top, detail below. Phone-sized width.
        </p>
        <div style={{ width: 320, minHeight: 300, height: 320 }}>
          <MochiSplitTabLayout
            paneId="showcase-split-v"
            pathWhenActive="/layout"
            ariaLabel="Split layout vertical"
            label="Split tab"
            orientation="vertical"
            left={{
              title: 'Items',
              list: (
                <MochiList>
                  {Array.from({ length: 6 }, (_, i) => (
                    <MochiListItemRow key={i}>
                      <MochiListItemLabel>Row {i + 1}</MochiListItemLabel>
                    </MochiListItemRow>
                  ))}
                </MochiList>
              ),
            }}
            right={{
              widgets: [
                { id: 'w1', title: 'Detail', order: 0, children: <div style={{ padding: 12 }}>Detail area below the list.</div> },
              ],
            }}
          />
        </div>
      </MochiGroupbox>
    </>
  )
}

function SectionControls() {
  const [searchVal, setSearchVal] = React.useState('')
  const [sliderVal, setSliderVal] = React.useState(50)
  const [switchVal, setSwitchVal] = React.useState<'a' | 'b'>('a')
  return (
    <>
      <MochiGroupbox title="MochiSearch — variants">
        <p style={{ marginBottom: 8, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Input pill with search icon on the right.</p>
        <MochiSearch value={searchVal} onChange={setSearchVal} placeholder="Search…" />
      </MochiGroupbox>
      <MochiGroupbox title="MochiSlider — variants">
        <p style={{ marginBottom: 8, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Drag to change value (min/max).</p>
        <MochiSlider value={sliderVal} min={0} max={100} onChange={setSliderVal} />
        <span style={{ fontSize: 13, marginTop: 8, display: 'block' }}>Value: {sliderVal}</span>
      </MochiGroupbox>
      <MochiGroupbox title="MochiSpinner — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Size: default, large. Tone: dark, light.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiSpinner />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Default (dark)</span>
          </span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <MochiSpinner size="large" />
            <span style={{ fontSize: 12, color: 'var(--mochi-muted, #666)' }}>Large</span>
          </span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center', background: '#333', padding: 16, borderRadius: 8 }}>
            <MochiSpinner tone="light" />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Light (on dark)</span>
          </span>
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiMultiSwitch — variants">
        <p style={{ marginBottom: 8, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Tab-like switch between options.</p>
        <MochiMultiSwitch
          value={switchVal}
          onValueChange={setSwitchVal}
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
          ]}
          ariaLabel="Switch"
        />
      </MochiGroupbox>
      <MochiGroupbox title="MochiStatusPill & MochiStatusPillDot — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          Status: ok, warn, error, pending. Full pill (label ± count ± dot), compact (dot + count), dot only.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <MochiStatusPill status="ok" label="OK" />
          <MochiStatusPill status="warn" label="Warning" count={3} />
          <MochiStatusPill status="error" label="Error" dot />
          <MochiStatusPill status="pending" label="Pending" compact />
          <MochiStatusPillDot status="ok" label="" />
          <MochiStatusPillDot status="warn" label="" />
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiCountBadge & MochiCounter — variants">
        <p style={{ marginBottom: 8, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Badge (bubble) and counter (number with label).</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <MochiCountBadge count={42} />
          <MochiCounter count={7} ariaLabel="Count" />
        </div>
      </MochiGroupbox>
    </>
  )
}

function SectionShell() {
  const [shellSearch, setShellSearch] = React.useState('')
  return (
    <>
          <MochiGroupbox title="Demo app">
                  <MochiAppShell className="mochi-appshell--horizontal">
            <MochiMenuNav>
              <Button variant="ghost">Items</Button>
              <Button variant="ghost">Settings</Button>
            </MochiMenuNav>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minHeight: 0, flex: 1 }}>
              <header style={{ padding: '10px 16px', borderBottom: '1px solid var(--mochi-border, #ddd)', background: 'var(--mochi-bg, #fff)', flexShrink: 0, fontSize: 14, fontWeight: 600 }}>
                Items
              </header>
              <div style={{ flex: 1, minHeight: 0 }}>
                <MochiWorkspace ariaLabel="Demo workspace">
                  <MochiPaneStack ariaLabel="Demo stack" persistKey="showcase-shell">
                    <MochiPane
                      paneId="shell-main"
                      pathWhenActive="/shell"
                      label="Main"
                      title="Items"
                      count={6}
                      scrollContent={false}
                      scrollVariant="split"
                      search={{ value: shellSearch, onChange: setShellSearch, placeholder: 'Search…' }}
                    >
                      <MochiListPane
                        footer={
                          <MochiListFooter variant="flat">
                            <Button variant="secondary" size="sm">New</Button>
                          </MochiListFooter>
                        }
                      >
                        <MochiList>
                          {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((label, i) => (
                            <MochiListItemRow key={i}>
                              <MochiListItemLabel>{label}</MochiListItemLabel>
                              <MochiListItemCaption>Item {i + 1}</MochiListItemCaption>
                            </MochiListItemRow>
                          ))}
                        </MochiList>
                      </MochiListPane>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <MochiCard>
                          <MochiCardHeader>
                            <MochiCardTitle>Detail</MochiCardTitle>
                          </MochiCardHeader>
                          <MochiCardContent>Select an item from the list. This pane uses split scroll (list left, widgets right).</MochiCardContent>
                        </MochiCard>
                        <MochiCard>
                          <MochiCardHeader>
                            <MochiCardTitle>Summary</MochiCardTitle>
                          </MochiCardHeader>
                          <MochiCardContent>Second widget in the right column.</MochiCardContent>
                        </MochiCard>
                      </div>
                    </MochiPane>
                  </MochiPaneStack>
                </MochiWorkspace>
              </div>
            </div>
          </MochiAppShell>
      </MochiGroupbox>
      <MochiGroupbox title="MochiAppShell (vertical)">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          Default: header, nav, and body stacked in a column.
        </p>
        <div style={{ height: 220, minHeight: 0 }}>
          <MochiAppShell>
            <header style={{ padding: '12px 16px', borderBottom: '1px solid var(--mochi-border, #ddd)', background: 'var(--mochi-bg, #fff)' }}>
              App shell header
            </header>
            <MochiMenuNav>
              <Button variant="ghost">Nav A</Button>
              <Button variant="ghost">Nav B</Button>
            </MochiMenuNav>
            <div style={{ padding: 16, flex: 1, minHeight: 0 }}>Body</div>
          </MochiAppShell>
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiAppShell (horizontal, minimal)">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          Use <code>className=&quot;mochi-appshell--horizontal&quot;</code>: nav on the left, main (header + body) on the right.
        </p>
        <div style={{ height: 220, minHeight: 0 }}>
          <MochiAppShell className="mochi-appshell--horizontal">
            <MochiMenuNav>
              <Button variant="ghost">Nav A</Button>
              <Button variant="ghost">Nav B</Button>
            </MochiMenuNav>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, flex: 1 }}>
              <header style={{ padding: '12px 16px', borderBottom: '1px solid var(--mochi-border, #ddd)', background: 'var(--mochi-bg, #fff)', flexShrink: 0 }}>
                App shell header
              </header>
              <div style={{ padding: 16, flex: 1, minHeight: 0 }}>Body</div>
            </div>
          </MochiAppShell>
        </div>
      </MochiGroupbox>
    </>
  )
}

function SectionScene() {
  return (
    <>
      <MochiGroupbox title="MochiGroupbox & MochiSubheader — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          MochiGroupbox: optional headerRight, actions. MochiSubheader: section subtitle.
        </p>
        <MochiGroupbox title="MochiGroupbox" headerRight={<span style={{ fontSize: 12, color: 'var(--mochi-muted)' }}>Header right</span>} actions={<Button size="sm">Action</Button>}>
          Groupbox body content.
        </MochiGroupbox>
        <MochiSubheader text="MochiSubheader — section subtitle" />
      </MochiGroupbox>
    </>
  )
}

const AUTOCOMPLETE_ITEMS = [
  { id: '1', name: 'Apple' }, { id: '2', name: 'Banana' }, { id: '3', name: 'Cherry' }, { id: '4', name: 'Date' },
  { id: '5', name: 'Elderberry' }, { id: '6', name: 'Fig' }, { id: '7', name: 'Grape' }, { id: '8', name: 'Honeydew' },
  { id: '9', name: 'Kiwi' }, { id: '10', name: 'Lemon' }, { id: '11', name: 'Mango' }, { id: '12', name: 'Nectarine' },
]

function SectionAutocomplete() {
  const [value, setValue] = React.useState('')
  const [selected, setSelected] = React.useState<typeof AUTOCOMPLETE_ITEMS[0] | null>(null)
  const filtered = React.useMemo(
    () =>
      !value.trim()
        ? AUTOCOMPLETE_ITEMS
        : AUTOCOMPLETE_ITEMS.filter((i) => i.name.toLowerCase().includes(value.toLowerCase())),
    [value],
  )
  return (
    <>
      <MochiGroupbox title="MochiAutocomplete" className="lm-groupbox--popoverOpen showcase-autocomplete-group">
        <p style={{ marginBottom: 8, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          List opens by default with 12 fruits. Type to filter (e.g. &quot;ap&quot; → Apple), click or Enter to select.
        </p>
        <MochiAutocomplete
          value={value}
          onValueChange={setValue}
          items={filtered}
          onSelect={setSelected}
          getItemKey={(i) => i.id}
          getItemTitle={(i) => i.name}
          placeholder="Type to filter…"
          emptyText="No matches"
          openListByDefault
        />
        {selected && <p style={{ marginTop: 8, fontSize: 14 }}>Selected: {selected.name}</p>}
      </MochiGroupbox>
      <MochiGroupbox title="MochiPopover placements" className="lm-groupbox--popoverOpen showcase-groupbox--fullWidth">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          Click a button to open a popover in that direction. Nub position: left / center / right for above/below; top / center / bottom for left/right.
        </p>
        <PopoverPlacementGrid />
      </MochiGroupbox>
      <MochiGroupbox title="MochiPopover — list (popover follows item)" className="lm-groupbox--popoverOpen">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>
          Click a row to open a popover anchored to that item. Click again or outside to close.
        </p>
        <PopoverListDemo />
      </MochiGroupbox>
    </>
  )
}

/* Nub dimensions (from MochiAutocomplete.css): below/above = 71px wide; left/right = 71px tall */
const NUB_SIZE = 71
const NUB_CENTER_OFFSET = NUB_SIZE / 2 /* 35.5px to center the 71px nub */

type PopoverDir = 'below' | 'above' | 'left' | 'right'
const POPOVER_PLACEMENTS: { key: string; label: string; dir: PopoverDir; nub: { left?: number | string; top?: number | string } }[] = [
  { key: 'below-left', label: 'Below (nub left)', dir: 'below', nub: { left: 0 } },
  { key: 'below-center', label: 'Below (nub center)', dir: 'below', nub: { left: `calc(50% - ${NUB_CENTER_OFFSET}px)` } },
  { key: 'below-right', label: 'Below (nub right)', dir: 'below', nub: { left: `calc(100% - ${NUB_SIZE}px)` } },
  { key: 'above-left', label: 'Above (nub left)', dir: 'above', nub: { left: 0 } },
  { key: 'above-center', label: 'Above (nub center)', dir: 'above', nub: { left: `calc(50% - ${NUB_CENTER_OFFSET}px)` } },
  { key: 'above-right', label: 'Above (nub right)', dir: 'above', nub: { left: `calc(100% - ${NUB_SIZE}px)` } },
  { key: 'left-top', label: 'Left (nub top)', dir: 'left', nub: { top: 0 } },
  { key: 'left-center', label: 'Left (nub center)', dir: 'left', nub: { top: `calc(50% - ${NUB_CENTER_OFFSET}px)` } },
  { key: 'left-bottom', label: 'Left (nub bottom)', dir: 'left', nub: { top: `calc(100% - ${NUB_SIZE}px)` } },
  { key: 'right-top', label: 'Right (nub top)', dir: 'right', nub: { top: 0 } },
  { key: 'right-center', label: 'Right (nub center)', dir: 'right', nub: { top: `calc(50% - ${NUB_CENTER_OFFSET}px)` } },
  { key: 'right-bottom', label: 'Right (nub bottom)', dir: 'right', nub: { top: `calc(100% - ${NUB_SIZE}px)` } },
]

function PopoverPlacementGrid() {
  const [openKey, setOpenKey] = React.useState<string | null>(null)
  const popoverContent = (label: string) => (
    <div style={{ padding: 16, minWidth: 160 }}>Popover: {label}</div>
  )
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-start' }}>
      {POPOVER_PLACEMENTS.map(({ key, label, dir, nub }) => (
        <div key={key} style={{ position: 'relative' }}>
          {openKey === key && (
            <MochiPopover
              dir={dir}
              nub={nub}
              style={
                dir === 'below'
                  ? { position: 'absolute', top: '100%', marginTop: 8, left: 0 }
                  : dir === 'above'
                    ? { position: 'absolute', bottom: '100%', marginBottom: 8, left: 0 }
                    : dir === 'left'
                      ? { position: 'absolute', right: '100%', marginRight: 8, top: '50%', transform: 'translateY(-50%)' }
                      : { position: 'absolute', left: '100%', marginLeft: 8, top: '50%', transform: 'translateY(-50%)' }
              }
            >
              {popoverContent(label)}
            </MochiPopover>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setOpenKey(openKey === key ? null : key)}
          >
            {label}
          </Button>
        </div>
      ))}
    </div>
  )
}

const POPOVER_LIST_ITEMS = [
  { id: '1', name: 'First item', desc: 'Detail for first' },
  { id: '2', name: 'Second item', desc: 'Detail for second' },
  { id: '3', name: 'Third item', desc: 'Detail for third' },
  { id: '4', name: 'Fourth item', desc: 'Detail for fourth' },
  { id: '5', name: 'Fifth item', desc: 'Detail for fifth' },
]

function PopoverListDemo() {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [anchorRect, setAnchorRect] = React.useState<DOMRect | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const openFor = (id: string, el: HTMLElement) => {
    setAnchorRect(el.getBoundingClientRect())
    setActiveId(activeId === id ? null : id)
  }
  const close = () => {
    setActiveId(null)
    setAnchorRect(null)
  }

  const activeItem = activeId ? POPOVER_LIST_ITEMS.find((i) => i.id === activeId) : null

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 320, border: '1px solid var(--mochi-border, #ddd)', borderTop: 'none' }}>
        {POPOVER_LIST_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={(e) => openFor(item.id, e.currentTarget)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                border: 'none',
                borderTop: '1px solid var(--mochi-border, #ddd)',
                background: activeId === item.id ? 'rgba(105, 205, 255, 0.12)' : 'transparent',
                cursor: 'pointer',
                font: 'inherit',
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      {activeItem && anchorRect && (
        <MochiPopover
          dir="below"
          nub={{ left: 24 }}
          style={{
            position: 'fixed',
            top: anchorRect.bottom + 8,
            left: anchorRect.left,
            minWidth: 200,
            zIndex: 100,
          }}
        >
          <div style={{ padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{activeItem.name}</div>
            <div style={{ fontSize: 14, color: 'var(--mochi-muted, #666)' }}>{activeItem.desc}</div>
          </div>
        </MochiPopover>
      )}
      {activeId && (
        <div
          role="presentation"
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
          onClick={close}
          onTouchStart={close}
        />
      )}
    </div>
  )
}

function SectionContacts() {
  return (
    <>
      <MochiGroupbox title="MochiContactAvatar — variants">
        <p style={{ marginBottom: 12, fontSize: 14, color: 'var(--mochi-muted, #666)' }}>Status: ok, warn. Single or stacked contacts.</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <MochiContactAvatar contacts={['Alice', 'Bob']} status="ok" />
          <MochiContactAvatar contacts={['Single']} status="warn" />
        </div>
      </MochiGroupbox>
      <MochiGroupbox title="MochiContactList & MochiContactRow — variants">
        <MochiContactList>
          <MochiContactRow
            avatar={<MochiContactAvatar contacts={['Jane Doe']} status="ok" />}
            status={<MochiStatusPill status="ok" label="Active" compact />}
            onClick={() => {}}
          >
            <MochiContactName>Jane Doe</MochiContactName>
            <MochiContactSub>jane@example.com</MochiContactSub>
          </MochiContactRow>
          <MochiContactRow
            avatar={<MochiContactAvatar contacts={['John Smith']} status="warn" />}
            status={<MochiStatusPill status="warn" label="Pending" compact />}
            onClick={() => {}}
          >
            <MochiContactName>John Smith</MochiContactName>
            <MochiContactSub>john@example.com</MochiContactSub>
          </MochiContactRow>
        </MochiContactList>
      </MochiGroupbox>
    </>
  )
}

function SectionPane() {
  const [searchVal, setSearchVal] = React.useState('')
  return (
    <MochiGroupbox title="MochiPane & MochiPaneStack (with router)" className="showcase-groupbox--fill">
      <MochiPaneStack ariaLabel="Demo stack" persistKey="showcase">
        <MochiPane
          paneId="pane-1"
          label="Pane demo"
          title="Pane title"
          count={3}
          search={{ value: searchVal, onChange: setSearchVal, placeholder: 'Search in pane' }}
        >
          <div style={{ padding: 24 }}>Pane body. Use the header search and close button.</div>
        </MochiPane>
      </MochiPaneStack>
    </MochiGroupbox>
  )
}

function Content() {
  const location = useLocation()
  const slug = location.pathname.slice(1) || SECTIONS[0].id
  const section = SECTIONS.find((s) => s.id === slug) ?? SECTIONS[0]
  const isWide = slug === 'layout' || slug === 'shell'
  const isPane = slug === 'pane'
  if (isPane) {
    return (
      <div
        style={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, flexShrink: 0 }}>{section.label}</h1>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <SectionPane />
        </div>
      </div>
    )
  }
  return (
    <div
      style={{
        padding: 24,

      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>{section.label}</h1>
      <div className={isWide ? 'showcase-masonry showcase-masonry--wide' : 'showcase-masonry'}>
        {slug === 'buttons' && <SectionButtons />}
        {slug === 'forms' && <SectionForms />}
        {slug === 'lists' && <SectionLists />}
        {slug === 'layout' && <SectionLayout />}
        {slug === 'controls' && <SectionControls />}
        {slug === 'shell' && <SectionShell />}
        {slug === 'scene' && <SectionScene />}
        {slug === 'autocomplete' && <SectionAutocomplete />}
        {slug === 'contacts' && <SectionContacts />}
      </div>
    </div>
  )
}

function App() {
  return (
    <MochiRoot>
      <MemoryRouter initialEntries={['/buttons']} initialIndex={0}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Nav />
          <main style={{ flex: 1, overflow: 'auto' }}>
            <Content />
          </main>
        </div>
      </MemoryRouter>
    </MochiRoot>
  )
}

const el = document.getElementById('root')
if (el) createRoot(el).render(<App />)
