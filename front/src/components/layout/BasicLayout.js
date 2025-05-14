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
    palette: {
      mode: 'light', // 또는 'dark'
      primary: {
        main: '#1976d2',
        light: '#63a4ff',
        dark: '#004ba0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#9c27b0', // 보라색
        light: '#d05ce3',
        dark: '#6a0080',
        contrastText: '#ffffff',
      },
      error: {
        main: '#f44336', // 빨간색
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ff9800', // 주황색
        light: '#ffb74d',
        dark: '#f57c00',
        contrastText: '#000000',
      },
      info: {
        main: '#2196f3', // 하늘색
        light: '#64b5f6',
        dark: '#1976d2',
        contrastText: '#ffffff',
      },
      success: {
        main: '#4caf50', // 초록색
        light: '#81c784',
        dark: '#388e3c',
        contrastText: '#ffffff',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
        disabled: '#bdbdbd',
      },
      background: {
        default: '#fafafa',
        paper: '#ffffff',
      },
      divider: '#e0e0e0',
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
      h5: {
        fontSize: 'var(--font-small)',
        fontWeight: 'var(--weight-regular)',
        color: 'var(--color-black)',
      },
      h6: {
        fontSize: 'var(--font-micro)',
        fontWeight: 'var(--weight-regular)',
        color: 'var(--color-black)',
      },
      label: {
        fontWeight: 'var(--weight-bold)',
        fontSize: '1.25rem',
        textAlign: 'left',
      },
      labelValue: {
        fontWeight: 'var(--weight-bold)',
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
      'section-title': {
        fontFamily: 'Black Han Sans, sans-serif',
        fontWeight: 'var(--weight-bold)',
        fontSize: 'var(--font-large)',
      },
      'mast-head-title': {
        fontFamily: 'Black Han Sans, sans-serif',
        fontWeight: 'var(--weight-semi-bold)',
        fontSize: '2rem',
        color: 'var(--color-white)',
      },
      'mast-subtitle': {
        fontWeight: '400',
        fontSize: '1rem',
        color: 'var(--color-white)',
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default BasicLayout;
