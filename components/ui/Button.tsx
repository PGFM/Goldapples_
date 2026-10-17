import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondaryOnDark" | "gold";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] text-sm font-semibold tracking-wide transition-colors duration-150 ease-out min-h-11 px-6";

const variants: Record<Variant, string> = {
  primary: "bg-graphite text-white hover:bg-ink",
  secondary:
    "px-0 min-h-11 bg-transparent text-ink border-b border-ink/40 hover:border-ink rounded-none",
  secondaryOnDark:
    "border border-champagne/45 bg-white/5 text-champagne hover:border-gold hover:bg-white/10 hover:text-white",
  gold: "bg-linear-to-br from-gold-deep to-gold text-ink hover:brightness-95",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (props.href !== undefined) {
    const {
      variant: _variant,
      children: linkChildren,
      className: _className,
      href,
      ...rest
    } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {linkChildren}
      </Link>
    );
  }

  const {
    variant: _v,
    children: buttonChildren,
    className: _cl,
    href: _h,
    ...rest
  } = props;
  return (
    <button className={classes} {...rest}>
      {buttonChildren}
    </button>
  );
}
