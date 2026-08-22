"use client";
import { AppBar } from "@/components/AppBar";
import { LeftDrawer } from "@/components/LeftDrawer";
import { DrawerGroup } from "@/components/LeftDrawer/types";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Box, Toolbar } from "@mui/material";
import { useState } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);

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

  return (
    <Box>
      <AppBar title="Idea Forge" setIsLeftDrawerOpen={setIsLeftDrawerOpen} />

      <LeftDrawer
        open={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)}
        siteName="Idea Forge"
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
