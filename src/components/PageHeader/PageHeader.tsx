import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
}: PageHeaderProps) {
  return (
    <Stack spacing={2} mb={4}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
          {breadcrumbs.map((item) =>
            item.href ? (
              <Link
                key={item.href}
                href={item.href}
                underline="hover"
                color="inherit"
              >
                {item.label}
              </Link>
            ) : (
              <Typography key={item.label} color="text.primary">
                {item.label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
      )}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600}>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions}
      </Stack>
    </Stack>
  );
}
