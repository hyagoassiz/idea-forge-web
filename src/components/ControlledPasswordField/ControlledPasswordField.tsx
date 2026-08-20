"use client";

import { removeSpaces } from "@/lib/strings/removeSpaces";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface ControlledPasswordFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export function ControlledPasswordField<T extends FieldValues>({
  name,
  control,
  rules,
  ...textFieldProps
}: ControlledPasswordFieldProps<T>): React.JSX.Element {
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          type={mostrarSenha ? "text" : "password"}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ""}
          onChange={(event) => {
            const valor = removeSpaces(event.target.value);

            field.onChange(valor);

            textFieldProps.onChange?.(event);
          }}
          InputProps={{
            ...textFieldProps.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  tabIndex={-1}
                  onClick={() => setMostrarSenha((valor) => !valor)}
                  aria-label={
                    mostrarSenha ? "Ocultar password" : "Mostrar password"
                  }
                >
                  {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
