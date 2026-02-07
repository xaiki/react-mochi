import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import esbuild from 'esbuild'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const pkgDist = path.join(__dirname, '..', 'dist')
const nodeModules = path.join(__dirname, 'node_modules')
// Single React instance + production builds only (avoids duplicate React and DevTools DCE error).
const reactAlias = {
  'react': path.join(nodeModules, 'react', 'cjs', 'react.production.min.js'),
  'react/jsx-runtime': path.join(nodeModules, 'react', 'cjs', 'react-jsx-runtime.production.min.js'),
  'react-dom': path.join(nodeModules, 'react-dom', 'cjs', 'react-dom.production.min.js'),
  'react-dom/client': path.join(nodeModules, 'react-dom', 'client.js'),
  'react-router-dom': path.join(nodeModules, 'react-router-dom'),
}

// CSS order: base first, then form/login, then rest
const cssOrder = [
  'MochiBase.css',
  'MochiFormRows.css',
  'MochiLogin.css',
  'MochiButton.css',
  'MochiInput.css',
  'MochiControls.css',
  'MochiAppShell.css',
  'MochiAutocomplete.css',
  'MochiContactAvatar.css',
  'MochiContactList.css',
  'MochiContactRow.css',
  'MochiCountBadge.css',
  'MochiList.css',
  'MochiPane.css',
  'MochiRadio.css',
  'MochiScene.css',
  'MochiSlider.css',
  'MochiSplitDivider.css',
  'MochiSplitScrollColumns.css',
  'MochiStatusPill.css',
  'MochiToggle.css',
]

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })

const existingCss = new Set(fs.readdirSync(pkgDist).filter((f) => f.endsWith('.css')))
let combined = ''
for (const name of cssOrder) {
  if (!existingCss.has(name)) continue
  let css = fs.readFileSync(path.join(pkgDist, name), 'utf8')
  // Strip @font-face that reference /mochi/fonts so file:// and static hosting work without those assets
  if (name === 'MochiBase.css') {
    css = css.replace(/@font-face\s*\{[\s\S]*?\}/g, (block) => (block.includes('/mochi/fonts') ? '' : block))
  }
  combined += css + '\n'
}
for (const name of fs.readdirSync(pkgDist).sort()) {
  if (!name.endsWith('.css') || cssOrder.includes(name)) continue
  combined += fs.readFileSync(path.join(pkgDist, name), 'utf8') + '\n'
}
combined += '\n/* Showcase: fallback when Mochi font-faces are stripped */\n.mochi { font-family: "Mochi Bold Oblique", Lato, sans-serif; }\n'
/* Semantic color tokens (MochiMultiSwitch and similar use Tailwind classes that rely on these) */
combined += `
.mochi {
  --background: 0 0% 96%;
  --foreground: 0 0% 20%;
  --muted-foreground: 0 0% 42%;
  --border: 0 0% 64%;
}
/* MochiMultiSwitch: no Tailwind in showcase, so style by structure */
.mochi [role="tablist"] {
  display: inline-flex;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 4px 8px;
  background-color: hsl(var(--background) / 0.6);
  color: hsl(var(--muted-foreground));
  border: 1px solid hsl(var(--border));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.mochi [role="tablist"] [role="tab"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 18px;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  font-style: italic;
  transition: background-color 0.15s, color 0.15s;
  background: transparent;
  border: none;
  cursor: pointer;
  color: hsl(var(--muted-foreground));
}
.mochi [role="tablist"] [role="tab"]:hover:not(:disabled) {
  background-color: rgb(255 255 255 / 0.6);
  color: hsl(var(--foreground));
}
.mochi [role="tablist"] [role="tab"][aria-selected="true"] {
  background-color: white;
  color: hsl(var(--foreground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.mochi [role="tablist"] [role="tab"]:disabled {
  opacity: 0.5;
  pointer-events: none;
}
/* Autocomplete groupbox stacks above the next section so the dropdown is not obscured */
.mochi-groupbox.lm-groupbox--popoverOpen.showcase-autocomplete-group {
  z-index: 81;
}
`
// Use original nub images: copy from frontend public and point CSS at them (relative to dist/mochi.css)
const nubsSrc = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'mochi', 'images', 'contextual-popup-nubs')
const nubsDest = path.join(distDir, 'mochi-nubs')
if (fs.existsSync(nubsSrc)) {
  if (!fs.existsSync(nubsDest)) fs.mkdirSync(nubsDest, { recursive: true })
  for (const name of ['up.png', 'down.png', 'left.png', 'right.png']) {
    const src = path.join(nubsSrc, name)
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(nubsDest, name))
  }
  combined = combined
    .replace(/url\s*\(\s*["']?\/mochi\/images\/contextual-popup-nubs\/up\.png["']?\s*\)/g, 'url("mochi-nubs/up.png")')
    .replace(/url\s*\(\s*["']?\/mochi\/images\/contextual-popup-nubs\/down\.png["']?\s*\)/g, 'url("mochi-nubs/down.png")')
    .replace(/url\s*\(\s*["']?\/mochi\/images\/contextual-popup-nubs\/left\.png["']?\s*\)/g, 'url("mochi-nubs/left.png")')
    .replace(/url\s*\(\s*["']?\/mochi\/images\/contextual-popup-nubs\/right\.png["']?\s*\)/g, 'url("mochi-nubs/right.png")')
}
// Strip any other /mochi/images/ URLs (so file:// and static hosting still work for other assets)
combined = combined.replace(/url\s*\(\s*["']?\/mochi\/images\/[^"')]+["']?\s*\)/g, 'none')
fs.writeFileSync(path.join(distDir, 'mochi.css'), combined, 'utf8')

await esbuild.build({
  entryPoints: [path.join(__dirname, 'src', 'App.tsx')],
  bundle: true,
  format: 'iife',
  outfile: path.join(distDir, 'app.js'),
  platform: 'browser',
  define: { 'process.env.NODE_ENV': '"production"' },
  loader: { '.css': 'empty', '.tsx': 'tsx', '.ts': 'ts' },
  jsx: 'automatic',
  alias: reactAlias,
})
console.log('Showcase built: dist/app.js, dist/mochi.css')
