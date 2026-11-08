import { ActionButton } from "@/types";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import Link from "next/link";

interface FormActionsProps {
  buttons: ActionButton[];
}

export function FormActions({ buttons }: FormActionsProps) {
  return (
    <Box mt={4}>
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={2}
        justifyContent="flex-end"
      >
        {buttons.map((button) => {
          const loadingButton = (
            <LoadingButton
              type={button.href ? undefined : (button.type ?? "button")}
              variant={button.variant ?? "contained"}
              color={button.color ?? "primary"}
              loading={button.loading}
              disabled={button.disabled}
              onClick={button.onClick}
              size={button.size}
              fullWidth
            >
              {button.label}
            </LoadingButton>
          );

          return button.href ? (
            <Link
              key={button.id}
              href={button.href}
              style={{ textDecoration: "none" }}
            >
              {loadingButton}
            </Link>
          ) : (
            <Box key={button.id}>{loadingButton}</Box>
          );
        })}
      </Stack>
    </Box>
  );
}
