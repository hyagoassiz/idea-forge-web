import { PageHeader } from "@/components/PageHeader";
import { APP_NAME } from "@/constants/app";
import { BoardForm } from "@/modules/board/components/BoardForm";
import { routes } from "@/routes";

export const metadata = {
  title: `Editar | ${APP_NAME}`,
};

export default function EditBoardPage() {
  return (
    <>
      <PageHeader
        title="Editar Quadro"
        breadcrumbs={[
          { label: "Quadros", href: routes.protected.boards.list },
          { label: "Editar" },
        ]}
      />

      <BoardForm />
    </>
  );
}
