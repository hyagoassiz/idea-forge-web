"use client";

import { MoreOptions } from "@/components/MoreOptions";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

interface BoardCardProps {
  name: string;
  onOpen: () => void;
  onEdit: () => void;
  onArchive: () => void;
  isArchiving: boolean;
}

export function BoardCard({
  name,
  onOpen,
  onEdit,
  onArchive,
  isArchiving,
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
            {name}
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
