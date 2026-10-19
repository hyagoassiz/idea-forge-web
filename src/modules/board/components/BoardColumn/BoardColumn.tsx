import { BoardIdeaCard } from "@/modules/board/components/BoardIdeaCard";
import { Idea, UpdateIdeaStatusRequest } from "@/modules/idea/types";
import { Box, Paper, Typography } from "@mui/material";

interface BoardColumnProps {
  boardId: number;
  ideas: Idea[];
  title: string;
  mutate(payload: UpdateIdeaStatusRequest): void;
}

export function BoardColumn({
  boardId,
  title,
  ideas,
  mutate,
}: BoardColumnProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: 120,
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
          <BoardIdeaCard
            key={idea.id}
            boardId={boardId}
            idea={idea}
            mutate={mutate}
            onOpen={() => {}}
          />
        ))}
      </Box>
    </Paper>
  );
}
