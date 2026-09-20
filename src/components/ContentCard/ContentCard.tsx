import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

interface ContentCardProps {
  children: ReactNode;
  toolbar?: ReactNode;
}

export function ContentCard({ children, toolbar }: ContentCardProps) {
  return (
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {toolbar && (
          <Box
            p={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="divider"
          >
            {toolbar}
          </Box>
        )}
      </Paper>

      {children}
    </Box>
  );
}
