"use client";

import RichTextEditor, { RichTextEditorHandle } from "@/components/richTextEditor";
import { apiUrl } from "@/environment";
import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const createJournalEntrySchema = z.object({
  entry: z.string().optional(),
  title: z.string().optional(),
});

type CreateJournalEntryFields = z.infer<typeof createJournalEntrySchema>;

export default function Page() {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const methods = useForm<CreateJournalEntryFields>({
    resolver: zodResolver(createJournalEntrySchema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;
  const titlePlaceholder = "Title";
  const [titlePlaceholderState, setTitlePlaceholderState] = useState(titlePlaceholder);

  function createJournalEntry(data: CreateJournalEntryFields) {
    if (data.entry === "" || data.title === "") {
      toast.error("Make sure all fields are filled out.");
      return;
    }
  }

  function handleJournalChange() {
    const value = editorRef.current?.getHTML() || "";
    setValue("entry", value);
  }

  return (
    <div className="container pt-0! flex-1 overflow-hidden">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createJournalEntry)} noValidate className="h-full flex flex-col">
          <div className="flex justify-between items-end mb-4 gap-20">
            <input
              {...register("title")}
              placeholder={titlePlaceholderState}
              className="text-5xl w-full px-4 mb-[1px] border-b-1 focus:mb-0 focus:border-b-2 outline-0"
              onFocus={() => setTitlePlaceholderState("")}
              onBlur={() => setTitlePlaceholderState(titlePlaceholder)}
              tabIndex={1}
            />
            <Button className="btn-lg btn-fill-primary flex items-center gap-2" type="submit" disabled={isSubmitting}>
              <Icon name="save" />
              Save
            </Button>
          </div>

          <RichTextEditor
            ref={editorRef}
            placeholder="Write about something amazing from your life ..."
            onChange={handleJournalChange}
            content={watch("entry")}
          />
        </form>
      </FormProvider>
    </div>
  );
}
