import { IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface IconActionProps {
  tooltip: string;
  icon: ReactNode;
  disabled?: boolean;
  size?: "large" | "medium" | "small";
  onClick?: () => void;
}

export function IconAction({
  tooltip,
  icon,
  disabled = false,
  size,
  onClick,
}: IconActionProps) {
  return (
    <Tooltip title={tooltip} disableHoverListener={disabled}>
      <span>
        <IconButton
          disabled={disabled}
          onClick={onClick}
          size={size}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
