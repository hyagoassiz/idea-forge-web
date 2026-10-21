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
  idea: Idea;
  onOpen(idea: Idea): void;
  mutate(payload: UpdateIdeaStatusRequest): void;
}

interface UseBoardIdeaCardReturn {
  options: Option[];
}

export function useBoardIdeaCard({
  idea,
  onOpen,
  mutate,
}: UseBoardKanbanProps): UseBoardIdeaCardReturn {
  const options: Option[] = [
    {
      label: "Visualizar",
      disabled: true,
      onClick: () => onOpen(idea),
    },
    {
      label: "Mover para Rascunho",
      disabled: false,
      onClick: () => handleChangeStatus(IdeaStatus.DRAFT),
    },
    {
      label: "Mover para Validação",
      disabled: false,
      onClick: () => handleChangeStatus(IdeaStatus.VALIDATION),
    },
    {
      label: "Mover para Desenvolvimento",
      disabled: false,
      onClick: () => handleChangeStatus(IdeaStatus.DEVELOPMENT),
    },
    {
      label: "Mover para Lançadas",
      disabled: false,
      onClick: () => handleChangeStatus(IdeaStatus.LAUNCHED),
    },
    {
      label: "Arquivar",
      disabled: true,
      onClick: () => {},
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
      id: idea.id,
      status,
    });
  }

  return { options: filteredOptions };
}
