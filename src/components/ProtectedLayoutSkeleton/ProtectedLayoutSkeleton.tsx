"use client";

import { Box, Skeleton } from "@mui/material";
import { ReactNode } from "react";

interface ProtectedLayoutSkeletonProps {
  children?: ReactNode;
}

export function ProtectedLayoutSkeleton({
  children,
}: ProtectedLayoutSkeletonProps) {
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
        }}
      >
        {children || (
          <>
            <Skeleton
              variant="text"
              animation="pulse"
              width={220}
              height={48}
            />

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
          </>
        )}
      </Box>
    </Box>
  );
}
