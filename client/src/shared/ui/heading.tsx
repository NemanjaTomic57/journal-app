import clsx from "clsx";

interface Props {
  type: "h1" | "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ type, className, children }: Props) {
    const style = {
        h1: "text-4xl",
        h2: "text-3xl",
        h3: "text-2xl",
    }

  return <h1 className={clsx(style[type], className)}>{children}</h1>;
}
