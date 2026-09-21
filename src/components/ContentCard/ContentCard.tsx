import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

interface ContentCardProps {
  children: ReactNode;
  toolbar?: ReactNode;
}

export function ContentCard({ children, toolbar }: ContentCardProps) {
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
        {toolbar && (
          <Box
            p={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            {toolbar}
          </Box>
        )}
      </Paper>

      {children}
    </Box>
  );
}
