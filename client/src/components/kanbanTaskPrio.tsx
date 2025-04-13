import { Priority } from "@/shared/interfaces/task";
import Icon from "@/shared/ui/icon";

const priorityIconMap: Record<Priority, string> = {
    [Priority.Low]: "prioLow",
    [Priority.Medium]: "prioMedium",
    [Priority.High]: "prioHigh",
}

interface Props {
  prio: Priority;
}

export default function KanbanTaskPrio({ prio }: Props) {
  return <Icon name={priorityIconMap[prio]} className="mb-2" size="lg" />;
}
