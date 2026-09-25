import { Box, Paper, Typography } from "@mui/material";

interface BoardColumnProps {
  title: string;
}

export function BoardColumn({ title }: BoardColumnProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: 400,
        p: 2,
      }}
    >
      <Typography variant="h6">{title}</Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="black"
          height={100}
          width="100%"
        >
          Card
        </Box>
      </Box>
    </Paper>
  );
}
