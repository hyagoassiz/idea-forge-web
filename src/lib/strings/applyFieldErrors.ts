import { ApiErrorResponse } from "@/lib/api/types";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function applyFieldErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  error: ApiErrorResponse,
) {
  error.errors?.forEach(({ field, message }) => {
    form.setError(field as Path<T>, {
      type: "manual",
      message,
    });
  });
}
