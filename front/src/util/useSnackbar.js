import React, { useCallback, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { createPortal } from 'react-dom';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // 'success' | 'error' | 'info' | 'warning'

  const [mounted, setMounted] = useState(false); // 클라이언트 마운트 여부 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  const showSnackbar = useCallback((msg, type = 'success') => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const SnackbarComponent = mounted
    ? createPortal(
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>,
        document.body,
      )
    : null;

  return { showSnackbar, SnackbarComponent };
};
