"use client";

import { AuthActions } from "@/modules/user/components/AuthActions";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useVerifyEmail } from "./hooks/useVerifyEmail";

export function VerifyEmail() {
  const { apiMessage, isLoading, typographyColor } = useVerifyEmail();

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
          <Typography variant="body1" color={typographyColor}>
            {apiMessage}
          </Typography>

          <AuthActions linkHref="/login" linkLabel="Fazer login" />
        </>
      )}
    </>
  );
}
