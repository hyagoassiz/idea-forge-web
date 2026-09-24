import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { MouseEvent, useState } from "react";

interface MoreOptionsProps {
  disabled?: boolean;
  options: {
    label: string;
    disabled?: boolean;
    onClick: () => void;
  }[];
}

export function MoreOptions({ disabled = false, options }: MoreOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleClick(event: MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu(): void {
    setAnchorEl(null);
  }

  function handleOptionClick(action: () => void): void {
    handleCloseMenu();
    action();
  }

  return (
    <>
      <Tooltip title="Opções" placement="top">
        <IconButton
          aria-controls={anchorEl ? "options-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          disabled={disabled}
        >
          <MoreHoriz />
        </IconButton>
      </Tooltip>

      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {options?.map((option) => (
          <MenuItem
            key={option.label}
            disabled={option.disabled}
            onClick={() => handleOptionClick(option.onClick)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
