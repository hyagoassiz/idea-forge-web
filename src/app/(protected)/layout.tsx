"use client";
import { AppBar } from "@/components/AppBar";
import { LeftDrawer } from "@/components/LeftDrawer";
import { DrawerGroup } from "@/components/LeftDrawer/types";
import { ProtectedLayoutSkeleton } from "@/components/ProtectedLayoutSkeleton";
import { APP_NAME } from "@/constants/app";
import { useGetMeQuery } from "@/modules/user/services/hooks";
import { routes } from "@/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GridViewIcon from "@mui/icons-material/GridView";
import { Box, Toolbar } from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "@/modules/user/services/userService";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);

  const { isPending, isError } = useGetMeQuery();

  const groups: DrawerGroup[] = [
    {
      title: "",
      options: [
        {
          icon: <DashboardIcon />,
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          icon: <LogoutIcon />,
          label: "Logout",
          onClick: async () => {
            await logoutUser();
            window.location.href = "/login";
          },
        },
      ],
    },
    {
      title: "",
      options: [
        {
          icon: <GridViewIcon />,
          label: "Quadros",
          href: routes.protected.boards.list,
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
          }}
        >
          {children}
        </Box>
      </main>
    </Box>
  );
}
