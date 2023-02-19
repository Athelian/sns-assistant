import { createTheme, ThemeOptions } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#EF86C1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ef86c1',
    },
  },
}

export const theme = createTheme(themeOptions)

export default theme
