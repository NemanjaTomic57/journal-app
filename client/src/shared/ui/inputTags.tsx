"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";
import Button from "./button";

interface Props {
  inputName: string;
  label: string;
  placeholder?: string;
  activeTags: string[];
  setActiveTags: Dispatch<SetStateAction<string[]>>;
}

export default function InputTags({
  inputName,
  label,
  placeholder,
  activeTags,
  setActiveTags,
}: Props) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const [placeholderState, setPlaceholderState] = useState(placeholder);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const currentTag = watch("currentTag");

  const errorMessage = errors[inputName]?.message as string;

  useEffect(() => {
    if (activeTags.length > 0 || showPlaceholder === false) {
      setPlaceholderState("");
    } else {
      setPlaceholderState(placeholder);
    }
  }, [showPlaceholder, activeTags]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === " " || event.key === "Enter") && currentTag?.trim()) {
        setActiveTags((prevTags) => [...prevTags, currentTag.trim()]);
        setValue("currentTag", "");
      }
    };

    const handleMouseDown = () => {
      if (currentTag?.trim()) {
        setActiveTags((prevTags) => [...prevTags, currentTag.trim()]);
        setValue("currentTag", "");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [currentTag]);

  const removeTag = (tag: string) => {
    setActiveTags((currentActiveTags) => {
      return currentActiveTags.filter((t) => t !== tag);
    });
  };

  const clearAllTags = () => {
    setActiveTags([]);
  };

  return (
    <div>
      <label htmlFor={inputName} className="input-label">
        {label}
      </label>

      <div className="input">
        {activeTags.length > 0 && (
          <div
            className="flex! flex-wrap gap-2 overflow-auto items-center mb-2"
            onClick={() => document.getElementById(inputName)?.focus()}
          >
            {activeTags.map((tag, index) => (
              <div
                key={index}
                className="bg-secondary cursor-pointer hover:bg-secondary-tint rounded-sm px-2 py-0.5 text-white text-sm font-semibold text-nowrap h-fit"
                onClick={() => removeTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <input
            id={inputName}
            type="text"
            placeholder={placeholderState}
            {...register(inputName)}
            className="h-fit w-full outline-none"
            onFocus={() => setShowPlaceholder(false)}
            onBlur={() => setShowPlaceholder(true)}
          />

          {activeTags.length > 0 && (
            <Button
              onClick={clearAllTags}
              className="btn-sm btn-stroked-background text-sm text-nowrap"
            >
              Clear All Tags
            </Button>
          )}
        </div>
      </div>

      <InputValidationError>{errorMessage}</InputValidationError>
    </div>
  );
}
