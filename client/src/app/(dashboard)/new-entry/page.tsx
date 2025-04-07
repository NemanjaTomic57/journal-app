"use client";

import RichTextEditor from "@/components/richTextEditor";
import { useInputPlaceholder } from "@/shared/libs/useInputPlaceholder";
import Button from "@/shared/ui/button";
import { useRef } from "react";
import toast from "react-hot-toast";

export type RichTextEditorHandle = {
  getHTML: () => string | undefined;
};

export default function Page() {
  const titleRef = useRef(null);
  const titlePlaceholder = useInputPlaceholder(titleRef, "Title");
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
    <div className="container py-0!">
      <div className="flex justify-between items-center mb-4 gap-20">
        <input
          ref={titleRef}
          placeholder={titlePlaceholder}
          className="text-5xl border-b-1 w-full outline-0 px-4"
        />
        <Button className="btn-fill-lg" onClick={handleSubmit}>
          Save
        </Button>
      </div>

      <RichTextEditor ref={editorRef} />
    </div>
  );
}
