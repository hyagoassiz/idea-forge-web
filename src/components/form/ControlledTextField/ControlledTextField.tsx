"use client";

import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface ControlledTextFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name" | "value" | "onChange" | "defaultValue"
> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export function ControlledTextField<T extends FieldValues>({
  name,
  control,
  rules,
  ...textFieldProps
}: ControlledTextFieldProps<T>): React.JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          value={field.value ?? ""}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ""}
        />
      )}
    />
  );
}
