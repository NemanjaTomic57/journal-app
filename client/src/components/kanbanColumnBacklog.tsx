"use client";

import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import Heading from "@/shared/ui/heading";
import { useRef, useState } from "react";
import Popup5xl from "@/shared/ui/popup5xl";
import InputText from "@/shared/ui/inputText";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor, { RichTextEditorHandle } from "./richTextEditor";
import DdSm, { DropdownItem } from "@/shared/ui/ddSm";
import { priorityListDd } from "@/shared/models/task";

const createTaskSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  priority: z.enum(["low", "medium", "high"]),
  effortEstimate: z.string().optional(),
  dueDate: z.date(),
});

type CreateTaskFields = z.infer<typeof createTaskSchema>;

export default function () {
  const [showCreateTask, setShowCreateTask] = useState(true);
  const methods = useForm<CreateTaskFields>({
    resolver: zodResolver(createTaskSchema),
  });
  const { handleSubmit } = methods;
  const [priority, setPriority] = useState<DropdownItem>(defaultPriority);
  const editorRef = useRef<RichTextEditorHandle>(null);

  const createTask: SubmitHandler<CreateTaskFields> = async (data) => {
    console.log("Task created");
    console.log(data);
  };

  return (
    <div className="flex justify-between items-center">
      <Heading type="h3">Backlog</Heading>
      <Button
        onClick={() => setShowCreateTask(!showCreateTask)}
        className="btn-sm btn-stroked-primary"
      >
        <Icon name="plus" />
        New Task
      </Button>

      {/* POPUP FOR TASK CREATION */}
      {showCreateTask && (
        <Popup5xl onClose={() => setShowCreateTask(false)}>
          <div className="p-8 text-primary max-h-[90dvh] overflow-auto">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(createTask)}
                noValidate
                className="gap-2 grid"
              >
                <div className="flex justify-between items-center mb-2">
                  <Heading type="h2">Create a new task</Heading>
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

                <InputText inputName="title" label="Title" />

                <div className="h-[60dvh] min-h-[400px] max-h-[300px] flex flex-col">
                  <label className="input-label">Description</label>
                  <RichTextEditor
                    ref={editorRef}
                    placeholder="Write a description for your task ..."
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </Popup5xl>
      )}
    </div>
  );
}

const defaultPriority: DropdownItem = {
  text: "Priority",
  icon: "prioHigh",
};
