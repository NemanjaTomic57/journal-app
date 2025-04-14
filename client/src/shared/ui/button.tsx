import clsx from "clsx";
import Link from "next/link";

interface Props {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  type = "button",
  disabled,
  href,
  className,
  children,
}: Props) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={clsx("btn flex items-center gap-1", className)}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={clsx("btn flex items-center gap-1", className)}
          type={type}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
}
