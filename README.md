# @mochi/ui

Mochi-style React UI components: list panes, forms, buttons, inputs, and workspace layouts. This package reimplements the [Mochi](https://github.com/enyojs/mochi) design language in React; design reference: [enyojs/mochi](https://github.com/enyojs/mochi), [Mochi Designs wiki](https://github.com/enyojs/mochi/wiki/Mochi-Designs), [stacks.webosarchive.org/mochi](https://stacks.webosarchive.org/mochi).

## Credits (original Mochi)

**Design** — Mochi was designed by the webOS UX team (Palm/HP) for the next generation of webOS phones and tablets. Design leadership: **Itai Vonshak** (director of human interface) and **Liron Damir** (visual design director), who led and finalized the Mochi design language. Design work continued through the transition to LG. The [Mochi Designs](https://github.com/enyojs/mochi/wiki/Mochi-Designs) wiki (component specs and red lines) was maintained by **Harlan**. (Source: [The Verge, “The lost secrets of webOS”](https://www.theverge.com/2014/1/2/5264580/the-lost-secrets-of-webos), 2014.)

**Implementation (Enyo 2 library)** — Original implementation and open-source release by the Enyo team at LG; copyright (c) 2014 LG Electronics. Notable code contributors (from the [enyojs/mochi](https://github.com/enyojs/mochi) repository): Ben Combee (unwiredben), Prashant Sarin (psarin), kranga-lge, EquusQuagga, Herman van Hazendonk (Herrie82), clinuz, DimitrK, Aaron Tam (aarontam), Andolamin, and others (see [contributors](https://github.com/enyojs/mochi/graphs/contributors)).

**Community maintainers** — After the 2014 open-source release, Herman van Hazendonk ([Herrie82](https://github.com/Herrie82)) and Tom King ([ka6sox](https://github.com/ka6sox)) of the webOS Ports community served as maintainers, with the Enyo team at LG providing guidance.

## License

Same as the original Mochi project: **Apache License, Version 2.0**.  
See [LICENSE](./LICENSE) in this package.  
Original Mochi: [LICENSE-2.0.txt](https://github.com/enyojs/mochi/blob/master/LICENSE-2.0.txt).

## Install

```bash
npm i @mochi/ui
```

**Peer dependencies:** React 18+ and optionally `react-router-dom` (≥6) if you use `MochiPane` / `MochiPaneStack`.

## Usage

Import components and styles from the package. Components use the `Mochi` prefix (e.g. `MochiButton`, `MochiPane`).

```tsx
import { MochiRoot, MochiButton, MochiPane } from '@mochi/ui'
// CSS is bundled with each component; no extra style import needed if your bundler follows component imports.
```

Build the package before use (or use a workspace that runs `npm run build` in this package):

```bash
npm run build
```

## Exports

- **Layout:** `MochiRoot`, `MochiPane`, `MochiPaneStack`, `MochiWorkspace`, `MochiSplitTabLayout`, `MochiSplitScrollColumns`, `MochiCard`, `MochiCardHeader`, `MochiCardTitle`, `MochiCardContent`
- **Forms:** `MochiInput`, `MochiCheckbox`, `MochiRadio`, `MochiToggle`, `MochiSelect`, `MochiFormRow`, `MochiFormCol`, `MochiFormSection`, `MochiFormLabel`, `MochiFormControl`, etc.
- **Lists:** `MochiList`, `MochiListPane`, `MochiListItemRow`, `MochiListItemLabel`, `MochiListItemCaption`, `MochiListFooter`, `MochiContactList`, `MochiContactRow`, `MochiContactName`, `MochiContactSub`, `MochiContactAvatar`
- **Controls:** `Button` (from MochiButton), `MochiSearch`, `MochiAutocomplete`, `MochiPopover`, `MochiSlider`, `MochiSpinner`, `MochiMultiSwitch`, `MochiStatusPill`, `MochiCountBadge`, `MochiGroupbox`, `MochiSubheader`
- **Shell:** `MochiAppShell`, `MochiMenuNav`
- **Utils:** `cn`

## Showcase

A minimal static showcase of all components lives in [`showcase/`](./showcase). Build with `npm run build` in that folder (after building the library); then open `showcase/index.html` in a browser—no dev server required.

### Screenshots & video

| Screenshot | Screenshot |
|------------|------------|
| ![Showcase — forms and controls](showcase/screenshots/Screenshot%202026-02-07%20at%2005.55.13.png) | ![Showcase — layout and shell](showcase/screenshots/Screenshot%202026-02-07%20at%2005.55.24.png) |

<video src="showcase/screenshots/Screen%20Recording%202026-02-07%20at%2005.55.51.mov" controls width="720">Screen recording of the Mochi UI showcase</video>

## Versioning

Starts at `0.1.0`. Publish to npm or a private registry when ready; set `"private": false` and `"publishConfig"` as needed.
