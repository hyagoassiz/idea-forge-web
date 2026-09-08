import {
  AlertTitle,
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  Stack,
} from "@mui/material";
import { ReactNode } from "react";

interface AlertProps {
  action?: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  severity: MuiAlertProps["severity"];
  title?: string;
  onClose?: () => void;
}

export function Alert({
  action,
  children,
  icon,
  severity,
  title,
  onClose,
}: AlertProps) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <MuiAlert
        severity={severity}
        icon={icon}
        onClose={onClose}
        action={action}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </MuiAlert>
    </Stack>
  );
}
