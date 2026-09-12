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
  title: string;
  children: React.ReactNode;
  actions?: ActionButton[];
  onClose(): void;
}

export default function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
}: DialogProps) {
  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 400,
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{ gap: 1, marginLeft: 2, marginRight: 2, marginBottom: 2 }}
        >
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
