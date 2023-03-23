import React, { Fragment, useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { getSession, signIn, useSession, signOut } from 'next-auth/react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const Navbar = () => {
  const { data: session } = useSession();

  // console.log(session);

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const logOutHandler = useCallback(async () => {
    await signOut({ callbackUrl: '/' });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBarWrapper
      component="nav"
      elevation={2}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: '72px',
        justifyContent: 'center',
        position: 'sticky',
        padding: '0 1.5rem',
      }}
    >
      <BarWrapper>
        <Typography
          variant={'h2'}
          sx={{ fontWeight: 600, flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
        >
          1
        </Typography>

        {session ? (
          <IconButton onClick={handleClick}>
            <AccountCircle style={{ color: 'black', fontSize: 40 }} />
          </IconButton>
        ) : undefined}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>포트폴리오 목록</MenuItem>
          <MenuItem onClick={logOutHandler}>LOGOUT</MenuItem>
        </Menu>
      </BarWrapper>
    </AppBarWrapper>
  );
};

const BarWrapper = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const AppBarWrapper = styled(AppBar)`
  background: #ffffff;
`;

export default Navbar;
