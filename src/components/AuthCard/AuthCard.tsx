"use client";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
}

export function AuthCard({ children, title }: AuthCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: 350,
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Grid container gap={2} sx={{ marginTop: 3 }}>
            {children}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
