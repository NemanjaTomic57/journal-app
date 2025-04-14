interface Props {
  tags: string[];
}

export default function KanbanTaskTags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-secondary w-fit h-fit rounded-sm text-background font-semibold px-1.5 py-0.5 text-xs"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
