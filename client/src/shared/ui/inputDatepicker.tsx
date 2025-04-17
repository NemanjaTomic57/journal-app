import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";

interface Props {
  inputName: string;
  label: string;
}

export default function InputDatepicker({ inputName, label }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[inputName]?.message as string;

  return (
    <div>
      <label htmlFor={inputName} className="input-label">
        {label}
      </label>
      <input id={inputName} type="date" className="input" {...register(inputName)} />

      <InputValidationError>{errorMessage}</InputValidationError>
    </div>
  );
}
