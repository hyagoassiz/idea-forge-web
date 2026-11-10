import { useBoardColumn } from "@/modules/board/components/BoardKanban/components/BoardColumn/hooks/useBoardColumn";
import { BoardIdeaCard } from "@/modules/board/components/BoardKanban/components/BoardIdeaCard";
import { IdeaDetailsDialog } from "@/modules/idea/components/IdeaDetailsDialog";
import { Idea, UpdateIdeaStatusRequest } from "@/modules/idea/types";
import { Box, Paper, Typography } from "@mui/material";

interface BoardColumnProps {
  ideas: Idea[];
  isArchiving: boolean;
  title: string;
  archiveIdea(ideaId: number): void;
  mutate(payload: UpdateIdeaStatusRequest): void;
}

export function BoardColumn({
  ideas,
  isArchiving,
  title,
  mutate,
  archiveIdea,
}: BoardColumnProps) {
  const {
    ideaDetailsDialogState,
    handleCloseIdeaDetailsDialog,
    handleOpenIdeaDetailsDialog,
  } = useBoardColumn();

  return (
    <>
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
              idea={idea}
              mutate={mutate}
              onOpen={handleOpenIdeaDetailsDialog}
              archiveIdea={archiveIdea}
              isArchiving={isArchiving}
            />
          ))}
        </Box>
      </Paper>

      {ideaDetailsDialogState && (
        <IdeaDetailsDialog
          idea={ideaDetailsDialogState}
          open={!!ideaDetailsDialogState}
          onClose={handleCloseIdeaDetailsDialog}
        />
      )}
    </>
  );
}
