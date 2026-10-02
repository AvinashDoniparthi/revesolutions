import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * The only button on the site.
 *
 * There used to be three: this component, plus two lifted from uiverse.io that
 * lived as bare CSS classes (a 1.1s ripple sweep on the nav CTA, a 900px
 * expanding circle on the form submit). They had different hover physics,
 * different radii and different focus behaviour, which is what made the page
 * read as assembled rather than designed. One press gesture now covers every
 * button and link-styled-as-button.
 *
 * The press is CSS rather than Framer Motion so that the same code path serves
 * both `<button>` and react-router's `<Link>`; index.css neutralises the
 * transform under `prefers-reduced-motion`.
 */

type Variant = 'primary' | 'outline' | 'white';
type Size = 'sm' | 'md' | 'lg';

const base =
  'btn-press group relative inline-flex items-center justify-center rounded-full font-semibold ' +
  'tracking-normal select-none cursor-pointer no-underline ' +
  'transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out ' +
  'hover:scale-[1.02] active:scale-[0.98] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

const sizes: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
};

const variants: Record<Variant, string> = {
  primary: 'bg-brand hover:bg-brand-hover text-white shadow-md shadow-brand/20',
  outline: 'bg-white hover:bg-surface-sunken text-ink border border-line shadow-xs',
  white: 'bg-white hover:bg-surface-raised text-brand shadow-xl border border-line-strong',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  icon?: LucideIcon;
  showArrow?: boolean;
  fullWidth?: boolean;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    to?: never;
    /** Swaps the label for a spinner and disables the control. */
    loading?: boolean;
    loadingLabel?: string;
  };

type ButtonAsLink = CommonProps & {
  /** Renders a react-router `<Link>` styled identically to the button. */
  to: string;
  onClick?: () => void;
  loading?: never;
  loadingLabel?: never;
};

export const Button: React.FC<ButtonAsButton | ButtonAsLink> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon: Icon,
  showArrow = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  const classes = cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className);

  const label = (
    <>
      {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {label}
      </Link>
    );
  }

  const { loading = false, loadingLabel, disabled, type = 'button', ...buttonProps } =
    rest as ButtonAsButton;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonProps}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 shrink-0 animate-spin" aria-hidden="true" />
          <span>{loadingLabel ?? 'Working...'}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
