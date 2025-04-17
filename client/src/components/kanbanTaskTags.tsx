import clsx from "clsx";

interface Props {
  tags: string[];
  className: string;
}

export default function KanbanTaskTags({ tags, className }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={clsx("bg-secondary w-fit h-fit rounded-sm text-background font-semibold", className)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
