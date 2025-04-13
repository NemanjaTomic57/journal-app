import KanbanTaskPrio from "@/components/kanbanTaskPrio";
import KanbanTaskTags from "@/components/kanbanTaskTags";
import { Priority } from "@/shared/interfaces/task";
import { getDateOnly } from "@/shared/libs/dateTime";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";

export default function Page() {
  return (
    <div className="container">
      <div className="flex gap-12 items-center">
        <Heading type="h2">Kanban</Heading>

        <Button className="btn-fill-lg flex gap-2 items-center">
          <Icon name="plus" />
          Create Task
        </Button>
      </div>

      <div className="flex justify-between">
        <div>
          <Heading type="h3">Backlog</Heading>

          <div>
            {tasks.map((task, index) => (
              <div key={index} className="grid grid-cols-2 p-4">
                <div>
                  <KanbanTaskPrio prio={task.priority} />
                  <KanbanTaskTags tags={task.tags} />
                </div>
                <div>
                  <Heading type="h4">{task.title}</Heading>
                  <p>{task.description}</p>
                  <p className="col-start-2 bg-stone text-sm rounded-md w-fit px-2 py-0.5 mt-2">
                    Due date:{" "}
                    <span className="font-semibold">
                      {getDateOnly(task.createdAt)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
  },

  {
    createdAt: new Date(),
    title: "Learn Mathematics for ML",
    description:
      "You should master the basics in Calculus, Probability, Linear Algebra, and Optimization.",
    priority: Priority.Medium,
    tags: ["Machine Learning"],
    effortEstimate: "3 months",
  },

  {
    createdAt: new Date(),
    title: "Complete the Data Scientist Course",
    description:
      "Complete the Data Scientist Course with a grade of 2 or higher. The project should have an extra high priority.",
    priority: Priority.High,
    tags: ["Machine Learning"],
    effortEstimate: "4 months",
  },
];
