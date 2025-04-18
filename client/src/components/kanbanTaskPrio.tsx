import { Priority, priorityIconMap } from "@/shared/models/task";
import Icon from "@/shared/ui/icon";

interface Props {
  prio: Priority;
}

export default function KanbanTaskPrio({ prio }: Props) {
  return <Icon name={priorityIconMap[prio]} size="lg" />;
}
