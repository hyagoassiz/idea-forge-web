"use client";

import { Backdrop, CircularProgress } from "@mui/material";
import { useIsMutating } from "@tanstack/react-query";

export function GlobalLoading() {
  const isMutating = useIsMutating();

  const isLoading = isMutating > 0;

  return (
    <Backdrop open={isLoading} sx={{ zIndex: 9999 }}>
      <CircularProgress />
    </Backdrop>
  );
}
