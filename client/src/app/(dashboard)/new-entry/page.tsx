"use client"

import RichTextEditorVorlage from "@/components/richTextEditorVorlage";
import { style } from "@/shared/ui/heading";
import clsx from "clsx";

export default function Page() {
  return (
    <form>
      <div className="mb-4">
        <input
          name="title"
          className={clsx(
            "input input-title w-full max-w-[700px]",
            style["h2"]
          )}
          placeholder="Title"
        />
      </div>

          <RichTextEditorVorlage />
    </form>
  );
}