import * as React from 'react';
import { cloneElement, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styled from '@emotion/styled';
import { useTheme } from '@mui/system';

export default function BasicModal({ children, btnName }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  };

  return (
    <Wrapper>
      <Button
        onClick={handleOpen}
        variant={'contained'}
        sx={{
          width: '240px',
          height: '72px',
          borderRadius: 35,
          backgroundColor: 'rgba(135, 206, 235, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(135, 206, 235, 0.7)',
          },
        }}
      >
        {btnName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{cloneElement(children, { handleClose })}</Box>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled(Box)``;
