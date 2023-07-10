import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#b5b4ff",
    },
    secondary: {
      main: "#ffc226",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#1c1c1c",
      paper: "#2e2e2e",
    },
  },
})

theme.typography = {
  ...theme.typography,
  body1: {
    fontSize: 24,
    letterSpacing: 0.5,
  },
}

export default theme
