import { createTheme } from '@mui/material/styles';

// 定义颜色变量
export const colors = {
  primary: {
    main: '#00BFA5',
    light: '#00A693',
  },
  background: {
    paper: '#243141',
    default: '#1C2531',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
  },
  action: {
    hover: 'rgba(255, 255, 255, 0.08)',
  },
  error: {
    main: '#dc3545',
    dark: '#c82333',
  },
};

// 创建 CSS 变量
if (typeof document !== 'undefined') {
  const root = document.documentElement;
  Object.entries(colors).forEach(([category, values]) => {
    Object.entries(values).forEach(([name, value]) => {
      root.style.setProperty(`--${category}-${name}`, value);
    });
  });
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: colors.background.paper,
      default: colors.background.default,
    },
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    action: {
      hover: colors.action.hover,
    },
    error: {
      main: colors.error.main,
      dark: colors.error.dark,
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.background.paper,
          color: colors.text.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: colors.primary.main,
          },
        },
      },
    },
  },
}); 