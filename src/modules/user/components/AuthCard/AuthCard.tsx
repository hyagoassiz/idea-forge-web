"use client";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
}

export function AuthCard({ children, title }: AuthCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
          width: "350px",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          backgroundColor: theme.palette.primary.contrastText,
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(4),
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: 600,
            alignSelf: "flex-start",
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>

        <Grid container gap={2} sx={{ marginTop: "24px" }}>
          {children}
        </Grid>
      </Box>
    </Box>
  );
}
