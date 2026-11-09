import { SxProps, Theme } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

export interface DataGridColumn<T> {
  key: keyof T;
  label: string | ReactNode;
  style?: CSSProperties;
  align?: "left" | "center" | "right" | "justify" | "inherit";
  hideOnMobile?: boolean;
}

export type DataGridRow<T> = T & {
  style?: SxProps<Theme>;
};
