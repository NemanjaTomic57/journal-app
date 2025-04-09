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
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "@/shared/libs/useOnClickOutside";
import { RichTextEditorHandle } from "@/app/(dashboard)/new-entry/page";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

const headings = [
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

const RichTextEditor = forwardRef<RichTextEditorHandle>((_props, ref) => {
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
      BulletList,
      OrderedList,
      ListItem,
      HorizontalRule,
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
        levels: [2, 3, 4],
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Write something amazing in your journal ...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "outline-none w-full min-h-full p-[16px]",
      },
    },
    immediatelyRender: false,
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML(),
  }));

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
    <div className="input p-0! overflow-hidden flex! flex-col flex-1">
      <div className="sticky top-0 flex border-b-1 z-100 bg-background">
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

        <div ref={headingDdRef} className="relative w-[100px] mr-8">
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
                    setShowHeadingDd(false);
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

        <Button
          className={clsx(
            menuButtonStyle,
            editor?.isActive("orderedList") && isActive
          )}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <Icon name="orderedList" />
        </Button>

        <Button
          className={clsx(
            menuButtonStyle,
            editor?.isActive("bulletList") && isActive
          )}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <Icon name="bulletList" />
        </Button>

        <Button
          className={clsx(menuButtonStyle)}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Icon name="divider" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <EditorContent
          editor={editor}
          className="h-full"
        />
      </div>
    </div>
  );
});

export default RichTextEditor;
