import MenuIcon from "@mui/icons-material/Menu";
import { AppBar as Bar, IconButton, Toolbar, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface AppBarProps {
  title: string;
  setIsLeftDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export function AppBar({ title, setIsLeftDrawerOpen }: AppBarProps) {
  return (
    <Bar position="fixed" color="default" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setIsLeftDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </Bar>
  );
}
