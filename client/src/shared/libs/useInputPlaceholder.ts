import { RefObject, useEffect, useState } from "react";

export const useInputPlaceholder = (ref: RefObject<HTMLInputElement | null>, defaultPlaceholder: string) => {
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);

  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    const handleFocus = () => setPlaceholder("");
    const handleBlur = () => setPlaceholder(defaultPlaceholder);

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
    }
  }, [ref])

  return placeholder;
};
