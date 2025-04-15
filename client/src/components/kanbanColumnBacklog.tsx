"use client";

import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import Heading from "@/shared/ui/heading";
import { useState } from "react";
import Popup5xl from "@/shared/ui/popup5xl";
import InputText from "@/shared/ui/inputText";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createTaskSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    priority: z.enum(["low", "medium", "high"]),
    effortEstimate: z.string().optional(),
    dueDate: z.date(),
})

type CreateTaskFields = z.infer<typeof createTaskSchema>;

export default function () {
  const [showCreateTask, setShowCreateTask] = useState(true);
  const methods = useForm<CreateTaskFields>({
    resolver: zodResolver(createTaskSchema),
  });
  const {handleSubmit} = methods;

  const createTask: SubmitHandler<CreateTaskFields> = async (data) => {
    console.log("Task created");
    console.log(data);
  }

  return (
    <div className="flex justify-between items-center">
      <Heading type="h3">Backlog</Heading>
      <Button
        onClick={() => setShowCreateTask(!showCreateTask)}
        className="btn-stroke-sm border-background border-1 hover:bg-primary-tone"
      >
        <Icon name="plus" />
        New Task
      </Button>

      {/* POPUP FOR TASK CREATION */}
      {showCreateTask && (
        <Popup5xl onClose={() => setShowCreateTask(false)}>
          <div className="p-8 text-primary">
            <Heading type="h2">Create a new task</Heading>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(createTask)} noValidate>
                <InputText inputName="title" label="Title" />
                
              </form>
            </FormProvider>
          </div>
        </Popup5xl>
      )}
    </div>
  );
}
