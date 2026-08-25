import { LoadingButton } from "@mui/lab";
import { Divider, Link, Typography } from "@mui/material";

interface AuthActionsProps {
  linkHref: string;
  isLoading: boolean;
  buttonLabel: string;
  linkLabel: string;
  linkDescription: string;
  onClick(): void;
}

export function AuthActions({
  linkHref,
  isLoading,
  buttonLabel,
  linkLabel,
  linkDescription,
  onClick,
}: AuthActionsProps) {
  return (
    <>
      <LoadingButton
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 1, py: 1.5, textTransform: "none", fontWeight: 700 }}
        size="large"
        disabled={isLoading}
        loading={isLoading}
        loadingPosition="center"
        onClick={onClick}
      >
        {buttonLabel}
      </LoadingButton>

      <Divider
        sx={{
          width: "100%",
          height: "1px",
          marginTop: 1,
        }}
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 1,
          textAlign: "center",
        }}
      >
        {linkDescription}{" "}
        <Link
          href={linkHref}
          sx={{
            color: "inherit",
          }}
        >
          {linkLabel}
        </Link>
      </Typography>
    </>
  );
}
