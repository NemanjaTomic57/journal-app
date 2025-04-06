import clsx from "clsx";

interface Props {
  type: "h1" | "h1" | "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
}

export const style = {
    h1: "text-5xl font-semibold",
    h2: "text-4xl",
    h3: "text-2xl",
    h4: "text-1xl font-semibold",
}

export default function Heading({ type, className, children }: Props) {

  return <div className={clsx(style[type], className)}>{children}</div>;
}
