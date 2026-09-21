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
}

export function BoardCard({ name, onOpen, onEdit }: BoardCardProps) {
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
          height: "100%",
          alignItems: "stretch",
        }}
      >
        <CardContent>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <MoreOptions options={[{ label: "Editar", onClick: onEdit }]} />
      </Box>
    </Card>
  );
}
