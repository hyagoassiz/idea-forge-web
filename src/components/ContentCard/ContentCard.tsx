import { Box, Paper, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface ContentCardProps {
  children: ReactNode;
  contentSx?: SxProps<Theme>;
  toolbar?: ReactNode;
}

export function ContentCard({
  children,
  contentSx,
  toolbar,
}: ContentCardProps) {
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      {toolbar && (
        <Box
          p={2}
          py={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          borderBottom="1px solid"
          borderColor="divider"
        >
          {toolbar}
        </Box>
      )}

      <Box sx={contentSx}>{children}</Box>
    </Paper>
  );
}
