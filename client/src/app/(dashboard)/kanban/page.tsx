import KanbanColumn from "@/components/kanbanColumn";
import KanbanColumnBacklog from "@/components/kanbanColumnBacklog";
import { Priority, Status } from "@/shared/models/task";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";

export default function Page() {
  return (
    <div className="container flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden">
        <KanbanColumn tasks={tasks}>
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
      </div>
    </div>
  );
}

const tasks = [
  {
    createdAt: new Date(),
    title: "Create Journal App",
    description:
      "The user is able to create journal entries, appointments, tasks in kanban and manage all those properties in his dashboard.",
    priority: Priority.Low,
    tags: ["NextJS", "Asp.Net Core"],
    effortEstimate: "10 days",
    dueDate: new Date("2024-01-01"),
    status: Status.Backlog,
  },

  {
    createdAt: new Date(),
    title: "Learn Mathematics for ML",
    description:
      "You should master the basics in Calculus, Probability, Linear Algebra, and Optimization.",
    priority: Priority.Medium,
    tags: ["Machine Learning"],
    effortEstimate: "3 months",
    dueDate: new Date("2024-01-01"),
    status: Status.Backlog,
  },

  {
    createdAt: new Date(),
    title: "Complete the Data Scientist Course",
    description:
      "Complete the Data Scientist Course with a grade of 2 or higher. The project should have an extra high priority.",
    priority: Priority.High,
    tags: ["Machine Learning"],
    effortEstimate: "4 months",
    dueDate: new Date("2024-01-01"),
    status: Status.Backlog,
  },
];
