import { IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface IconActionProps {
  tooltip: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function IconAction({
  tooltip,
  icon,
  disabled = false,
  onClick,
}: IconActionProps) {
  return (
    <Tooltip title={tooltip} disableHoverListener={disabled}>
      <span>
        <IconButton disabled={disabled} onClick={onClick}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
