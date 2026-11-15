import { IconAction } from "@/components/icon/IconAction";
import { IdeaTableRow } from "@/modules/board/components/ArchivedIdeasDialog/types";
import { Idea, IdeaStatus } from "@/modules/idea/types";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

interface MountDataProps {
  ideas: Idea[];
  unarchiveIdea(id: number): void;
}

const statusLabels: Record<IdeaStatus, string> = {
  [IdeaStatus.DRAFT]: "Rascunho",
  [IdeaStatus.VALIDATION]: "Validação",
  [IdeaStatus.DEVELOPMENT]: "Desenvolvimento",
  [IdeaStatus.LAUNCHED]: "Lançadas",
};

export function mountData({
  ideas,
  unarchiveIdea,
}: MountDataProps): IdeaTableRow[] {
  return ideas.map((idea) => ({
    ...idea,
    previousStatusLabel: statusLabels[idea.status],
    option: (
      <IconAction
        icon={<UnarchiveIcon />}
        tooltip="Desarquivar"
        onClick={() => unarchiveIdea(idea.id)}
      />
    ),
  }));
}
