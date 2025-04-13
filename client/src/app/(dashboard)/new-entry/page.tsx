"use client";

import RichTextEditor from "@/components/richTextEditor";
import { useInputPlaceholder } from "@/shared/libs/useInputPlaceholder";
import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import { useRef } from "react";
import toast from "react-hot-toast";

export type RichTextEditorHandle = {
  getHTML: () => string | undefined;
};

export default function Page() {
  const editorRef = useRef<RichTextEditorHandle>(null);

  const handleSubmit = () => {
    const html = editorRef.current?.getHTML();
    if (html == null || html?.length < 100) {
      toast.error("Please write at least 100 characters");
      return;
    }
    console.log("Saved HTML: ", html);
  };

  return (
    <div className="container pt-0! flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-end mb-4 gap-20">
        <input
          placeholder="Title"
          className="text-5xl border-b-1 w-full outline-0 px-4"
        />
        <Button className="btn-fill-lg flex items-center gap-2" onClick={handleSubmit}>
          <Icon name="save" />
          Save
        </Button>
      </div>

      <RichTextEditor ref={editorRef} />
    </div>
  );
}
