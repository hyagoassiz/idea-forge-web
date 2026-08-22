"use client";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface ControlledSelectProps<T extends FieldValues> extends Omit<
  SelectProps,
  "name" | "value" | "onChange" | "defaultValue"
> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  rules?: RegisterOptions<T, Path<T>>;
}

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
  ...selectProps
}: ControlledSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>

          <Select
            {...field}
            value={field.value ?? ""}
            label={label}
            {...selectProps}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
