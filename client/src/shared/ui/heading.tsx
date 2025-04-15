import clsx from "clsx";

interface Props {
  type: "h1" | "h1" | "h2" | "h3" | "h4" | "h5";
  className?: string;
  children: React.ReactNode;
}

export const style = {
    h1: "text-5xl font-semibold",
    h2: "text-4xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
    h5: "text-base font-semibold",
}

export default function Heading({ type, className, children }: Props) {

  return <div className={clsx(style[type], className)}>{children}</div>;
}
