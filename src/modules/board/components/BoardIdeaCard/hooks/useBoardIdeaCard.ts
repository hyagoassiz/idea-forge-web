import { MoreOption } from "@/components/MoreOptions/types";
import {
  Idea,
  IdeaStatus,
  UpdateIdeaStatusRequest,
} from "@/modules/idea/types";

type Option = Omit<MoreOption, "label"> & {
  label:
    | "Visualizar"
    | "Mover para Rascunho"
    | "Mover para Validação"
    | "Mover para Desenvolvimento"
    | "Mover para Lançadas"
    | "Arquivar";
};

interface UseBoardKanbanProps {
  boardId: number;
  idea: Idea;
  onOpen(): void;
  mutate(payload: UpdateIdeaStatusRequest): void;
  archiveIdea(ideaId: number): void;
  isArchiving: boolean;
}

interface UseBoardIdeaCardReturn {
  options: Option[];
}

export function useBoardIdeaCard({
  boardId,
  idea,
  onOpen,
  mutate,
  archiveIdea,
  isArchiving,
}: UseBoardKanbanProps): UseBoardIdeaCardReturn {
  const options: Option[] = [
    {
      label: "Visualizar",
      disabled: idea.archived,
      onClick: onOpen,
    },
    {
      label: "Mover para Rascunho",
      disabled: isArchiving || idea.archived,
      onClick: () => handleChangeStatus(IdeaStatus.DRAFT),
    },
    {
      label: "Mover para Validação",
      disabled: isArchiving || idea.archived,
      onClick: () => handleChangeStatus(IdeaStatus.VALIDATION),
    },
    {
      label: "Mover para Desenvolvimento",
      disabled: isArchiving || idea.archived,
      onClick: () => handleChangeStatus(IdeaStatus.DEVELOPMENT),
    },
    {
      label: "Mover para Lançadas",
      disabled: isArchiving || idea.archived,
      onClick: () => handleChangeStatus(IdeaStatus.LAUNCHED),
    },
    {
      label: "Arquivar",
      disabled: isArchiving,
      onClick: () => archiveIdea(idea.id),
    },
  ];

  const statusOptions: Record<IdeaStatus, Option["label"]> = {
    [IdeaStatus.DRAFT]: "Mover para Rascunho",
    [IdeaStatus.VALIDATION]: "Mover para Validação",
    [IdeaStatus.DEVELOPMENT]: "Mover para Desenvolvimento",
    [IdeaStatus.LAUNCHED]: "Mover para Lançadas",
  };

  const currentStatusOption = statusOptions[idea.status];

  const filteredOptions = options.filter(
    (option) => option.label !== currentStatusOption,
  );

  function handleChangeStatus(status: IdeaStatus): void {
    mutate({
      boardId,
      ideaId: idea.id,
      status,
    });
  }

  return { options: filteredOptions };
}
