import type { Idea } from "@/modules/idea/types";
import { Card, CardContent, Typography } from "@mui/material";

interface BoardIdeaCardProps {
  idea: Pick<Idea, "name" | "description">;
}

export function BoardIdeaCard({ idea }: BoardIdeaCardProps) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {idea.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {idea.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
