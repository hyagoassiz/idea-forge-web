"use client";

import { Alert } from "@/components/Alert";
import { AuthActions } from "@/components/AuthActions";
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

          <AuthActions linkHref="/auth/login" linkLabel="Fazer login" />
        </>
      )}
    </>
  );
}
