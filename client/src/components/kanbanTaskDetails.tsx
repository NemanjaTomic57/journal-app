import { Task } from "@/shared/models/task";
import Heading from "@/shared/ui/heading";
import Overlay from "@/shared/ui/overlay";
import KanbanTaskTags from "./kanbanTaskTags";
import { getDateTime } from "@/shared/libs/dateTime";
import KanbanTaskPrio from "./kanbanTaskPrio";
import Popup5xl from "@/shared/ui/popup5xl";

interface Props {
  task: Task;
  closeDetails: () => void;
}

export default function KanbanTaskDetails({ task, closeDetails }: Props) {
  return (
    <Popup5xl onClose={closeDetails}>
      <div className="flex items-center justify-between gap-4 mb-4 pt-8 px-8">
        <Heading type="h2">{task.title}</Heading>
        <KanbanTaskTags tags={task.tags} className="px-3 py-1 not-last:mr-2" />
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-12">
        <div className="pl-8 pb-8 grid gap-4">
          <p>{task.description}</p>

          <Heading type="h3">Dependencies</Heading>
          <Heading type="h3">Attachments</Heading>
        </div>

        <div className="grid grid-cols-[auto_auto] bg-stone rounded-tl-md p-8 items-center gap-y-2 gap-x-12">
          <p className="font-semibold">Status</p>
          <p>{task.status}</p>
          <p className="font-semibold">Created on</p>
          <p>{getDateTime(task.createdAt)}</p>
          <p className="font-semibold">Priority</p>
          <KanbanTaskPrio prio={task.priority} />
          <p className="font-semibold">Effort estimate</p>
          <p>{task.effortEstimate}</p>
          <p className="font-semibold">Due date</p>
          <p>{getDateTime(task.dueDate)}</p>
        </div>
      </div>
    </Popup5xl>
  );
}
