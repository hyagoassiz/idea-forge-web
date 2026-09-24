"use client";

import { PageHeader } from "@/components/PageHeader";
import { BoardKanban } from "@/modules/board/components/BoardKanban";
import { useBoardView } from "@/modules/board/components/BoardView/hooks/useBoardView";
import { routes } from "@/routes";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

export function BoardView() {
  const { isLoading, name } = useBoardView();

  return (
    <>
      {!isLoading && name && (
        <>
          <PageHeader
            title={name}
            breadcrumbs={[
              { label: "Quadros", href: routes.protected.boards.list },
              { label: name },
            ]}
            actions={
              <Button variant="contained" startIcon={<Add />}>
                Nova Ideia
              </Button>
            }
          />

          <BoardKanban />
        </>
      )}
    </>
  );
}
