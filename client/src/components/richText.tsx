"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { RichTextEditorHandle } from "@/components/richTextEditor";
const RichTextEditor = dynamic(() => import("@/components/richTextEditor"), {
  ssr: false,
});

export default function NewEntryTextarea() {
  const quillRef = useRef<RichTextEditorHandle | null>(null);

  return (
    <div>
      <RichTextEditor ref={quillRef} />
    </div>
  );
}
