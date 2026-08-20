import { DrawerGroup } from "@/components/LeftDrawer/types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

type LeftDrawerProps = {
  open: boolean;
  onClose: () => void;
  siteName: string;
  groups: DrawerGroup[];
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const LeftDrawer: React.FC<LeftDrawerProps> = ({
  open,
  onClose,
  siteName,
  groups,
}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const drawerWidth = isMdUp ? 280 : "80vw";

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
        },
      }}
      role="navigation"
      aria-label="main drawer"
      variant={isMdUp ? "persistent" : "temporary"}
    >
      <DrawerHeader>
        <Typography variant="h6" component="div" sx={{ ml: 2 }}>
          {siteName}
        </Typography>
        <IconButton onClick={onClose} aria-label="close drawer">
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider sx={{ mb: 6 }} />

      {groups.map((group, gi) => (
        <Box key={gi}>
          <ListSubheader
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            {group.title}
          </ListSubheader>
          <List disablePadding>
            {group.options.map((opt, oi) => (
              <ListItem key={oi} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (opt.onClick) opt.onClick();
                    if (opt.href) window.location.href = opt.href;
                    if (!isMdUp) onClose();
                  }}
                  disabled={opt.disabled}
                  role="menuitem"
                >
                  {opt.icon && (
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {opt.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={opt.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      ))}
    </Drawer>
  );
};

export default LeftDrawer;
