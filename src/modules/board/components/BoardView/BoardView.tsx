"use client";

import { PageHeader } from "@/components/PageHeader";
import { BoardDescriptionDialog } from "@/modules/board/components/BoardDescriptionDialog";
import { BoardKanban } from "@/modules/board/components/BoardKanban";
import { useBoardView } from "@/modules/board/components/BoardView/hooks/useBoardView";
import { CreateIdeaDialog } from "@/modules/idea/components/CreateIdeaDialog";
import { routes } from "@/routes";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

export function BoardView() {
  const {
    board,
    isCreateIdeaDialogOpen,
    isDescriptionDialogOpen,
    isLoading,
    toggleCreateIdeiaDialog,
    toggleDescriptionDialog,
  } = useBoardView();

  return (
    <>
      {!isLoading && board && (
        <>
          <PageHeader
            title={board.name}
            breadcrumbs={[
              { label: "Quadros", href: routes.protected.boards.list },
              { label: board.name },
            ]}
            actions={
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={toggleCreateIdeiaDialog}
              >
                Nova Ideia
              </Button>
            }
          />

          <BoardKanban
            boardId={board.id}
            toggleDescriptionDialog={toggleDescriptionDialog}
          />
        </>
      )}

      {isCreateIdeaDialogOpen && board && (
        <CreateIdeaDialog
          boardId={board.id}
          open={isCreateIdeaDialogOpen}
          onClose={toggleCreateIdeiaDialog}
        />
      )}

      {isDescriptionDialogOpen && board && (
        <BoardDescriptionDialog
          board={board}
          open={isDescriptionDialogOpen}
          onClose={toggleDescriptionDialog}
        />
      )}
    </>
  );
}
