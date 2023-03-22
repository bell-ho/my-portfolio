import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const BasicLayout = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Pretendard, sans-serif',
      h1: {
        fontSize: 'var(--font-large)',
        fontWeight: '700',
        color: 'var(--color-black)',
        margin: '16px 0px',
      },
      h2: {
        fontSize: 'var(--font-medium)',
        fontWeight: '600',
        color: 'var(--color-black)',
        margin: '8px 0',
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default BasicLayout;
