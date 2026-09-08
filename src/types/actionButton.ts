import { ButtonProps } from "@mui/material";

export interface ActionButton {
  id: string;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  size?: ButtonProps["size"];
  disabled?: boolean;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
}
