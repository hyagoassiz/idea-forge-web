import { MoreOptions } from "@/components/MoreOptions";
import { useBoardIdeaCard } from "@/modules/board/components/BoardIdeaCard/hooks/useBoardIdeaCard";
import { Idea, UpdateIdeaStatusRequest } from "@/modules/idea/types";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

interface BoardIdeaCardProps {
  boardId: number;
  idea: Idea;
  onOpen(): void;
  mutate(payload: UpdateIdeaStatusRequest): void;
}

export function BoardIdeaCard({
  boardId,
  idea,
  onOpen,
  mutate,
}: BoardIdeaCardProps) {
  const { options } = useBoardIdeaCard({ boardId, idea, onOpen, mutate });

  const hasScore = idea.isEvaluated && idea.evaluationScore != null;

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        borderRadius: 2,
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: "0 1px 2px rgba(9, 30, 66, 0.12)",
        transition: "box-shadow 0.2s, border-color 0.2s",
        "&:hover": {
          boxShadow: "0 3px 8px rgba(9, 30, 66, 0.16)",
          borderColor: "text.disabled",
        },
      }}
    >
      <CardActionArea
        onClick={onOpen}
        sx={{
          display: "block",
          textAlign: "left",
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              lineHeight: 1.5,
              overflowWrap: "anywhere",
              pr: 4,
            }}
          >
            {idea.name}
          </Typography>

          <Divider sx={{ mt: 1 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                minWidth: 0,
              }}
            >
              <AssignmentTurnedInOutlinedIcon
                sx={{
                  fontSize: 16,
                  color: "text.secondary",
                }}
              />

              <Typography variant="caption" color="text.secondary">
                Avaliação
              </Typography>
            </Box>

            {hasScore ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "success.main",
                }}
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />

                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {idea.evaluationScore}/100
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  minWidth: 0,
                  color: "text.secondary",
                }}
              >
                {!idea.isEvaluated && (
                  <ScheduleOutlinedIcon sx={{ fontSize: 15 }} />
                )}

                {idea.isEvaluated && (
                  <CheckCircleOutlineIcon sx={{ fontSize: 15 }} />
                )}

                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {idea.isEvaluated ? "Avaliado" : "Pendente"}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>

      <Box
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          zIndex: 1,
        }}
      >
        <MoreOptions size="small" options={options} />
      </Box>
    </Card>
  );
}
