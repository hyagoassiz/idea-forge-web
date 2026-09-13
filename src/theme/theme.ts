import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#7C4DFF",
    },

    secondary: {
      main: "#00BFA6",
    },

    background: {
      default: "#0F1115",
      paper: "#171A21",
    },
  },

  // shape: {
  //   borderRadius: 8,
  // },

  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
