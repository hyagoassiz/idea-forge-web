import { ActionButton } from "@/types";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";

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
        {buttons.map((button) => (
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
      </Stack>
    </Box>
  );
}
