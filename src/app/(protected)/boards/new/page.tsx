import { PageHeader } from "@/components/PageHeader";
import { APP_NAME } from "@/constants/app";
import { BoardForm } from "@/modules/board/components/BoardForm";
import { routes } from "@/routes";

export const metadata = {
  title: `Novo | ${APP_NAME}`,
};

export default function NewBoardPage() {
  return (
    <>
      <PageHeader
        title="Novo Quadro"
        breadcrumbs={[
          { label: "Quadros", href: routes.protected.boards.list },
          { label: "Novo" },
        ]}
      />

      <BoardForm />
    </>
  );
}
