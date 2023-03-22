import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const BasicLayout = ({ children }) => {
  const theme = createTheme({
    breakpoints: {
      xs: 0,
      sm: 600,
      md: 1200,
      lg: 1920,
      xl: 2560,
    },
    typography: {
      fontFamily: 'Pretendard, sans-serif',
      h1: {
        fontSize: 'var(--font-large)',
        fontWeight: '700',
        color: 'var(--color-black)',
      },
      h2: {
        fontSize: 'var(--font-medium)',
        fontWeight: '600',
        color: 'var(--color-black)',
      },
      h3: {
        fontSize: 'var(--font-regular)',
        fontWeight: 'var(--weight-regular)',
        color: 'var(--color-black)',
      },
      label: {
        marginBottom: '0.5rem',
        fontWeight: '700',
        fontSize: '1.25rem',
        textAlign: 'left',
      },
      labelValue: {
        fontWeight: '700',
        fontSize: '1rem',
        color: 'var(--color-dark-grey)',
      },
      skillsTitle: {
        fontWeight: '700',
        fontSize: '1.5rem',
        color: 'var(--color-pink)',
        borderBottom: '1px solid #ccc',
        margin: '1rem 0',
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default BasicLayout;
