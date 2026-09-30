import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

interface ContentCardProps {
  children: ReactNode;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;
}

export function ContentCard({
  children,
  toolbarLeft,
  toolbarRight,
}: ContentCardProps) {
  return (
    <Box>
      <Paper
        sx={{
          width: "100%",
          mb: 0.5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        {(toolbarLeft || toolbarRight) && (
          <Box
            px={2}
            py={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              {toolbarLeft}
            </Box>

            <Box display="flex" alignItems="center">
              {toolbarRight}
            </Box>
          </Box>
        )}
      </Paper>

      {children}
    </Box>
  );
}
