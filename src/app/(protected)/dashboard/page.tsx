import { PageHeader } from "@/components/PageHeader";
import { APP_NAME } from "@/constants/app";

export const metadata = {
  title: `Dashboard | ${APP_NAME}`,
};

export default function DashboardPage() {
  return <PageHeader title="Dashboard" />;
}
