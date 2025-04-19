import { useContext } from "react";
import KanbanTask from "./kanbanTask";
import { KanbanTaskContext } from "@/shared/context/kanbanTaskProvider";

interface Props {
  children: React.ReactNode;
}

export default function KanbanColumn({ children }: Props) {
  const { currentTasks } = useContext(KanbanTaskContext);

  return (
    <div className="bg-stone rounded-md shadow-md flex-1 flex flex-col overflow-hidden">
      <div className="p-2 bg-primary text-background">{children}</div>

      <div className="overflow-auto flex-1">
        {currentTasks &&
          currentTasks.map((task, index) => (
            <KanbanTask key={index} task={task} />
          ))}
      </div>
    </div>
  );
}
