"use client";

import KanbanColumn from "@/components/kanbanColumn";
import KanbanColumnBacklog from "@/components/kanbanColumnBacklog";
import KanbanTaskProvider from "@/shared/context/kanbanTaskProvider";
import { Priority, Status } from "@/shared/models/task";
import Heading from "@/shared/ui/heading";

export default function Page() {
  return (
    <div className="container flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden">
        <KanbanTaskProvider tasks={tasksMock}>
          <KanbanColumn>
            <KanbanColumnBacklog />
          </KanbanColumn>

          <KanbanColumn>
            <Heading type="h3">To Do</Heading>
          </KanbanColumn>

          <KanbanColumn>
            <Heading type="h3">In Progress</Heading>
          </KanbanColumn>

          <KanbanColumn>
            <Heading type="h3">Done</Heading>
          </KanbanColumn>
        </KanbanTaskProvider>
      </div>
    </div>
  );
}

const tasksMock = [
  {
    createdAt: new Date(),
    title: "Create Journal App",
    description:
      "The user is able to create journal entries, appointments, tasks in kanban and manage all those properties in his dashboard.",
    priority: Priority.Low,
    tags: ["NextJS", "Asp.Net Core"],
    attachments: [],
    effortEstimate: "10 days",
    dueDate: new Date("2024-01-01"),
    status: Status.Backlog,
  },

  {
    createdAt: new Date(),
    title: "Learn Mathematics for ML",
    description: "Just build something :)",
    priority: Priority.Medium,
    tags: ["Machine Learning"],
    attachments: [],
    effortEstimate: "3 months",
    dueDate: new Date("2024-01-01"),
    status: Status.Backlog,
  },

  {
    createdAt: new Date(),
    title: "Complete the Data Scientist Course",
    description: "Just build",
    priority: Priority.High,
    tags: ["Machine Learning"],
    attachments: [],
    effortEstimate: "4 months",
    dueDate: new Date("2024-01-01"),
    status: Status.Backlog,
  },
];
