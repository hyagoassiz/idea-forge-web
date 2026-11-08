import { Badge, BadgeProps, IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface IconActionProps {
  tooltip: string;
  icon: ReactNode;
  disabled?: boolean;
  size?: "large" | "medium" | "small";
  badgeContent?: ReactNode;
  badgeColor?: BadgeProps<"a">["color"];
  onClick?: () => void;
}

export function IconAction({
  tooltip,
  icon,
  disabled = false,
  size,
  badgeContent,
  badgeColor = "secondary",
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
          <Badge
            badgeContent={badgeContent}
            color={badgeColor}
            max={99}
            invisible={badgeContent === undefined || badgeContent === null}
          >
            {icon}
          </Badge>
        </IconButton>
      </span>
    </Tooltip>
  );
}
