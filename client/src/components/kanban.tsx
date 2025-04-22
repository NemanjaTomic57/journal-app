"use client";

import { Active, DndContext, DragOverlay, Over, closestCenter } from "@dnd-kit/core";
import KanbanDroppable from "./kanbanDroppable";
import { Status } from "@/shared/models/task";
import { useContext } from "react";
import { KanbanTaskContext } from "@/shared/context/kanbanTaskProvider";
import KanbanTask from "./kanbanTask";

export default function Kanban() {
  const { tasks, setTasks, activeTask, setActiveTask } = useContext(KanbanTaskContext);
  const statusContainers = Object.values(Status).map((s) => s);

  function handleDragStart(active: Active) {
    setActiveTask(tasks.find(t => t.id === active.id) || null)
  }

  function handleDragEnd(active: Active, over: Over | null) {
    if (over === null) return;

    setTasks((prev) => {
      prev.find((t) => t.id === active.id)!.status = over.id as Status;
      return prev;
    });

    setActiveTask(null);
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={({ active }) => handleDragStart(active)}
      onDragEnd={({ active, over }) => handleDragEnd(active, over)}
    >
      {statusContainers.map((status) => (
        <KanbanDroppable key={status} status={status} />
      ))}
      
      <DragOverlay className="z-100000">
        {activeTask ? (
            <KanbanTask task={activeTask} />
        ): null}
      </DragOverlay>
    </DndContext>
  );
}
