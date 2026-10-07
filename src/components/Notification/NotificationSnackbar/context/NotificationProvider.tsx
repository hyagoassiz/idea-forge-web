"use client";

import { NotificationSnackbar } from "@/components/Notification/NotificationSnackbar";
import { NotificationSeverity, NotificationState } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface NotificationContextValue {
  notify: (message: string, severity?: NotificationSeverity) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export function NotificationProvider({
  children,
}: NotificationProviderProps): React.ReactNode {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: "",
    severity: "info",
  });

  const notify = useCallback(
    (message: string, severity: NotificationSeverity = "info"): void => {
      setNotification({
        open: true,
        message,
        severity,
      });
    },
    [],
  );

  const handleClose = useCallback((): void => {
    setNotification((current) => ({
      ...current,
      open: false,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      notify,
    }),
    [notify],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}

      <NotificationSnackbar notification={notification} onClose={handleClose} />
    </NotificationContext.Provider>
  );
}
