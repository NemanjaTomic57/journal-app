import KanbanTask from "./kanbanTask";
import { Task } from "@/shared/models/task";

interface Props {
  tasks?: Task[];
  children: React.ReactNode;
}

export default function KanbanColumn({ tasks, children }: Props) {
  return (
    <div className="bg-stone rounded-md shadow-md flex-1 flex flex-col overflow-hidden">
      <div className="p-2 bg-primary text-background">{children}</div>

      <div className="overflow-auto flex-1">
        {tasks &&
          tasks.map((task, index) => (
            <KanbanTask key={index} task={task} />
          ))}
      </div>
    </div>
  );
}
