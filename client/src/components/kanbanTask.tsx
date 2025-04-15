"use client";

import { useState } from "react";
import KanbanTaskPrio from "./kanbanTaskPrio";
import KanbanTaskTags from "./kanbanTaskTags";
import { Task } from "@/shared/interfaces/task";
import KanbanTaskDetails from "./kanbanTaskDetails";

interface Props {
  task: Task;
}

export default function KanbanTask({ task }: Props) {
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowTaskDetails(!showTaskDetails)}
        className="grid p-2 not-last:border-b-1 border-stone-shade cursor-pointer hover:bg-stone-tone"
      >
        <div className="flex gap-2 items-center mb-1">
          <KanbanTaskPrio prio={task.priority} />
          <KanbanTaskTags tags={task.tags} className="px-1.5 py-0.5 text-xs" />
        </div>

        <p className="font-semibold line-clamp-1">{task.title}</p>
        <p className="line-clamp-2 mb-1 text-sm">{task.description}</p>
      </div>

      {showTaskDetails && (
        <KanbanTaskDetails
          task={task}
          closeDetails={() => setShowTaskDetails(false)}
        />
      )}
    </>
  );
}
