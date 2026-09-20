import { SearchProps } from "@/types";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";

export function Search({
  onChange,
  placeholder,
  value,
  open,
  handleOpen,
  handleClose,
}: SearchProps) {
  if (!open) {
    return (
      <Tooltip title="Pesquisar" arrow>
        <IconButton onClick={handleOpen}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      autoFocus
      sx={{
        width: 250,
        transition: "width 0.3s ease",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClose} edge="end" size="small">
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
