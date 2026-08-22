"use client";

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface ControlledCheckboxProps<T extends FieldValues> extends Omit<
  CheckboxProps,
  "name" | "checked" | "onChange" | "defaultValue"
> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
}

export function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  ...checkboxProps
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error}>
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                {...checkboxProps}
                checked={field.value ?? false}
                onChange={(event) => field.onChange(event.target.checked)}
                inputRef={field.ref}
              />
            }
          />
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
