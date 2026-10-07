import { AlertColor } from "@mui/material";

export type NotificationSeverity = AlertColor;

export interface NotificationState {
  open: boolean;
  message: string;
  severity: NotificationSeverity;
}
