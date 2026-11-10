"use client";

import { MoreOptions } from "@/components/MoreOptions";
import { Board } from "@/modules/board/types";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

interface BoardCardProps {
  board: Board;
  isArchiving: boolean;
  onOpen: () => void;
  onEdit: () => void;
  onArchive: () => void;
}

export function BoardCard({
  board,
  isArchiving,
  onOpen,
  onEdit,
  onArchive,
}: BoardCardProps) {
  return (
    <Card
      sx={{
        height: "auto",
        position: "relative",
      }}
    >
      <CardActionArea
        onClick={onOpen}
        sx={{
          minHeight: "200px",
          alignItems: "stretch",
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "flex-start",
            pt: 3,
            pr: 6,
            pb: 3,
            pl: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              lineHeight: 1.3,
            }}
          >
            {board.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
        }}
      >
        <MoreOptions
          options={[
            { label: "Editar", onClick: onEdit },
            { label: "Arquivar", disabled: isArchiving, onClick: onArchive },
          ]}
        />
      </Box>
    </Card>
  );
}
