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
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardActionArea
        onClick={onOpen}
        sx={{ height: "100%", alignItems: "stretch" }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {name}
            </Typography>
          </Box>

          <MoreOptions options={[{ label: "Editar", onClick: onEdit }]} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
