"use client";

import { NotificationContext } from "@/components/Notification/NotificationSnackbar/context/NotificationProvider";
import { useContext } from "react";

export function useNotification(): {
  notify: (
    message: string,
    severity?: "success" | "info" | "warning" | "error",
  ) => void;
} {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return context;
}
