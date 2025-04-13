interface Props {
  tags: string[];
}

export default function KanbanTaskTags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="p-1.5 text-sm bg-secondary w-fit h-fit rounded-sm text-background font-semibold"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
