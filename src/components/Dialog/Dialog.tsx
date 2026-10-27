import { ActionButton } from "@/types";
import { LoadingButton } from "@mui/lab";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
} from "@mui/material";

interface DialogProps {
  open: boolean;
  title: string | React.ReactNode;
  children: React.ReactNode;
  actions?: ActionButton[];
  onClose(): void;
  width?: number | string;
}

export function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  width = 400,
}: DialogProps) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width,
          maxWidth: "calc(100% - 64px)",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "&.MuiDialogContent-root": {
            paddingTop: 1,
          },
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ gap: 1, mx: 2, mb: 2 }}>
          {actions.map((button) => (
            <LoadingButton
              key={button.id}
              type={button.type ?? "button"}
              variant={button.variant ?? "contained"}
              color={button.color ?? "primary"}
              loading={button.loading}
              disabled={button.disabled}
              onClick={button.onClick}
              size={button.size}
            >
              {button.label}
            </LoadingButton>
          ))}
        </DialogActions>
      )}
    </MuiDialog>
  );
}
