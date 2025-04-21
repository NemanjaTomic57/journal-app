"use client";

import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import Heading from "@/shared/ui/heading";
import { useContext, useEffect, useState } from "react";
import Popup5xl from "@/shared/ui/popup5xl";
import InputText from "@/shared/ui/inputText";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DdSm, { DropdownItem } from "@/shared/ui/ddSm";
import { Priority, priorityListDd, Status, Task } from "@/shared/models/task";
import InputTags from "@/shared/ui/inputTags";
import InputDatepicker from "@/shared/ui/inputDatepicker";
import InputFile from "@/shared/ui/inputFile";
import InputTaskDescription from "@/shared/ui/inputTaskDescription";
import { KanbanTaskContext } from "@/shared/context/kanbanTaskProvider";

const createTaskSchema = z.object({
  priority: z.string(),
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  tags: z.array(z.string()).optional(),
  effortEstimation: z.string(),
  dueDate: z.string().nonempty("Due date is required"),
  attachments: z.any().optional(),
});

type CreateTaskFields = z.infer<typeof createTaskSchema>;

export default function KanbanCreateTask() {
  const {setTasks: setCurrentTasks} = useContext(KanbanTaskContext);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const methods = useForm<CreateTaskFields>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      priority: Priority.High.toString(),
    },
  });
  const [priority, setPriority] = useState<DropdownItem>(getPriorityText(Priority.High));
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const { handleSubmit, setValue } = methods;

  const createTask: SubmitHandler<CreateTaskFields> = async (data) => {
    const newTask: Task = {
      id: 10,
      title: data.title,
      description: data.description,
      priority: Priority[data.priority as keyof typeof Priority],
      dueDate: new Date(data.dueDate),
      status: Status.Backlog,
    }

    setCurrentTasks(prev => {
      return [...prev, newTask];
    })

    console.log(newTask);
  };

  useEffect(() => {
    setValue("tags", activeTags);
    setValue("priority", priority.text);
  }, [activeTags, priority, setValue]);

  return (
    <div className="flex justify-between items-center">
      <Heading type="h3">Backlog</Heading>
      <Button
        onClick={() => setShowCreateTask(!showCreateTask)}
        className="btn-sm btn-stroked-primary"
      >
        <Icon name="plus" />
        New Ticket
      </Button>

      {/* POPUP FOR TASK CREATION */}
      {showCreateTask && (
        <Popup5xl onClose={() => setShowCreateTask(false)}>
          <div className="text-primary max-h-[90dvh] overflow-auto p-6">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(createTask)}
                noValidate
                className="gap-2 grid"
              >
                <div className="flex justify-between items-center mb-2">
                  <Heading type="h2">Create a New Ticket</Heading>
                  <DdSm
                    items={priorityListDd}
                    onSelect={(priority) => setPriority(priority)}
                    buttonText={
                      <>
                        {priority.icon && (
                          <Icon
                            name={priority.icon}
                            size="sm"
                            className="text-primary"
                          />
                        )}
                        {priority.text}
                      </>
                    }
                    className="btn-stroked-background py-1.5!"
                  />
                </div>

                <InputText
                  inputName="title"
                  label="Title *"
                  placeholder="Finish the sign-in page"
                />

                <InputTaskDescription
                  inputName="description"
                  label="Description *"
                />

                <div className="grid grid-cols-2 gap-2">
                  <InputText
                    inputName="effortEstimation"
                    label="Effort Estimation"
                    placeholder="3 days"
                  />

                  <InputTags
                    label="Project Tags"
                    inputName="currentTag"
                    placeholder="Project-XYZ Department_3A"
                    activeTags={activeTags}
                    setActiveTags={setActiveTags}
                  />

                  <InputDatepicker inputName="dueDate" label="Due Date *" />

                  <InputFile inputName="attachments" label="Attachments" />

                  <Button
                    className="btn-fill-primary btn-lg ml-auto mt-auto col-2"
                    type="submit"
                  >
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </Popup5xl>
      )}
    </div>
  );
}

const getPriorityText = (value: Priority): DropdownItem =>
  priorityListDd.find((item) => item.text === value) ?? {
    text: value,
  };
