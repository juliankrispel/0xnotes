import { createTheme } from "@mui/material"

/**
 * This is where the theme for the entire app is configured
 */
export function theme(prefersDarkMode: boolean) {
  return createTheme({
    typography: {
      fontSize: 16,
    },
    palette: {
      primary: {
        main: '#00CCF3',
      },
      secondary: {
        main: '#00688B',
      },
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  })
}