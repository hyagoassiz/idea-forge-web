"use client";

import { Box, Link, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Typography variant="h5" component="h1">
        IdeaForge
      </Typography>

      <Link
        href="http://localhost:8025"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        Acessar serviço de e-mail local
      </Link>
    </Box>
  );
}
