"use client";

import Quill, { Delta } from "quill";
import 'quill/dist/quill.snow.css';
import {
  RefObject,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

interface Props {
  quillRef: RefObject<Quill | null>;
  readOnly: boolean;
  defaultValue: Delta;
  onSelectionChange: Dispatch<SetStateAction<Range | undefined>>;
  onTextChange: Dispatch<SetStateAction<Delta | undefined>>;
}

export type RichTextEditorHandle = {
  getContent: () => string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && document) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
          ],
        },
        placeholder: "Write something amazing for your journey ...",
      });
    }

    return () => {
      quillRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return "";
    },
  }));

  return <div ref={editorRef} className="h-20" />;
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
