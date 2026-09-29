import { Idea } from "@/modules/idea/types";
import { Box, Paper, Typography } from "@mui/material";

interface BoardColumnProps {
  ideas: Idea[];
  title: string;
}

export function BoardColumn({ ideas, title }: BoardColumnProps) {
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
        {ideas?.map((idea) => (
          <Box
            key={idea.id}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="black"
            height={100}
            width="100%"
          >
            {idea.name}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
