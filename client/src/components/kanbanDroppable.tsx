import { useContext } from "react";
import { KanbanTaskContext } from "@/shared/context/kanbanTaskProvider";
import { Status } from "@/shared/models/task";
import { useDroppable } from "@dnd-kit/core";
import Heading from "@/shared/ui/heading";
import KanbanCreateTask from "./kanbanCreateTask";
import Draggable from "./draggable";
import KanbanTask from "./kanbanTask";

interface Props {
  status: Status;
}

export default function KanbanDroppable({ status }: Props) {
  const { tasks: currentTasks } = useContext(KanbanTaskContext);
  const { isOver, setNodeRef } = useDroppable({ id: status });

  const style = { color: isOver ? "green" : undefined };

  return (
    <div
      ref={setNodeRef}
      className="bg-stone rounded-md shadow-md flex-1 flex flex-col overflow-hidden"
      style={style}
    >
      <div className="p-2 bg-primary text-background">
        {status === Status.Backlog ? (
          <KanbanCreateTask />
        ) : (
          <Heading type="h3">{status}</Heading>
        )}
      </div>

      <div className="overflow-auto flex-1">
        {currentTasks &&
          currentTasks.map(
            (task, index) =>
              task.status === status && (
                <Draggable key={index} className="grid divide-x-2 border-stone-shade not-last:border-b-2" id={task.id}>
                  <KanbanTask task={task} />
                </Draggable>
              )
          )}
      </div>
    </div>
  );
}
