import * as React from 'react'
import './MochiBase.css'
import './MochiFormRows.css'
import './MochiLogin.css'

/**
 * Applies Mochi root styling by:
 * - bundling base Mochi CSS (fonts + `.mochi` root theme)
 * - toggling the `mochi` class on document.body
 */
export function MochiRoot({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.body.classList.add('mochi')
    return () => document.body.classList.remove('mochi')
  }, [])

  return <>{children}</>
}

