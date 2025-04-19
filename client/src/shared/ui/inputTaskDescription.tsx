import RichTextEditor, {
  RichTextEditorHandle,
} from "@/components/richTextEditor";
import InputValidationError from "./inputValidationError";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  inputName: string;
  label: string;
}

export default function InputTaskDescription({ inputName, label }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const editorRef = useRef<RichTextEditorHandle>(null);

  const errorMessage = errors[inputName]?.message as string;

  useEffect(() => {
    register(inputName)
  })

  const handleChange = () => {
    console.log("Hi")
    const value = editorRef.current?.getHTML() || "";
    setValue(inputName, value)
  }

  return (
    <div className="h-[60dvh] min-h-[100px] max-h-[300px] flex flex-col">
      <label className="input-label">{label}</label>
      <RichTextEditor
        ref={editorRef}
        placeholder="Write a description for your task ..."
        onChange={handleChange}
        content={watch(inputName)}
      />
      <InputValidationError>{errorMessage}</InputValidationError>
    </div>
  );
}
