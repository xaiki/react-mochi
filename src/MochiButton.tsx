import * as React from 'react'
import './MochiButton.css'
import { cn } from './cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  decorators?: boolean
}

export function Button({
  asChild = false,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  decorators = true,
  children,
  ...props
}: ButtonProps) {
  // Mochi-style: text button with animated underline bar
  const isDisabled = Boolean(props.disabled)
  const base = cn(
    'mochi-button',
    'select-none',
    isDisabled && 'disabled',
    // allow Tailwind spacing overrides if needed
    size === 'sm' && 'h-[34px]',
    size === 'md' && 'h-[40px]',
    size === 'lg' && 'h-[44px]',
    variant === 'destructive' && 'mochi-button-warning',
    className,
  )

  const content = decorators ? (
    <>
      <span className="mochi-button-decorator mochi-button-decorator-left mochi-button-decorator-bookened" aria-hidden="true">
        (
      </span>
      <span className="mochi-button-base">{children}</span>
      <span className="mochi-button-decorator mochi-button-decorator-right mochi-button-decorator-bookened" aria-hidden="true">
        )
      </span>
      <span className="mochi-button-bar" aria-hidden="true" />
    </>
  ) : (
    <span className="mochi-button-base">{children}</span>
  )

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string | ((args: unknown) => string); children?: React.ReactNode }>
    const childClassName = child.props?.className
    const mergedClassName =
      typeof childClassName === 'function'
        ? (args: unknown) => cn(base, childClassName(args))
        : cn(base, childClassName)

    // IMPORTANT: Mochi buttons use decorator spans for parentheses.
    return React.cloneElement(child, {
      // avoid passing button-only attrs to non-button elements
      ...(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit button-only attrs when asChild
        const { disabled, type, ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>
        return rest
      })(),
      className: mergedClassName,
      children: decorators ? (
        <>
          <span className="mochi-button-decorator mochi-button-decorator-left mochi-button-decorator-bookened" aria-hidden="true">
            (
          </span>
          <span className="mochi-button-base">{child.props?.children}</span>
          <span className="mochi-button-decorator mochi-button-decorator-right mochi-button-decorator-bookened" aria-hidden="true">
            )
          </span>
          <span className="mochi-button-bar" aria-hidden="true" />
        </>
      ) : (
        <span className="mochi-button-base">{child.props?.children}</span>
      ),
    })
  }

  return (
    <button type={type} className={base} {...props}>
      {content}
    </button>
  )
}

