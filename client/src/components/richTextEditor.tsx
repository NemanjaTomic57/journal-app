"use client";

import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import { Placeholder } from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Heading, { Level } from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import clsx from "clsx";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { forwardRef, Ref, useCallback, useImperativeHandle, useRef, useState } from "react";
import { useOnClickOutside } from "@/shared/libs/useOnClickOutside";
import { RichTextEditorHandle } from "@/app/(dashboard)/new-entry/page";

const headings = [
  {
    text: "Title",
    level: 1,
  },
  {
    text: "Heading 1",
    level: 2,
  },
  {
    text: "Heading 2",
    level: 3,
  },
  {
    text: "Heading 3",
    level: 4,
  },
];

const menuButtonStyle =
  "px-3 py-2 hover:bg-stone-tint cursor-pointer grid place-items-center rounded-none!";

const isActive = "bg-stone!";

const RichTextEditor = forwardRef<RichTextEditorHandle>((props, ref) => {
  const [showHeadingDd, setShowHeadingDd] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("Heading");
  const headingDdRef = useRef(null);

  useOnClickOutside(headingDdRef, () => setShowHeadingDd(false));

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Underline,
      Bold,
      Italic,
      Strike,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https"],
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "link",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Write something amazing in your journal ...",
      })
    ],
    editorProps: {
      attributes: {
        class: "outline-none h-[500px]",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML(),
  }))

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="input p-0! overflow-scroll">
      <div className="sticky top-0 flex border-b-1 z-100 mb-4 bg-background">
        <Button
          className={clsx(
            menuButtonStyle,
            editor?.isActive("bold") && isActive
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Icon name="bold" />
        </Button>

        <Button
          className={clsx(
            menuButtonStyle,
            editor?.isActive("italic") && isActive
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icon name="italic" />
        </Button>

        <Button
          className={clsx(
            menuButtonStyle,
            editor?.isActive("underline") && isActive
          )}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Icon name="underline" />
        </Button>

        <Button
          className={clsx(
            menuButtonStyle,
            editor?.isActive("strike") && isActive,
            "mr-8"
          )}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icon name="strikethrough" />
        </Button>

        <Button
          className={clsx(
            menuButtonStyle,
            editor?.isActive("highlight") && isActive
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: "var(--stone)" })
              .run()
          }
        >
          <Icon name="highlight" />
        </Button>

        <Button
          className={clsx(
            menuButtonStyle,
            editor.isActive("link") && isActive,
            "mr-8"
          )}
          onClick={setLink}
        >
          <Icon name="link" />
        </Button>

        <div ref={headingDdRef} className="relative w-[100px]">
          <Button
            className={clsx(
              menuButtonStyle,
              showHeadingDd && isActive,
              editor.isActive("heading") && isActive,
              "w-full"
            )}
            onClick={() => setShowHeadingDd(!showHeadingDd)}
          >
            {currentHeading}
          </Button>
          {showHeadingDd && (
            <div className="absolute bg-background border-1 border-primary z-10 rounded-b-md overflow-hidden">
              {headings.map((heading) => (
                <Button
                  key={heading.level}
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: heading.level as Level })
                      .run();
                    setCurrentHeading(heading.text);
                  }}
                  className={clsx(
                    menuButtonStyle,
                    editor.isActive("heading", { level: heading.level }) &&
                      isActive,
                    "text-nowrap w-full"
                  )}
                >
                  {heading.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      <EditorContent editor={editor} className="input border-0!" />
    </div>
  );
});

export default RichTextEditor;