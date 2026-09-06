"use client";

import { Alert } from "@/modules/user/components/Alert";
import { AuthActions } from "@/modules/user/components/AuthActions";
import { Box, CircularProgress } from "@mui/material";
import { useVerifyEmail } from "./hooks/useVerifyEmail";

export function VerifyEmail() {
  const { apiMessage, isLoading, alertSeverity } = useVerifyEmail();

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && apiMessage && (
        <>
          <Alert severity={alertSeverity}>{apiMessage}</Alert>

          <AuthActions linkHref="/login" linkLabel="Fazer login" />
        </>
      )}
    </>
  );
}
