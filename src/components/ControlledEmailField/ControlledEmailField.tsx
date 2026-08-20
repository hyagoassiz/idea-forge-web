"use client";

import { normalizeEmail } from "@/lib/strings/normalizeEmail";
import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface ControlledEmailFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "defaultValue" | "type"
> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export function ControlledEmailField<T extends FieldValues>({
  name,
  control,
  rules,
  ...textFieldProps
}: ControlledEmailFieldProps<T>): React.JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          type="email"
          autoComplete="email"
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ""}
          onKeyDown={(event) => {
            if (event.key === " ") {
              event.preventDefault();
            }

            textFieldProps.onKeyDown?.(event);
          }}
          onChange={(event) => {
            field.onChange(normalizeEmail(event.target.value));
          }}
        />
      )}
    />
  );
}
