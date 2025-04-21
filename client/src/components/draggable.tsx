"use client";

import { useDraggable } from "@dnd-kit/core";

interface Props {
  id: number;
  className?: string;
  children: React.ReactNode;
}

export default function Draggable({ id, className, children }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        border: "none",
      }
    : undefined;

  return (
    <div ref={setNodeRef} className={className} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
