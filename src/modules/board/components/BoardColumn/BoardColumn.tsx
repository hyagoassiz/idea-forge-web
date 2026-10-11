import { BoardIdeaCard } from "@/modules/board/components/BoardIdeaCard";
import { Idea } from "@/modules/idea/types";
import { Box, Paper, Typography } from "@mui/material";

interface BoardColumnProps {
  ideas: Idea[];
  title: string;
}

export function BoardColumn({ title, ideas }: BoardColumnProps) {
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
        {ideas.map((idea) => (
          <BoardIdeaCard key={idea.id} idea={idea} />
        ))}
      </Box>
    </Paper>
  );
}
