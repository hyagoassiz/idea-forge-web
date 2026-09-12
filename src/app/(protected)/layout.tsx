"use client";
import { AppBar } from "@/components/AppBar";
import { LeftDrawer } from "@/components/LeftDrawer";
import { DrawerGroup } from "@/components/LeftDrawer/types";
import { ProtectedLayoutSkeleton } from "@/components/ProtectedLayoutSkeleton";
import { APP_NAME } from "@/constants/app";
import { getMe } from "@/modules/user/services/userService";
import { routes } from "@/routes";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Box, Toolbar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);

  const { isPending, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const groups: DrawerGroup[] = [
    {
      title: "",
      options: [
        {
          icon: <SpaceDashboardIcon />,
          label: "Dashboard",
          href: "/dashboard",
        },
      ],
    },
  ];

  if (isPending) {
    return <ProtectedLayoutSkeleton />;
  }

  if (isError) {
    redirect(routes.public.login);
  }

  return (
    <Box>
      <AppBar title={APP_NAME} setIsLeftDrawerOpen={setIsLeftDrawerOpen} />

      <LeftDrawer
        open={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)}
        siteName={APP_NAME}
        groups={groups}
      />

      <Toolbar />

      <main>
        <Box
          sx={{
            minHeight: "calc(100vh - 64px)",
            p: 3,
            bgcolor: "#f7f8fc",
          }}
        >
          {children}
        </Box>
      </main>
    </Box>
  );
}
