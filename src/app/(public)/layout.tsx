"use client";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Grid
          item
          md={6}
          sx={{
            // backgroundImage: `url(${gestorImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={theme.palette.primary.dark}
      >
        {children}
      </Grid>
    </Grid>
  );
}
