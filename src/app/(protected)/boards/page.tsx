import { PageHeader } from "@/components/PageHeader";
import { APP_NAME } from "@/constants/app";
import { routes } from "@/routes";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

export const metadata = {
  title: `Quadros | ${APP_NAME}`,
};

export default function BoardsPage() {
  return (
    <>
      <PageHeader
        title="Quadros"
        breadcrumbs={[{ label: "Quadros" }]}
        actions={
          <Button
            href={routes.protected.boards.new}
            startIcon={<Add />}
            variant="contained"
          >
            Novo Quadro
          </Button>
        }
      />
    </>
  );
}
