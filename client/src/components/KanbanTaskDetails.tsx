"use client";

import { Task } from "@/shared/interfaces/task";
import Heading from "@/shared/ui/heading";
import Overlay from "@/shared/ui/overlay";
import KanbanTaskTags from "./kanbanTaskTags";
import { useRef } from "react";
import { useOnClickOutside } from "@/shared/libs/useOnClickOutside";

interface Props {
  task: Task;
  closeDetails: () => void;
}

export default function KanbanTaskDetails({ task, closeDetails }: Props) {
  const taskRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(taskRef, () => closeDetails());

  return (
    <>
      <Overlay />

      <div
        ref={taskRef}
        className="fixed w-[700px] h-fit inset-0 m-auto bg-background rounded-md shadow-xl p-4"
      >
        <Heading type="h3">{task.title}</Heading>
        <KanbanTaskTags tags={task.tags} />
        <p>{task.description}</p>
        <p>{task.status}</p>
      </div>
    </>
  );
}
