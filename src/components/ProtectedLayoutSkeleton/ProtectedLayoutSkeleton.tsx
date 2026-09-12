"use client";

import { Box, Skeleton } from "@mui/material";

export function ProtectedLayoutSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        animation="pulse"
        sx={{
          width: "100%",
          height: 64,
        }}
      />

      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          p: 3,
          bgcolor: "#f7f8fc",
        }}
      >
        <Skeleton variant="text" animation="pulse" width={220} height={48} />

        <Skeleton
          variant="rounded"
          animation="pulse"
          height={120}
          sx={{ mt: 2 }}
        />

        <Skeleton
          variant="rounded"
          animation="pulse"
          height={240}
          sx={{ mt: 2 }}
        />
      </Box>
    </Box>
  );
}
