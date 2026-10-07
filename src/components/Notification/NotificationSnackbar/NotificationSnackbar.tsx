import { Alert, Snackbar } from "@mui/material";

import { NotificationState } from "@/types";

interface NotificationSnackbarProps {
  notification: NotificationState;
  onClose: () => void;
}

export function NotificationSnackbar({
  notification,
  onClose,
}: NotificationSnackbarProps) {
  if (!notification.open) {
    return null;
  }

  return (
    <Snackbar
      open
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={notification.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
