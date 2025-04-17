"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";

interface Props {
  inputName: string;
  label: string;
}

export default function InputFile({ inputName, label }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [files, setFiles] = useState<FileList | null>(null);

  const errorMessage = errors[inputName]?.message as string;

  return (
    <div>
      <label htmlFor={inputName} className="input-label">
        {label}
      </label>

      <Controller
        name={inputName}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <>
            <label
              htmlFor={inputName}
              className="input flex! items-center gap-2 cursor-pointer hover:bg-stone-tint text-center"
            >
              {value && value.length > 0
                ? value.length > 1
                  ? `${value.length} files`
                  : value[0].name
                : <p className="placeholder">Drag and drop files</p>}
            </label>
            <input
              id={inputName}
              type="file"
              multiple
              className="hidden"
              ref={ref}
              onChange={(e) => onChange(e.target.files)}
            />
          </>
        )}
      />

      <InputValidationError>{errorMessage}</InputValidationError>
    </div>
  );
}
