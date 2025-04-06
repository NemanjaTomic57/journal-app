"use client";

import RichTextEditor from "@/components/richTextEditor";
import Button from "@/shared/ui/button";
import Heading from "@/shared/ui/heading";
import { useRef } from "react";
import toast from "react-hot-toast";

export type RichTextEditorHandle = {
  getHTML: () => string | undefined;
}

export default function Page() {
  const editorRef = useRef<RichTextEditorHandle>(null);

  const handleSubmit = () => {
    const html = editorRef.current?.getHTML();
    if (html == null || html?.length < 100) {
      toast.error("Please write at least 100 characters");
      return;
    }
    console.log("Saved HTML: ", html);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading type="h1">
          New Entry
        </Heading>
        <Button className="btn-fill-lg" onClick={handleSubmit}>Save</Button>
      </div>

      <RichTextEditor ref={editorRef} />
    </div>
  );
}
